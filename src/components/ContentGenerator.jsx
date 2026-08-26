import React from 'react';
import { Sparkles, MessageSquare, Layers, Video, ArrowRight, Wand2 } from 'lucide-react';

const FORMATS = [
  { id: 'simples', label: 'Post Simples', icon: MessageSquare, desc: '1 Card + Legenda Completa' },
  { id: 'carrossel', label: 'Carrossel (5 a 7 Slides)', icon: Layers, desc: 'Roteiro Visual Slide a Slide' },
  { id: 'reel', label: 'Roteiro de Reel / Vídeo', icon: Video, desc: 'Gancho + Cenas + Áudio' }
];

const SUGGESTIONS = [
  'Dicas práticas para quem lida com sobrecarga e ansiedade',
  'Por que esperar a motivação chegar não funciona',
  'A diferença entre autocuidado real e fuga da realidade',
  '3 sinais de que você está vivendo em estado de alerta'
];

export default function ContentGenerator({
  topic,
  setTopic,
  format,
  setFormat,
  customTone,
  setCustomTone,
  isLoading,
  onGenerate,
  hasBrand
}) {
  return (
    <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-5 sm:p-6 shadow-xs transition-colors duration-200">
      
      {/* Step 1: Format Selector */}
      <div className="mb-5">
        <label className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5] uppercase tracking-wider block mb-2">
          1. Escolha o Formato da Publicação
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {FORMATS.map((f) => {
            const Icon = f.icon;
            const isSelected = format === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'border-[#E1306C] bg-gradient-to-r from-pink-50/40 to-purple-50/20 dark:from-pink-950/30 dark:to-purple-950/30 ring-2 ring-[#E1306C]/20 shadow-xs'
                    : 'border-[#DBDBDB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#1A1A1A] hover:border-[#833AB4] text-[#737373] dark:text-[#A8A8A8]'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-gradient-to-tr from-[#833AB4] to-[#E1306C] text-white' : 'bg-white dark:bg-[#262626] text-[#737373] dark:text-[#A8A8A8]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#262626] dark:text-[#F5F5F5]">{f.label}</h4>
                  <p className="text-[10px] text-[#737373] dark:text-[#A8A8A8]">{f.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Topic & Generation Form */}
      <div>
        <label className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5] uppercase tracking-wider block mb-2">
          2. Qual é o Tema ou Ideia Central do Post?
        </label>
        
        <div className="relative mb-3">
          <textarea
            rows={3}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Como lidar com a autocrítica excessiva e a sensação de que nada está bom o suficiente..."
            className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#1A1A1A] text-[#262626] dark:text-white placeholder-[#8E8E8E] focus:border-[#E1306C] focus:ring-2 focus:ring-[#E1306C]/20 outline-none resize-none transition-all"
          />
        </div>

        {/* Quick Topic Suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          <span className="text-[11px] text-[#737373] dark:text-[#A8A8A8] font-medium flex items-center gap-1">
            <Wand2 className="w-3 h-3 text-[#833AB4]" />
            Sugestões rápidas:
          </span>
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setTopic(s)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-[#DBDBDB] dark:border-[#333333] text-[#737373] dark:text-[#A8A8A8] hover:border-[#833AB4] hover:text-[#833AB4] dark:hover:text-pink-400 transition-all truncate max-w-[280px]"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Submit Generate Button */}
        <button
          disabled={isLoading || !topic.trim()}
          onClick={onGenerate}
          className={`w-full py-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
            isLoading || !topic.trim()
              ? 'bg-[#DBDBDB] dark:bg-[#262626] text-[#8E8E8E] cursor-not-allowed'
              : 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-95 text-white shadow-pink-500/25 transform hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Gerando Estratégia de Conteúdo com IA...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Gerar Post, Carrossel & Briefing com IA</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </div>

    </div>
  );
}
