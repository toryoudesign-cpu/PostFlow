import React from 'react';
import { Sparkles, Layers, FileText, Video, Wand2 } from 'lucide-react';

export default function ContentGenerator({
  topic,
  setTopic,
  format,
  setFormat,
  customTone,
  setCustomTone,
  isLoading,
  onGenerate
}) {
  const formats = [
    {
      id: 'simples',
      title: 'Post Simples',
      desc: 'Card tipográfico ou foto de impacto',
      icon: FileText
    },
    {
      id: 'carrossel',
      title: 'Carrossel Educativo',
      desc: '5 a 6 slides com gancho e CTA',
      icon: Layers
    },
    {
      id: 'reel',
      title: 'Roteiro de Reel',
      desc: 'Fala para câmera ~45s com minutagem',
      icon: Video
    }
  ];

  return (
    <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-5 sm:p-6 shadow-xs transition-colors duration-200">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FD1D1D] to-[#F77737] flex items-center justify-center text-white">
          <Wand2 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Criador de Conteúdo com IA</h3>
          <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">Configure o objetivo do post para gerar a copy + visual do feed</p>
        </div>
      </div>

      {/* Format Selector */}
      <div className="mb-4">
        <label className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5] uppercase tracking-wider block mb-2">
          1. Formato da Publicação
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {formats.map((item) => {
            const Icon = item.icon;
            const isSelected = format === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFormat(item.id)}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  isSelected
                    ? 'border-[#E1306C] bg-gradient-to-r from-pink-50/50 to-purple-50/30 dark:from-pink-950/20 dark:to-purple-950/20 ring-2 ring-[#E1306C]/20 shadow-xs'
                    : 'border-[#DBDBDB] dark:border-[#262626] hover:border-[#833AB4] bg-white dark:bg-[#1A1A1A]'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white shadow-xs' : 'bg-[#FAFAFA] dark:bg-[#262626] text-[#737373] dark:text-[#A8A8A8]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#262626] dark:text-[#F5F5F5]">{item.title}</h4>
                  <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] mt-0.5">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic / Idea Input */}
      <div className="mb-4">
        <label className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5] uppercase tracking-wider block mb-2">
          2. Tema, Ideia ou Dor do Público
        </label>
        <textarea
          rows={3}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ex: O cansaço que não passa dormindo e a sensação de ter que dar conta de tudo sozinha..."
          className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] focus:border-[#E1306C] focus:ring-2 focus:ring-[#E1306C]/20 outline-none transition-all resize-none bg-[#FAFAFA] dark:bg-[#1A1A1A] text-[#262626] dark:text-[#F5F5F5] placeholder:text-[#8E8E8E]"
        />
        <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1 text-[11px]">
          <span className="text-[#737373] dark:text-[#A8A8A8] whitespace-nowrap font-semibold">Sugestões de temas:</span>
          <button
            type="button"
            onClick={() => setTopic('A dificuldade de dizer não e a culpa que vem depois')}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-[#1E1E1E] hover:bg-pink-50 dark:hover:bg-pink-950/30 text-[#833AB4] dark:text-pink-300 hover:text-[#E1306C] border border-[#DBDBDB] dark:border-[#333333] hover:border-[#E1306C] whitespace-nowrap font-medium transition-all"
          >
            Dizer não & Culpa
          </button>
          <button
            type="button"
            onClick={() => setTopic('Perfeccionismo como mecanismo de defesa e medo de errar')}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-[#1E1E1E] hover:bg-pink-50 dark:hover:bg-pink-950/30 text-[#833AB4] dark:text-pink-300 hover:text-[#E1306C] border border-[#DBDBDB] dark:border-[#333333] hover:border-[#E1306C] whitespace-nowrap font-medium transition-all"
          >
            Perfeccionismo
          </button>
          <button
            type="button"
            onClick={() => setTopic('Por que esperar a motivação chegar é uma armadilha na ACT')}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-[#1E1E1E] hover:bg-pink-50 dark:hover:bg-pink-950/30 text-[#833AB4] dark:text-pink-300 hover:text-[#E1306C] border border-[#DBDBDB] dark:border-[#333333] hover:border-[#E1306C] whitespace-nowrap font-medium transition-all"
          >
            Motivação & Valores
          </button>
        </div>
      </div>

      {/* Generate Button with Instagram Vibrant Gradient */}
      <button
        type="button"
        disabled={isLoading}
        onClick={onGenerate}
        className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
          isLoading
            ? 'bg-[#A8A8A8] text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-95 text-white shadow-pink-500/25 transform hover:-translate-y-0.5 active:translate-y-0'
        }`}
      >
        <Sparkles className={`w-4 h-4 text-amber-200 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? 'Criando Copy & Briefing com IA...' : 'Gerar Post, Visual & Briefing Completo'}</span>
      </button>
    </div>
  );
}
