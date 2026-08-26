import React, { useState } from 'react';
import { Copy, Check, Hash, MessageSquareText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CaptionView({ content, brand, format }) {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const handleCopy = () => {
    const fullText = `${content.caption}\n\n${content.hashtags}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-5 sm:p-6 shadow-xs transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center text-white">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Legenda Pronta para o Feed</h3>
            <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">Copy otimizada com gancho inicial, quebras de linha e CTA</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            copied
              ? 'bg-[#262626] dark:bg-white text-white dark:text-[#121212]'
              : 'bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white transform hover:-translate-y-0.5'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Copiado com Sucesso!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Legenda</span>
            </>
          )}
        </button>
      </div>

      {/* Theme & Hook Badges */}
      <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] p-3.5 rounded-xl border border-[#EFEFEF] dark:border-[#262626] mb-4">
        <div className="text-[11px] font-bold uppercase text-[#833AB4] dark:text-pink-400 tracking-wider mb-1">
          Tema & Gancho Inicial
        </div>
        <p className="text-xs font-semibold text-[#262626] dark:text-[#F5F5F5]">{content.theme}</p>
        <p className="text-[11.5px] italic text-[#737373] dark:text-[#A8A8A8] mt-1 border-l-2 border-[#E1306C] pl-2">
          "{content.hook}"
        </p>
      </div>

      {/* Caption Content Box */}
      <div className="relative">
        <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-[#DBDBDB] dark:border-[#262626] rounded-xl p-4 text-xs sm:text-sm text-[#262626] dark:text-[#E0E0E0] leading-relaxed whitespace-pre-line font-normal">
          {content.caption}
        </div>
      </div>

      {/* Hashtags */}
      <div className="mt-3.5 pt-3.5 border-t border-[#EFEFEF] dark:border-[#262626] flex items-center gap-2">
        <Hash className="w-4 h-4 text-[#833AB4] dark:text-pink-400 flex-shrink-0" />
        <p className="text-xs font-semibold text-[#833AB4] dark:text-pink-400 leading-relaxed break-words">
          {content.hashtags}
        </p>
      </div>
    </div>
  );
}
