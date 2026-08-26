import React, { useState, useEffect } from 'react';
import { X, Palette, Check, Sparkles, Wand2, Trash2 } from 'lucide-react';

const PALETTE_PRESETS = [
  {
    name: 'Terracota & Bege',
    colors: { primary: '#8B5E3C', dark: '#4A2B0F', accent: '#C0A08A', light: '#F0E8DC', highlight: '#5C6B4A', bg: '#FAF8F5' }
  },
  {
    name: 'Verde Floresta & Sálvia',
    colors: { primary: '#3A5A40', dark: '#1C3322', accent: '#A3B18A', light: '#EAF0E6', highlight: '#DDA15E', bg: '#FAFAF8' }
  },
  {
    name: 'Rosa & Magenta Instagram',
    colors: { primary: '#E1306C', dark: '#121212', accent: '#833AB4', light: '#FCEFEB', highlight: '#FD1D1D', bg: '#FAFAFA' }
  },
  {
    name: 'Azul Executivo & Dourado',
    colors: { primary: '#1D3557', dark: '#0B192C', accent: '#457B9D', light: '#E2EAF2', highlight: '#D4AF37', bg: '#F8F9FA' }
  },
  {
    name: 'Minimalista Preto & Areia',
    colors: { primary: '#262626', dark: '#0A0A0A', accent: '#737373', light: '#F5F5F0', highlight: '#A89F91', bg: '#FFFFFF' }
  }
];

const TONE_SUGGESTIONS = [
  'Acolhedor e reflexivo',
  'Autoridade acessível',
  'Direto ao ponto e combativo',
  'Leve e descontraído',
  'Científico e educativo',
  'Inspiracional e provocativo'
];

export default function BrandModal({ isOpen, onClose, brandToEdit, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    handle: '',
    niche: '',
    targetAudience: '',
    tone: 'Acolhedor, intimista e reflexivo',
    lowercaseRules: true,
    fontSerif: 'DM Serif Display',
    fontSans: 'DM Sans',
    colors: {
      primary: '#8B5E3C',
      dark: '#4A2B0F',
      accent: '#C0A08A',
      light: '#F0E8DC',
      highlight: '#5C6B4A',
      bg: '#FAF8F5'
    }
  });

  useEffect(() => {
    if (brandToEdit) {
      setFormData(brandToEdit);
    } else {
      // Reset form for creating new brand
      setFormData({
        id: 'brand_' + Date.now(),
        name: '',
        handle: '@',
        niche: '',
        targetAudience: '',
        tone: 'Acolhedor, intimista e reflexivo',
        lowercaseRules: true,
        fontSerif: 'DM Serif Display',
        fontSans: 'DM Sans',
        colors: {
          primary: '#8B5E3C',
          dark: '#4A2B0F',
          accent: '#C0A08A',
          light: '#F0E8DC',
          highlight: '#5C6B4A',
          bg: '#FAF8F5'
        }
      });
    }
  }, [brandToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, informe o nome da marca ou profissional.');
      return;
    }
    const cleanHandle = formData.handle.startsWith('@') ? formData.handle : '@' + formData.handle;
    onSave({
      ...formData,
      handle: cleanHandle,
      id: formData.id || 'brand_' + Date.now()
    });
    onClose();
  };

  const applyPresetPalette = (presetColors) => {
    setFormData(prev => ({
      ...prev,
      colors: { ...presetColors }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-2xl w-full border border-[#DBDBDB] dark:border-[#333333] shadow-2xl overflow-hidden relative my-8 text-[#262626] dark:text-[#F5F5F5]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#EFEFEF] dark:border-[#262626] flex items-center justify-between bg-[#FAFAFA] dark:bg-[#121212]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center text-white">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#262626] dark:text-[#F5F5F5]">
                {brandToEdit ? 'Editar Identidade da Marca' : 'Criar Nova Identidade / Cliente'}
              </h3>
              <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">
                Configure a personalidade, público e paleta de cores da IA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#737373] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Row 1: Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#262626] dark:text-[#F5F5F5]">
                Nome do Profissional / Marca *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Dra. Ana Beatriz"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] text-[#262626] dark:text-white focus:border-[#E1306C] focus:ring-2 focus:ring-[#E1306C]/20 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#262626] dark:text-[#F5F5F5]">
                @handle do Instagram *
              </label>
              <input
                type="text"
                required
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                placeholder="Ex: @dra.anabeatriz"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] text-[#262626] dark:text-white focus:border-[#E1306C] focus:ring-2 focus:ring-[#E1306C]/20 outline-none"
              />
            </div>
          </div>

          {/* Row 2: Niche */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#262626] dark:text-[#F5F5F5]">
              Nicho / Especialidade *
            </label>
            <input
              type="text"
              required
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              placeholder="Ex: Psicologia Perinatal, Dermatologia, Nutrição Funcional, etc."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] text-[#262626] dark:text-white focus:border-[#E1306C] focus:ring-2 focus:ring-[#E1306C]/20 outline-none"
            />
          </div>

          {/* Row 3: Target Audience */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#262626] dark:text-[#F5F5F5]">
              Público-Alvo & Dores Principais
            </label>
            <textarea
              rows={2}
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="Ex: Mães recentes, sobrecarga emocional, autocobrança, ansiedade pós-parto..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] text-[#262626] dark:text-white focus:border-[#E1306C] focus:ring-2 focus:ring-[#E1306C]/20 outline-none resize-none"
            />
          </div>

          {/* Row 4: Tone of Voice & Quick Suggestions */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#262626] dark:text-[#F5F5F5]">
              Tom de Voz da IA
            </label>
            <input
              type="text"
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              placeholder="Ex: Acolhedor, intimista, reflexivo, direto..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] text-[#262626] dark:text-white focus:border-[#E1306C] focus:ring-2 focus:ring-[#E1306C]/20 outline-none mb-1.5"
            />
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="text-[#737373] dark:text-[#A8A8A8] self-center">Sugestões:</span>
              {TONE_SUGGESTIONS.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, tone: t })}
                  className="px-2 py-0.5 rounded-full bg-[#FAFAFA] dark:bg-[#262626] border border-[#DBDBDB] dark:border-[#333333] hover:border-[#833AB4] text-[#737373] dark:text-[#A8A8A8] hover:text-[#833AB4]"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Lowercase Typography Rule Checkbox */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#DBDBDB] dark:border-[#2D2D2D]">
            <input
              type="checkbox"
              id="lowercaseCheckbox"
              checked={formData.lowercaseRules}
              onChange={(e) => setFormData({ ...formData, lowercaseRules: e.target.checked })}
              className="w-4 h-4 rounded text-[#E1306C] focus:ring-[#E1306C] accent-[#E1306C] cursor-pointer"
            />
            <label htmlFor="lowercaseCheckbox" className="text-xs cursor-pointer select-none">
              <span className="font-bold text-[#262626] dark:text-white block">Estilo Editorial (Texto nos cards 100% em minúsculo)</span>
              <span className="text-[#737373] dark:text-[#A8A8A8] text-[11px]">Força a IA a formatar títulos e frases dos posts gráficos sempre em minúsculo</span>
            </label>
          </div>

          {/* Palette Preset Quick Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider block text-[#262626] dark:text-[#F5F5F5]">
                Paleta de Cores da Marca
              </label>
              <span className="text-[11px] text-[#737373] dark:text-[#A8A8A8]">Presets Rápidos:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
              {PALETTE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPresetPalette(preset.colors)}
                  className="p-2 rounded-lg border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] hover:border-[#833AB4] text-left transition-all"
                >
                  <span className="text-[10px] font-bold text-[#262626] dark:text-white block truncate mb-1">{preset.name}</span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.colors.primary }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.colors.accent }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.colors.light }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.colors.highlight }} />
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Individual Color Pickers */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#DBDBDB] dark:border-[#2D2D2D]">
              <div>
                <label className="text-[10px] font-bold text-[#737373] dark:text-[#A8A8A8] uppercase block mb-1">Primária</label>
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E1E1E] p-1 rounded-lg border border-[#DBDBDB] dark:border-[#333333]">
                  <input
                    type="color"
                    value={formData.colors.primary}
                    onChange={(e) => setFormData({ ...formData, colors: { ...formData.colors, primary: e.target.value } })}
                    className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-[11px] font-mono">{formData.colors.primary}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#737373] dark:text-[#A8A8A8] uppercase block mb-1">Escura</label>
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E1E1E] p-1 rounded-lg border border-[#DBDBDB] dark:border-[#333333]">
                  <input
                    type="color"
                    value={formData.colors.dark}
                    onChange={(e) => setFormData({ ...formData, colors: { ...formData.colors, dark: e.target.value } })}
                    className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-[11px] font-mono">{formData.colors.dark}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#737373] dark:text-[#A8A8A8] uppercase block mb-1">Destaque</label>
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E1E1E] p-1 rounded-lg border border-[#DBDBDB] dark:border-[#333333]">
                  <input
                    type="color"
                    value={formData.colors.accent}
                    onChange={(e) => setFormData({ ...formData, colors: { ...formData.colors, accent: e.target.value } })}
                    className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-[11px] font-mono">{formData.colors.accent}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#737373] dark:text-[#A8A8A8] uppercase block mb-1">Fundo Claro</label>
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E1E1E] p-1 rounded-lg border border-[#DBDBDB] dark:border-[#333333]">
                  <input
                    type="color"
                    value={formData.colors.light}
                    onChange={(e) => setFormData({ ...formData, colors: { ...formData.colors, light: e.target.value } })}
                    className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-[11px] font-mono">{formData.colors.light}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#737373] dark:text-[#A8A8A8] uppercase block mb-1">Realce</label>
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E1E1E] p-1 rounded-lg border border-[#DBDBDB] dark:border-[#333333]">
                  <input
                    type="color"
                    value={formData.colors.highlight}
                    onChange={(e) => setFormData({ ...formData, colors: { ...formData.colors, highlight: e.target.value } })}
                    className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-[11px] font-mono">{formData.colors.highlight}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-[#EFEFEF] dark:border-[#262626] flex items-center justify-between gap-3">
            {brandToEdit && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Tem certeza que deseja excluir o perfil "${formData.name}"?`)) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="px-3.5 py-2.5 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] text-xs font-bold text-[#737373] dark:text-[#A8A8A8] hover:bg-[#FAFAFA] dark:hover:bg-[#262626] transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-95 text-white text-xs font-bold transition-all shadow-md shadow-pink-500/20 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>{brandToEdit ? 'Salvar Alterações' : 'Criar Identidade'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
