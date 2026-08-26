import React, { useState } from 'react';
import { Crown, Key, Zap, Sun, Moon, History, Menu, X, Check } from 'lucide-react';

export default function Header({
  credits,
  isPro,
  planType,
  onOpenPricing,
  onOpenApiKey,
  hasApiKey,
  theme,
  onToggleTheme,
  onOpenHistory,
  historyCount
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileAction = (actionFn) => {
    setIsMobileMenuOpen(false);
    actionFn();
  };

  return (
    <header className="bg-white dark:bg-[#121212] border-b border-[#DBDBDB] dark:border-[#262626] sticky top-0 z-40 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand com Novo Ícone Oficial */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img
            src="/logo.png"
            alt="PostFlow AI Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-md object-cover flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-[#262626] dark:text-[#F5F5F5]">PostFlow</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
                IG Creator
              </span>
            </div>
            <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] hidden md:block">Gerador de Conteúdo & Briefings com IA para Instagram</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] text-[#262626] dark:text-[#F5F5F5] hover:border-[#833AB4] hover:text-[#833AB4] transition-all"
            title="Ver histórico de postagens criadas"
          >
            <History className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>Histórico</span>
            {isPro && historyCount > 0 && (
              <span className="bg-[#833AB4] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {historyCount}
              </span>
            )}
            {!isPro && (
              <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                PRO
              </span>
            )}
          </button>

          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            className="p-2 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] text-[#262626] dark:text-[#F5F5F5] hover:border-[#833AB4] hover:text-[#833AB4] transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#737373]" />}
          </button>

          <button
            onClick={onOpenApiKey}
            title={hasApiKey ? 'Chave Gemini configurada' : 'Configurar Chave API Gemini'}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
              hasApiKey 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                : 'bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A8A8A8] border-[#DBDBDB] dark:border-[#333333] hover:border-[#833AB4] hover:text-[#833AB4]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasApiKey ? 'Gemini Ativo' : 'API Key'}</span>
          </button>

          {isPro ? (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm">
              <Crown className="w-4 h-4 text-amber-200" />
              <span>{planType === 'agency' ? 'Equipe (Ilimitado)' : 'Base (5 Marcas)'}</span>
            </div>
          ) : (
            <button
              onClick={onOpenPricing}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-pink-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Assinar Pro · R$ 10</span>
            </button>
          )}

        </div>

        {/* Mobile Top Actions & Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {isPro ? (
            <span className="text-[10px] font-bold bg-pink-100 dark:bg-pink-950/60 text-[#E1306C] px-2.5 py-1 rounded-full border border-pink-200 dark:border-pink-900 flex items-center gap-1">
              <Crown className="w-3 h-3" />
              <span>PRO</span>
            </span>
          ) : (
            <button
              onClick={onOpenPricing}
              className="text-[11px] font-bold bg-gradient-to-r from-[#E1306C] to-[#FD1D1D] text-white px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>Pro R$ 10</span>
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] text-[#262626] dark:text-[#F5F5F5] hover:text-[#E1306C] transition-all"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#DBDBDB] dark:border-[#262626] bg-white dark:bg-[#121212] px-4 py-4 space-y-2.5 shadow-xl">
          
          <button
            onClick={() => handleMobileAction(onOpenApiKey)}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#1A1A1A] text-xs font-bold text-[#262626] dark:text-white"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Key className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block">Configurar Chave API Gemini</span>
                <span className="text-[10px] text-[#737373] dark:text-[#A8A8A8] font-normal">
                  {hasApiKey ? 'Chave personalizada ativa' : 'Conectar API da equipe'}
                </span>
              </div>
            </div>
            {hasApiKey && <Check className="w-4 h-4 text-emerald-600" />}
          </button>

          <button
            onClick={() => handleMobileAction(onOpenHistory)}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#1A1A1A] text-xs font-bold text-[#262626] dark:text-white"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-[#833AB4] flex items-center justify-center">
                <History className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block">Histórico de Postagens</span>
                <span className="text-[10px] text-[#737373] dark:text-[#A8A8A8] font-normal">
                  Revisitar posts salvos por cliente
                </span>
              </div>
            </div>
            {historyCount > 0 && isPro && (
              <span className="bg-[#833AB4] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#1A1A1A] text-xs font-bold text-[#262626] dark:text-white"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
              <span>Alternar Modo {theme === 'dark' ? 'Claro' : 'Escuro'}</span>
            </div>
            <span className="text-[10px] text-[#737373] dark:text-[#A8A8A8] uppercase font-bold">
              {theme === 'dark' ? 'Escuro' : 'Claro'}
            </span>
          </button>

          {!isPro && (
            <button
              onClick={() => handleMobileAction(onOpenPricing)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] text-white text-xs font-bold shadow-md shadow-pink-500/20 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Desbloquear Plano Pro por R$ 10/mês</span>
            </button>
          )}

        </div>
      )}

    </header>
  );
}
