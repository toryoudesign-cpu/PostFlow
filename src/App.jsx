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
import { presetBrands } from './data/presetBrands';
import { generateContent } from './services/geminiService';
import { generateStandaloneHtml, downloadHtmlFile } from './services/htmlExportService';
import { Eye, MessageSquareText, PenTool, Sparkles, History } from 'lucide-react';

export default function App() {
  const historyRef = useRef(null);

  // Theme state (light / dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('postflow_theme') || 'light';
  });

  // Plan Type ('free' | 'base' | 'agency')
  const [planType, setPlanType] = useState(() => {
    return localStorage.getItem('postflow_plan_type') || 'free';
  });

  // Helper boolean for isPro (either base or agency)
  const isPro = planType === 'base' || planType === 'agency';

  // Brands / Personalities State (Trimmed to 2 preset brands for free tier by default if fresh)
  const [brands, setBrands] = useState(() => {
    const saved = localStorage.getItem('postflow_custom_brands');
    if (saved) return JSON.parse(saved);
    // If not saved, start with 2 initial brands for free tier
    return presetBrands.slice(0, 2);
  });

  // Selected Brand state
  const [selectedBrand, setSelectedBrand] = useState(() => {
    const saved = localStorage.getItem('postflow_custom_brands');
    const list = saved ? JSON.parse(saved) : presetBrands;
    return list[0] || presetBrands[0];
  });

  // Post History State
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('postflow_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'hist_initial',
        brandId: presetBrands[0].id,
        brandHandle: presetBrands[0].handle,
        brandName: presetBrands[0].name,
        format: 'simples',
        topic: 'O cansaço que não passa dormindo',
        aspectRatio: '4/5',
        createdAt: new Date().toISOString(),
        content: {
          theme: 'O cansaço emocional que não se resolve dormindo',
          hook: 'você dorme oito horas, descansa no fim de semana e na segunda-feira o corpo continua pesado.',
          cardTitle: 'tem cansaço<br>que não se resolve<br>dormindo.',
          cardSub: 'reflexão · sobrecarga mental',
          caption: `você dorme oito horas.\ndescansa no fim de semana.\ne na segunda-feira o corpo continua pesado.\n\nisso acontece porque existe um cansaço que não é só físico.\né a mente que passou dias inteiros em estado de alerta.\n\no sono descansa o corpo.\nmas a mente só descansa quando a gente aprende a soltar a necessidade constante de controle e vigília. 🤍`,
          hashtags: '#saúdemental #cansaçoemocional #terapia #manubarbosa',
          designerGuidelines: {
            visualDirection: 'Card tipográfico minimalista com fundo bege e tipografia em marrom escuro, 100% minúsculo.',
            suggestedBgColor: '#F0E8DC',
            suggestedTextColor: '#4A2B0F',
            fontPairing: 'DM Serif Display + DM Sans'
          }
        }
      }
    ];
  });

  // Aspect ratio state (4/5, 1/1, 3/4, 9/16)
  const [aspectRatio, setAspectRatio] = useState('4/5');

  // Format and Topic
  const [format, setFormat] = useState('simples');
  const [topic, setTopic] = useState('O cansaço que não passa dormindo e a sensação de carregar o mundo');
  const [customTone, setCustomTone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'preview', 'caption', 'designer', 'history'

  // Limits & ApiKey
  const [credits, setCredits] = useState(() => {
    const saved = localStorage.getItem('postflow_credits');
    return saved !== null ? parseInt(saved, 10) : 3;
  });
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('postflow_gemini_api_key') || '';
  });

  // Modals
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState('');
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

  // Content Initial State (Dra. Manu Barbosa)
  const [content, setContent] = useState({
    theme: 'O cansaço emocional que não se resolve dormindo (hipervigilância e estado de alerta)',
    hook: 'você dorme oito horas, descansa no fim de semana e na segunda-feira o corpo continua pesado.',
    cardTitle: 'tem cansaço<br>que não se resolve<br>dormindo.',
    cardSub: 'reflexão · sobrecarga mental & estado de alerta',
    caption: `você dorme oito horas.
descansa no fim de semana.
e na segunda-feira o corpo continua pesado.

isso acontece porque existe um cansaço que não é só físico.
é a mente que passou dias inteiros em estado de alerta.

calculando riscos, tentando antecipar imprevistos, segurando a barra de todo mundo e sustentando a sensação de que você precisa dar conta de tudo sozinha.

o sono descansa o corpo.
mas a mente só descansa quando a gente aprende a soltar a necessidade constante de controle e vigília.

e aprender a desacelerar esse alerta interno — com gentileza e sem se culpar — é um processo que a gente constrói em terapia. 🤍`,
    hashtags: '#saúdemental #cansaçoemocional #sobrecargamental #terapia #psicologiaonline #manubarbosa #autocuidado #autoconhecimento #londrina',
    designerGuidelines: {
      visualDirection: 'Card tipográfico minimalista com fundo bege e tipografia em marrom escuro, 100% minúsculo. Muito respiro e espaço negativo. Ou foto intimista da Manu com olhar contemplativo e luz natural suave.',
      suggestedBgColor: '#F0E8DC',
      suggestedTextColor: '#4A2B0F',
      fontPairing: 'DM Serif Display + DM Sans'
    }
  });

  // Handle Dark Mode toggle on <html> and <body>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#FAFAFA';
    }
    localStorage.setItem('postflow_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Persist State
  useEffect(() => {
    localStorage.setItem('postflow_custom_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('postflow_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('postflow_credits', credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem('postflow_plan_type', planType);
  }, [planType]);

  useEffect(() => {
    localStorage.setItem('postflow_gemini_api_key', apiKey);
  }, [apiKey]);

  // Brand Handlers: Create with Plan Limits
  const handleOpenCreateBrand = () => {
    const maxBrandsAllowed = planType === 'free' ? 2 : (planType === 'base' ? 5 : Infinity);

    if (brands.length >= maxBrandsAllowed) {
      if (planType === 'free') {
        setUpgradeReason('Você atingiu o limite de 2 clientes do plano gratuito. Faça upgrade para o Plano Base (até 5 clientes por R$ 25/mês) ou Plano Equipe (ilimitados por R$ 50/mês)!');
      } else if (planType === 'base') {
        setUpgradeReason('Você atingiu o limite de 5 clientes do Plano Base. Faça upgrade para o Plano Equipe (clientes ilimitados por R$ 50/mês)!');
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
      if (filtered.length > 0 && selectedBrand.id === brandId) {
        setSelectedBrand(filtered[0]);
      }
      return filtered;
    });
  };

  // Generation Handler
  const handleGenerate = async () => {
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

      // Save to History automatically
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

  // History Actions
  const handleLoadPostFromHistory = (item) => {
    setContent(item.content);
    setFormat(item.format);
    if (item.aspectRatio) setAspectRatio(item.aspectRatio);
    setTopic(item.topic);

    // Switch to target brand if available
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

  // Export standalone HTML mini-site
  const handleExportHtml = () => {
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
      
      {/* Header */}
      <Header
        credits={credits}
        isPro={isPro}
        planType={planType}
        onOpenPricing={() => {
          setUpgradeReason('');
          setIsPricingOpen(true);
        }}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        hasApiKey={apiKey.length > 5}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenHistory={handleOpenHistorySection}
        historyCount={history.filter(h => h.brandId === selectedBrand.id).length}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Brand Selector with Create/Edit Actions and Limits */}
        <BrandKitSelector
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          onOpenCreateBrand={handleOpenCreateBrand}
          onOpenEditBrand={handleOpenEditBrand}
          isPro={isPro}
          planType={planType}
        />

        {/* Content Creation Form */}
        <ContentGenerator
          topic={topic}
          setTopic={setTopic}
          format={format}
          setFormat={setFormat}
          customTone={customTone}
          setCustomTone={setCustomTone}
          isLoading={isLoading}
          onGenerate={handleGenerate}
        />

        {/* Output Section */}
        {content && (
          <div className="space-y-4 pt-2">
            
            {/* View Filter Tabs */}
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

            {/* Content Display Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Simulated Post with dynamic Aspect Ratio */}
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

              {/* Right Column: Caption + Designer Briefing */}
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

        {/* Pro Feature: History Section */}
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

      {/* Footer */}
      <footer className="bg-white dark:bg-[#121212] border-t border-[#DBDBDB] dark:border-[#262626] py-6 text-center text-xs text-[#737373] dark:text-[#A8A8A8] mt-auto transition-colors duration-200">
        <p>PostFlow AI Creator Suite · Desenvolvido para Criadores e Social Medias</p>
      </footer>

      {/* Modals */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        upgradeReason={upgradeReason}
        onUpgradeSuccess={(chosenPlan) => setPlanType(chosenPlan === 'agency' ? 'agency' : 'base')}
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

    </div>
  );
}
