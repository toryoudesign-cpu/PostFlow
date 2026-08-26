import React from 'react';
import { Instagram, Crown, Key, Zap, Sun, Moon, History } from 'lucide-react';

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
  return (
    <header className="bg-white dark:bg-[#121212] border-b border-[#DBDBDB] dark:border-[#262626] sticky top-0 z-30 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand with Instagram Gradient */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FCAF45] via-[#FD1D1D] to-[#833AB4] flex items-center justify-center text-white shadow-md">
            <Instagram className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[#262626] dark:text-[#F5F5F5]">PostFlow</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white px-2 py-0.5 rounded-full shadow-xs">
                IG Creator
              </span>
            </div>
            <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] hidden sm:block">Gerador de Conteúdo & Briefings com IA para Instagram</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] text-[#262626] dark:text-[#F5F5F5] hover:border-[#833AB4] hover:text-[#833AB4] transition-all"
            title="Ver histórico de postagens criadas"
          >
            <History className="w-3.5 h-3.5 text-[#E1306C]" />
            <span className="hidden sm:inline">Histórico</span>
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

          {/* API Key settings button */}
          <button
            onClick={onOpenApiKey}
            title={hasApiKey ? 'Chave Gemini configurada' : 'Configurar Chave API Gemini (Opcional)'}
            className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
              hasApiKey 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                : 'bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A8A8A8] border-[#DBDBDB] dark:border-[#333333] hover:border-[#833AB4] hover:text-[#833AB4]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasApiKey ? 'Gemini Ativo' : 'API Key'}</span>
          </button>

          {/* Credits Counter / Pro Status */}
          {isPro ? (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm">
              <Crown className="w-4 h-4 text-amber-200" />
              <span>{planType === 'agency' ? 'Plano Equipe (Ilimitado)' : 'Plano Base (5 Marcas)'}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-[#737373] dark:text-[#A8A8A8] block">Plano Grátis</span>
                <span className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5]">{credits} gerações</span>
              </div>
              <button
                onClick={onOpenPricing}
                className="flex items-center gap-1.5 bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-pink-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Desbloquear Pro</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
