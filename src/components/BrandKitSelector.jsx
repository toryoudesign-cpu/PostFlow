import React from 'react';
import { Palette, Check, Plus, Edit2, Lock } from 'lucide-react';

export default function BrandKitSelector({
  brands,
  selectedBrand,
  onSelectBrand,
  onOpenCreateBrand,
  onOpenEditBrand,
  isPro,
  planType
}) {
  const maxBrandsAllowed = !isPro ? 2 : (planType === 'agency' ? Infinity : 5);
  const isLimitReached = brands.length >= maxBrandsAllowed;

  return (
    <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-5 shadow-xs transition-colors duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center text-white shadow-xs">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Contas & Identidades Conectadas</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isLimitReached 
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  : 'bg-[#FAFAFA] dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A8A8A8] border-[#DBDBDB] dark:border-[#333333]'
              }`}>
                {brands.length} de {maxBrandsAllowed === Infinity ? '∞' : maxBrandsAllowed} clientes
              </span>
            </div>
            <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">Selecione ou crie novas personalidades para a IA com paleta e tom de voz</p>
          </div>
        </div>

        <button
          onClick={onOpenCreateBrand}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs transform hover:-translate-y-0.5 ${
            isLimitReached && !isPro
              ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
              : 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white hover:opacity-95'
          }`}
        >
          {isLimitReached && !isPro ? <Lock className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 stroke-[3]" />}
          <span>{isLimitReached && !isPro ? 'Desbloquear Mais Clientes' : 'Nova Identidade'}</span>
        </button>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {brands.map((brand) => {
          const isSelected = selectedBrand.id === brand.id;
          return (
            <div
              key={brand.id}
              onClick={() => onSelectBrand(brand)}
              className={`p-3.5 rounded-xl border text-left transition-all relative group cursor-pointer ${
                isSelected
                  ? 'border-[#E1306C] bg-gradient-to-r from-pink-50/40 to-purple-50/20 dark:from-pink-950/20 dark:to-purple-950/20 ring-2 ring-[#E1306C]/20 shadow-xs'
                  : 'border-[#DBDBDB] dark:border-[#262626] hover:border-[#833AB4] bg-white dark:bg-[#1A1A1A]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="story-ring">
                    <div className="story-ring-inner bg-white dark:bg-[#1A1A1A]">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                        style={{ background: brand.colors.primary }}
                      >
                        {brand.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#262626] dark:text-[#F5F5F5] truncate max-w-[120px]">{brand.name}</h4>
                    <p className="text-[11px] font-semibold text-[#833AB4] dark:text-pink-400 truncate max-w-[120px]">{brand.handle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEditBrand(brand);
                    }}
                    title="Editar esta personalidade"
                    className="p-1 rounded-md text-[#737373] dark:text-[#A8A8A8] hover:text-[#E1306C] hover:bg-black/5 dark:hover:bg-white/10 opacity-75 group-hover:opacity-100 transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Active Selected Badge */}
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] mt-2 line-clamp-1">{brand.niche}</p>

              {/* Color Swatch Dots */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-black/10 shadow-2xs" style={{ background: brand.colors.primary }} />
                  <span className="w-3 h-3 rounded-full border border-black/10 shadow-2xs" style={{ background: brand.colors.dark }} />
                  <span className="w-3 h-3 rounded-full border border-black/10 shadow-2xs" style={{ background: brand.colors.accent }} />
                  <span className="w-3 h-3 rounded-full border border-black/10 shadow-2xs" style={{ background: brand.colors.light }} />
                  <span className="w-3 h-3 rounded-full border border-black/10 shadow-2xs" style={{ background: brand.colors.highlight }} />
                </div>
                <span className="text-[10px] text-[#833AB4] dark:text-pink-400 font-medium">
                  {brand.lowercaseRules ? 'minúsculo' : 'padrão'}
                </span>
              </div>
            </div>
          );
        })}

        {/* Create New Brand Quick Card */}
        <button
          type="button"
          onClick={onOpenCreateBrand}
          className="p-3.5 rounded-xl border-2 border-dashed border-[#DBDBDB] dark:border-[#333333] hover:border-[#E1306C] dark:hover:border-[#E1306C] bg-[#FAFAFA]/50 dark:bg-[#1A1A1A]/50 flex flex-col items-center justify-center text-center gap-2 hover:bg-pink-50/20 transition-all min-h-[96px] group"
        >
          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#262626] border border-[#DBDBDB] dark:border-[#333333] flex items-center justify-center text-[#737373] group-hover:text-[#E1306C] group-hover:border-[#E1306C] transition-all">
            {isLimitReached && !isPro ? <Lock className="w-4 h-4 text-amber-600" /> : <Plus className="w-4 h-4" />}
          </div>
          <div>
            <span className="font-bold text-xs text-[#262626] dark:text-[#F5F5F5] block group-hover:text-[#E1306C]">
              {isLimitReached && !isPro ? 'Desbloquear Clientes' : 'Adicionar Cliente'}
            </span>
            <span className="text-[10px] text-[#737373] dark:text-[#A8A8A8]">
              {isLimitReached && !isPro ? 'Limite atingido no Grátis' : 'Personalidade & Cores'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
