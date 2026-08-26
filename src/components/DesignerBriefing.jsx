import React, { useState } from 'react';
import { PenTool, Copy, Check, FileCode } from 'lucide-react';

export default function DesignerBriefing({ content, brand, aspectRatio, onExportHtml }) {
  const [copiedHex, setCopiedHex] = useState(null);

  if (!content) return null;

  const handleCopyColor = (hex, label) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    });
  };

  const aspectDimMap = {
    '4/5': '1080 x 1350 px (Feed Vertical 4:5)',
    '1/1': '1080 x 1080 px (Quadrado 1:1)',
    '3/4': '1080 x 1440 px (Retrato 3:4)',
    '9/16': '1080 x 1920 px (Stories / Reels 9:16)'
  };

  return (
    <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-5 sm:p-6 shadow-xs transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4] flex items-center justify-center text-white">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Guia do Designer & Especificações</h3>
            <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">Diretrizes visuais para criação no Canva ou Photoshop</p>
          </div>
        </div>

        <button
          onClick={onExportHtml}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#833AB4] to-[#E1306C] hover:opacity-95 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Baixar Mini-Site HTML</span>
        </button>
      </div>

      {/* Visual Direction Box */}
      <div className="bg-gradient-to-r from-pink-50/40 to-purple-50/30 dark:from-pink-950/20 dark:to-purple-950/20 border-l-4 border-[#E1306C] rounded-r-xl p-4 mb-4">
        <h4 className="text-xs font-bold text-[#833AB4] dark:text-pink-400 uppercase tracking-wider mb-1">
          Diretriz Visual & Fotografia
        </h4>
        <p className="text-xs sm:text-sm text-[#262626] dark:text-[#E0E0E0] leading-relaxed">
          {content.designerGuidelines.visualDirection}
        </p>
      </div>

      {/* Typography & Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] p-3.5 rounded-xl border border-[#DBDBDB] dark:border-[#262626]">
          <span className="text-[10px] font-bold text-[#737373] dark:text-[#A8A8A8] uppercase block mb-1">Tipografia Oficial</span>
          <p className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5]">{content.designerGuidelines.fontPairing}</p>
          <p className="text-[11px] text-[#833AB4] dark:text-pink-400 mt-1 font-medium">
            {brand.lowercaseRules ? '• Regra: Todo texto nos cards em minúsculo' : '• Caixa normal com hierarquia clara'}
          </p>
        </div>

        <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] p-3.5 rounded-xl border border-[#DBDBDB] dark:border-[#262626]">
          <span className="text-[10px] font-bold text-[#737373] dark:text-[#A8A8A8] uppercase block mb-1">Formato Selecionado</span>
          <p className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5]">{aspectDimMap[aspectRatio] || '1080 x 1440 px (3:4)'}</p>
          <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] mt-1">Margens de respiro preservadas para o layout</p>
        </div>
      </div>

      {/* Palette Swatches */}
      <div>
        <span className="text-[10px] font-bold text-[#737373] dark:text-[#A8A8A8] uppercase block mb-2">
          Paleta de Cores do Cliente (Clique para Copiar o HEX)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {Object.entries(brand.colors).map(([key, hex]) => (
            <button
              key={key}
              onClick={() => handleCopyColor(hex, key)}
              className="flex items-center justify-between p-2 rounded-lg bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-[#DBDBDB] dark:border-[#262626] hover:border-[#833AB4] transition-all text-left"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md border border-black/10 flex-shrink-0 shadow-2xs" style={{ background: hex }} />
                <div>
                  <span className="text-[10px] text-[#737373] dark:text-[#A8A8A8] uppercase block font-medium capitalize">{key}</span>
                  <span className="text-xs font-mono font-bold text-[#262626] dark:text-[#F5F5F5]">{hex}</span>
                </div>
              </div>
              {copiedHex === hex ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-[#8E8E8E]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
