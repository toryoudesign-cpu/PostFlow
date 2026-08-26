import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import BrandKitSelector from './components/BrandKitSelector';
import ContentGenerator from './components/ContentGenerator';
import PostPreview from './components/PostPreview';
import CaptionView from './components/CaptionView';
import DesignerBriefing from './components/DesignerBriefing';
import HistorySection from './components/HistorySection';
import PricingModal from './components/PricingModal';
import ApiKeyModal from './components/ApiKeyModal';
import BrandModal from './components/BrandModal';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { syncUserProfileToCloud, fetchUserProfileFromCloud } from './services/firebase';
import { generateContent } from './services/geminiService';
import { generateStandaloneHtml, downloadHtmlFile } from './services/htmlExportService';
import { Eye, MessageSquareText, PenTool, Sparkles, History, UserPlus } from 'lucide-react';

const safeJsonParse = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    return fallback;
  }
};

function MainApp() {
  const { currentUser, logout, updateUserPlan } = useAuth();
  const historyRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('postflow_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  const [planType, setPlanType] = useState(() => {
    try {
      return currentUser?.planType || localStorage.getItem('postflow_plan_type') || 'free';
    } catch {
      return 'free';
    }
  });

  const isPro = planType === 'base' || planType === 'agency';

  const [brands, setBrands] = useState(() => {
    return safeJsonParse('postflow_custom_brands', []);
  });

  const [selectedBrand, setSelectedBrand] = useState(() => {
    const saved = safeJsonParse('postflow_custom_brands', []);
    return saved.length > 0 ? saved[0] : null;
  });

  const [history, setHistory] = useState(() => {
    return safeJsonParse('postflow_history', []);
  });

  const [aspectRatio, setAspectRatio] = useState('4/5');
  const [format, setFormat] = useState('simples');
  const [topic, setTopic] = useState('');
  const [customTone, setCustomTone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const [credits, setCredits] = useState(() => {
    try {
      const saved = localStorage.getItem('postflow_credits');
      return saved !== null ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('postflow_gemini_api_key') || '';
    } catch {
      return '';
    }
  });

  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState('');
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [content, setContent] = useState(null);

  useEffect(() => {
    if (currentUser?.uid) {
      fetchUserProfileFromCloud(currentUser.uid).then((cloudData) => {
        if (cloudData) {
          if (cloudData.brands && Array.isArray(cloudData.brands)) {
            setBrands(cloudData.brands);
            if (cloudData.brands.length > 0 && !selectedBrand) {
              setSelectedBrand(cloudData.brands[0]);
            }
          }
          if (cloudData.history && Array.isArray(cloudData.history)) {
            setHistory(cloudData.history);
          }
          if (cloudData.planType) {
            setPlanType(cloudData.planType);
          }
          if (cloudData.apiKey && !apiKey) {
            setApiKey(cloudData.apiKey);
          }
        } else {
          syncUserProfileToCloud(currentUser.uid, {
            brands,
            history,
            planType,
            apiKey
          });
        }
      });
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#FAFAFA';
    }
    try {
      localStorage.setItem('postflow_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('postflow_custom_brands', JSON.stringify(brands));
      if (currentUser?.uid) {
        syncUserProfileToCloud(currentUser.uid, { brands });
      }
    } catch (e) {}
  }, [brands, currentUser?.uid]);

  useEffect(() => {
    try {
      localStorage.setItem('postflow_history', JSON.stringify(history));
      if (currentUser?.uid) {
        syncUserProfileToCloud(currentUser.uid, { history });
      }
    } catch (e) {}
  }, [history, currentUser?.uid]);

  useEffect(() => {
    try {
      localStorage.setItem('postflow_credits', credits.toString());
    } catch (e) {}
  }, [credits]);

  useEffect(() => {
    try {
      localStorage.setItem('postflow_plan_type', planType);
      if (currentUser?.uid) {
        syncUserProfileToCloud(currentUser.uid, { planType });
      }
    } catch (e) {}
  }, [planType, currentUser?.uid]);

  useEffect(() => {
    try {
      localStorage.setItem('postflow_gemini_api_key', apiKey);
      if (currentUser?.uid) {
        syncUserProfileToCloud(currentUser.uid, { apiKey });
      }
    } catch (e) {}
  }, [apiKey, currentUser?.uid]);

  const handleOpenCreateBrand = () => {
    const maxBrandsAllowed = planType === 'free' ? 2 : (planType === 'base' ? 5 : Infinity);

    if (brands.length >= maxBrandsAllowed) {
      if (planType === 'free') {
        setUpgradeReason('Você atingiu o limite de 2 clientes do plano gratuito. Faça upgrade para o Plano Base (até 5 clientes por R$ 10/mês) ou Plano Equipe (ilimitados por R$ 25/mês)!');
      } else if (planType === 'base') {
        setUpgradeReason('Você atingiu o limite de 5 clientes do Plano Base. Faça upgrade para o Plano Equipe (clientes ilimitados por R$ 25/mês)!');
      }
      setIsPricingOpen(true);
      return;
    }

    setBrandToEdit(null);
    setIsBrandModalOpen(true);
  };

  const handleOpenEditBrand = (brand) => {
    setBrandToEdit(brand);
    setIsBrandModalOpen(true);
  };

  const handleSaveBrand = (brandData) => {
    setBrands((prev) => {
      const existingIdx = prev.findIndex(b => b.id === brandData.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = brandData;
        return updated;
      } else {
        return [...prev, brandData];
      }
    });
    setSelectedBrand(brandData);
  };

  const handleDeleteBrand = (brandId) => {
    setBrands((prev) => {
      const filtered = prev.filter(b => b.id !== brandId);
      if (selectedBrand && selectedBrand.id === brandId) {
        setSelectedBrand(filtered.length > 0 ? filtered[0] : null);
      }
      return filtered;
    });
  };

  const handleGenerate = async () => {
    if (!selectedBrand) {
      alert('Por favor, cadastre a sua primeira conta/cliente antes de gerar!');
      handleOpenCreateBrand();
      return;
    }

    if (!isPro && credits <= 0) {
      setUpgradeReason('Você atingiu o limite de 3 gerações gratuitas. Desbloqueie o plano Pro para criar posts ilimitados!');
      setIsPricingOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const generated = await generateContent({
        brand: selectedBrand,
        format,
        topic,
        customTone,
        apiKey
      });

      setContent(generated);

      const newHistoryItem = {
        id: 'hist_' + Date.now(),
        brandId: selectedBrand.id,
        brandHandle: selectedBrand.handle,
        brandName: selectedBrand.name,
        format,
        topic,
        aspectRatio,
        createdAt: new Date().toISOString(),
        content: generated
      };

      setHistory(prev => [newHistoryItem, ...prev]);

      if (!isPro) {
        setCredits(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      alert('Houve um erro ao gerar. Tentando novamente com o motor de segurança...');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadPostFromHistory = (item) => {
    setContent(item.content);
    setFormat(item.format);
    if (item.aspectRatio) setAspectRatio(item.aspectRatio);
    setTopic(item.topic);

    const targetBrand = brands.find(b => b.id === item.brandId);
    if (targetBrand) setSelectedBrand(targetBrand);

    setActiveTab('all');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleDeleteHistoryItem = (itemId) => {
    setHistory(prev => prev.filter(item => item.id !== itemId));
  };

  const handleOpenHistorySection = () => {
    if (historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExportHtml = () => {
    if (!selectedBrand || !content) return;
    const htmlString = generateStandaloneHtml({
      brand: selectedBrand,
      content,
      format,
      aspectRatio
    });
    downloadHtmlFile(htmlString, `briefing-${selectedBrand.handle.replace('@', '')}-${format}-${aspectRatio.replace('/', 'x')}.html`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#000000] flex flex-col text-[#262626] dark:text-[#F5F5F5] transition-colors duration-200">
      
      <Header
        credits={credits}
        isPro={isPro}
        planType={planType}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={logout}
        onOpenPricing={() => {
          setUpgradeReason('');
          setIsPricingOpen(true);
        }}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        hasApiKey={apiKey.length > 5}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenHistory={handleOpenHistorySection}
        historyCount={selectedBrand ? history.filter(h => h.brandId === selectedBrand.id).length : history.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        <BrandKitSelector
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          onOpenCreateBrand={handleOpenCreateBrand}
          onOpenEditBrand={handleOpenEditBrand}
          isPro={isPro}
          planType={planType}
        />

        <ContentGenerator
          topic={topic}
          setTopic={setTopic}
          format={format}
          setFormat={setFormat}
          customTone={customTone}
          setCustomTone={setCustomTone}
          isLoading={isLoading}
          onGenerate={handleGenerate}
          hasBrand={!!selectedBrand}
        />

        {content && selectedBrand && (
          <div className="space-y-4 pt-2">
            
            <div className="flex items-center justify-between border-b border-[#DBDBDB] dark:border-[#262626] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#262626] dark:text-[#F5F5F5]">
                  Resultado da Publicação & Entregáveis ({selectedBrand.handle})
                </h2>
              </div>

              <div className="flex bg-white dark:bg-[#121212] p-1 rounded-xl border border-[#DBDBDB] dark:border-[#262626] gap-1 text-xs shadow-2xs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'all' ? 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white shadow-xs' : 'text-[#737373] dark:text-[#A8A8A8] hover:text-[#262626] dark:hover:text-white'
                  }`}
                >
                  Visão Geral
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all hidden sm:inline-flex items-center gap-1 ${
                    activeTab === 'preview' ? 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white shadow-xs' : 'text-[#737373] dark:text-[#A8A8A8] hover:text-[#262626] dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Feed</span>
                </button>
                <button
                  onClick={() => setActiveTab('caption')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all hidden sm:inline-flex items-center gap-1 ${
                    activeTab === 'caption' ? 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white shadow-xs' : 'text-[#737373] dark:text-[#A8A8A8] hover:text-[#262626] dark:hover:text-white'
                  }`}
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  <span>Legenda</span>
                </button>
                <button
                  onClick={() => setActiveTab('designer')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all hidden sm:inline-flex items-center gap-1 ${
                    activeTab === 'designer' ? 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white shadow-xs' : 'text-[#737373] dark:text-[#A8A8A8] hover:text-[#262626] dark:hover:text-white'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Designer</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {(activeTab === 'all' || activeTab === 'preview') && (
                <div className={activeTab === 'all' ? 'lg:col-span-5' : 'lg:col-span-12'}>
                  <PostPreview
                    content={content}
                    brand={selectedBrand}
                    format={format}
                    aspectRatio={aspectRatio}
                    onSelectAspectRatio={setAspectRatio}
                    onExportHtml={handleExportHtml}
                  />
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'caption' || activeTab === 'designer') && (
                <div className={activeTab === 'all' ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 space-y-6'}>
                  {(activeTab === 'all' || activeTab === 'caption') && (
                    <CaptionView
                      content={content}
                      brand={selectedBrand}
                      format={format}
                    />
                  )}

                  {(activeTab === 'all' || activeTab === 'designer') && (
                    <DesignerBriefing
                      content={content}
                      brand={selectedBrand}
                      aspectRatio={aspectRatio}
                      onExportHtml={handleExportHtml}
                    />
                  )}
                </div>
              )}

            </div>

          </div>
        )}

        <div ref={historyRef} className="pt-4">
          <HistorySection
            history={history}
            isPro={isPro}
            selectedBrand={selectedBrand}
            onLoadPost={handleLoadPostFromHistory}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onOpenPricing={() => {
              setUpgradeReason('Desbloqueie o histórico completo de postagens salvas e acesse todos os seus conteúdos anteriores!');
              setIsPricingOpen(true);
            }}
          />
        </div>

      </main>

      <footer className="bg-white dark:bg-[#121212] border-t border-[#DBDBDB] dark:border-[#262626] py-6 text-center text-xs text-[#737373] dark:text-[#A8A8A8] mt-auto transition-colors duration-200">
        <p>PostFlow AI Creator Suite · Sincronização na Nuvem para Criadores e Social Medias</p>
      </footer>

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        upgradeReason={upgradeReason}
        onUpgradeSuccess={(chosenPlan) => {
          const finalPlan = chosenPlan === 'agency' ? 'agency' : 'base';
          setPlanType(finalPlan);
          updateUserPlan(finalPlan);
        }}
      />

      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={setApiKey}
      />

      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        brandToEdit={brandToEdit}
        onSave={handleSaveBrand}
        onDelete={handleDeleteBrand}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
