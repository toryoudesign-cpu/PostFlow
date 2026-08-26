import React, { useState } from 'react';
import { Crown, Key, Zap, Sun, Moon, History, Menu, X, Check, User, LogOut, Cloud, Laptop, Smartphone } from 'lucide-react';

export function PostFlowIcon({ className = 'w-8 h-8 sm:w-9 sm:h-9' }) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={`${className} flex-shrink-0 shadow-md rounded-xl overflow-hidden`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pf-monogram-grad" x1="0%" y1="15%" x2="100%" y2="85%">
          <stop offset="0%" stopColor="#F94C43" />
          <stop offset="35%" stopColor="#E1277B" />
          <stop offset="70%" stopColor="#8A34CC" />
          <stop offset="100%" stopColor="#5142E6" />
        </linearGradient>
      </defs>
      <circle cx="250" cy="250" r="250" fill="url(#pf-monogram-grad)" />
      <g fill="none" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 125 380 L 125 155 C 125 130 145 120 175 120 L 265 120" />
        <path d="M 265 120 L 265 380" />
        <path d="M 265 120 L 380 120" />
        <path d="M 125 250 L 365 250" />
      </g>
      <circle cx="315" cy="185" r="17" fill="#FFFFFF" />
      <circle cx="315" cy="285" r="17" fill="#FFFFFF" />
    </svg>
  );
}

export default function Header({
  credits,
  isPro,
  planType,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenPricing,
  onOpenApiKey,
  hasApiKey,
  theme,
  onToggleTheme,
  onOpenHistory,
  historyCount
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMobileAction = (actionFn) => {
    setIsMobileMenuOpen(false);
    actionFn();
  };

  return (
    <header className="bg-white dark:bg-[#121212] border-b border-[#DBDBDB] dark:border-[#262626] sticky top-0 z-40 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <PostFlowIcon className="w-8 h-8 sm:w-9 sm:h-9" />
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
          
          {/* History Button */}
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

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            className="p-2 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] text-[#262626] dark:text-[#F5F5F5] hover:border-[#833AB4] hover:text-[#833AB4] transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#737373]" />}
          </button>

          {/* API Key */}
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

          {/* Upgrade / Plan Badge */}
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

          {/* Auth / User Profile Button & Dropdown */}
          <div className="relative">
            {currentUser ? (
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] hover:border-[#833AB4] transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Sincronizado na Nuvem" />
                  <span className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5] truncate max-w-[100px]">
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                </div>
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Foto" className="w-7 h-7 rounded-lg object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#E1306C] text-white flex items-center justify-center font-bold text-xs">
                    {(currentUser.displayName || currentUser.email).charAt(0).toUpperCase()}
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] text-[#262626] dark:text-white hover:border-[#833AB4] transition-all"
              >
                <User className="w-3.5 h-3.5 text-[#833AB4]" />
                <span>Entrar</span>
              </button>
            )}

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && currentUser && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1A1A1A] p-3 shadow-xl z-50 space-y-2 text-left">
                <div className="pb-2 border-b border-black/5 dark:border-white/5">
                  <p className="text-xs font-bold text-[#262626] dark:text-white truncate">{currentUser.displayName || 'Criador'}</p>
                  <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] truncate">{currentUser.email}</p>
                  <div className="flex items-center gap-1 mt-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Cloud className="w-3 h-3" />
                    <span>Nuvem ativa (PC ⇄ Celular)</span>
                  </div>
                </div>

                <div className="text-[11px] space-y-1">
                  <div className="p-2 rounded-lg bg-[#FAFAFA] dark:bg-[#262626] flex items-center justify-between">
                    <span className="text-[#737373] dark:text-[#A8A8A8]">Plano:</span>
                    <span className="font-bold text-[#833AB4] dark:text-pink-400 uppercase">
                      {isPro ? (planType === 'agency' ? 'Equipe' : 'Base') : 'Gratuito'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair da Conta</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Top Header Actions & Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {currentUser ? (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#E1306C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {(currentUser.displayName || currentUser.email).charAt(0).toUpperCase()}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E]"
            >
              Entrar
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
          
          {/* Mobile User Profile Status */}
          {currentUser ? (
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-900 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#262626] dark:text-white block">{currentUser.displayName || currentUser.email}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  <span>Sincronizado na Nuvem</span>
                </span>
              </div>
              <button
                onClick={() => handleMobileAction(onLogout)}
                className="text-[11px] font-bold text-red-600 dark:text-red-400"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleMobileAction(onOpenAuth)}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <User className="w-4 h-4" />
              <span>Entrar com Google / E-mail para Sincronizar</span>
            </button>
          )}

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
