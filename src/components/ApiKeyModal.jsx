import React, { useState } from 'react';
import { X, Key, ExternalLink, Check } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(tempKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-md w-full border border-[#DBDBDB] dark:border-[#333333] shadow-2xl p-6 relative text-[#262626] dark:text-[#F5F5F5]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAFAFA] dark:bg-[#262626] hover:bg-pink-50 text-[#737373] dark:text-[#A8A8A8] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-[#E1306C] border border-pink-200 dark:border-pink-900/50">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#262626] dark:text-[#F5F5F5]">Chave de API do Gemini</h3>
            <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">Opcional: Conecte sua própria conta Google</p>
          </div>
        </div>

        <p className="text-xs text-[#737373] dark:text-[#A8A8A8] leading-relaxed mb-4">
          Você pode conectar sua chave gratuita do <strong>Google AI Studio</strong> para fazer chamadas diretas ao <strong>Gemini 2.0 Flash / 3.7</strong>. Se deixar em branco, o sistema utilizará o motor inteligente de demonstração.
        </p>

        <div className="mb-4">
          <label className="text-[11px] font-bold uppercase text-[#737373] dark:text-[#A8A8A8] block mb-1.5">
            Cole sua Gemini API Key
          </label>
          <input
            type="password"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full text-xs p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] focus:border-[#E1306C] focus:ring-2 focus:ring-[#E1306C]/20 outline-none font-mono bg-[#FAFAFA] dark:bg-[#121212] text-[#262626] dark:text-[#F5F5F5]"
          />
        </div>

        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#833AB4] dark:text-pink-400 hover:underline mb-5"
        >
          <span>Como pegar minha chave gratuita no Google AI Studio</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] text-xs font-bold text-[#737373] dark:text-[#A8A8A8] hover:bg-[#FAFAFA] dark:hover:bg-[#262626]"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 hover:opacity-95"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? 'Salvo!' : 'Salvar Chave'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
