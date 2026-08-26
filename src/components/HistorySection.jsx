import React, { useState } from 'react';
import { History, Lock, Sparkles, ArrowRight, Trash2, Copy, Download, Calendar, Tag, Check, Search, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateStandaloneHtml, downloadHtmlFile } from '../services/htmlExportService';

export default function HistorySection({
  history = [],
  isPro,
  selectedBrand,
  onLoadPost,
  onDeleteHistoryItem,
  onOpenPricing
}) {
  const [filterBrandId, setFilterBrandId] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  if (!isPro) {
    return (
      <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-8 shadow-xs text-center relative overflow-hidden transition-colors duration-200">
        <div className="max-w-md mx-auto py-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FD1D1D] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/20">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider bg-pink-50 dark:bg-pink-950/40 text-[#E1306C] px-3 py-1 rounded-full border border-pink-200 dark:border-pink-900/50 mb-3 inline-block">
            Recurso Exclusivo Pro
          </span>

          <h3 className="text-xl font-bold text-[#262626] dark:text-[#F5F5F5] mb-2">
            Histórico de Postagens por Cliente
          </h3>
          <p className="text-xs sm:text-sm text-[#737373] dark:text-[#A8A8A8] leading-relaxed mb-6">
            Nunca mais perca uma ideia! O histórico salva automaticamente todos os posts, carrosséis e roteiros gerados para cada cliente, permitindo recarregar ou exportar quando quiser.
          </p>

          <button
            onClick={onOpenPricing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-pink-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Desbloquear Histórico a partir de R$ 10/mês</span>
          </button>
        </div>
      </div>
    );
  }

  const currentBrandId = selectedBrand?.id || '';
  const currentBrandHandle = selectedBrand?.handle || 'todos os clientes';

  const filteredHistory = history.filter(item => {
    if (!item) return false;
    const matchesBrand = filterBrandId === 'all' || !currentBrandId || item.brandId === currentBrandId;
    const topicText = (item.topic || '').toLowerCase();
    const themeText = (item.content?.theme || '').toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || topicText.includes(searchLower) || themeText.includes(searchLower);
    return matchesBrand && matchesSearch;
  });

  const handleCopy = (item) => {
    if (!item?.content) return;
    const fullText = `${item.content.caption || ''}\n\n${item.content.hashtags || ''}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleExportHtml = (item) => {
    if (!item?.content) return;
    const dummyBrand = {
      id: item.brandId || 'brand',
      handle: item.brandHandle || '@perfil',
      name: item.brandName || 'Perfil',
      niche: 'Geral',
      colors: {
        bg: '#FDFBF7',
        primary: '#4A2B0F',
        dark: '#2D1807',
        light: '#F0E8DC',
        accent: '#D4A373',
        highlight: '#8A4A1C'
      }
    };
    const htmlString = generateStandaloneHtml({
      brand: selectedBrand || dummyBrand,
      content: item.content,
      format: item.format || 'simples',
      aspectRatio: item.aspectRatio || '4/5'
    });
    downloadHtmlFile(htmlString, `historico-${(item.brandHandle || 'post').replace('@', '')}-${item.format || 'post'}.html`);
  };

  return (
    <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-5 sm:p-6 shadow-xs transition-colors duration-200">
      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-[#DBDBDB] dark:border-[#262626]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center text-white shadow-xs">
            <History className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Histórico de Conteúdos Criados</h3>
              <span className="text-[10px] font-bold bg-[#833AB4] text-white px-2 py-0.5 rounded-full">
                PRO
              </span>
            </div>
            <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">
              {filteredHistory.length} postagens salvas {filterBrandId === 'current' ? `para ${currentBrandHandle}` : 'no total'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar no histórico..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#1A1A1A] text-[#262626] dark:text-white outline-none focus:border-[#833AB4] w-40 sm:w-48"
            />
          </div>

          {selectedBrand && (
            <div className="inline-flex rounded-xl border border-[#DBDBDB] dark:border-[#333333] p-0.5 bg-[#FAFAFA] dark:bg-[#1A1A1A] text-xs">
              <button
                onClick={() => setFilterBrandId('current')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filterBrandId === 'current' ? 'bg-[#833AB4] text-white shadow-xs' : 'text-[#737373] hover:text-[#262626] dark:hover:text-white'
                }`}
              >
                {selectedBrand.handle}
              </button>
              <button
                onClick={() => setFilterBrandId('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filterBrandId === 'all' ? 'bg-[#833AB4] text-white shadow-xs' : 'text-[#737373] hover:text-[#262626] dark:hover:text-white'
                }`}
              >
                Todos
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-[#DBDBDB] dark:border-[#262626] rounded-xl bg-[#FAFAFA]/50 dark:bg-[#1A1A1A]/30">
          <History className="w-8 h-8 text-[#8E8E8E] mx-auto mb-2 opacity-50" />
          <p className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5]">Nenhuma postagem encontrada no histórico</p>
          <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] mt-1 max-w-xs mx-auto">
            {searchTerm ? 'Tente buscar por outro termo.' : 'Gere novos posts para que eles sejam salvos automaticamente aqui!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredHistory.map((item) => {
            const dateFormatted = new Date(item.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short'
            });

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-[#DBDBDB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#1A1A1A] hover:border-[#833AB4] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-bold text-[#833AB4] dark:text-pink-400 truncate max-w-[130px]">
                      {item.brandHandle || '@perfil'}
                    </span>
                    <div className="flex items-center gap-1.5 text-[#737373] dark:text-[#A8A8A8]">
                      <span className="uppercase text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">
                        {item.format || 'post'}
                      </span>
                      <span>{dateFormatted}</span>
                    </div>
                  </div>

                  <h4 className="font-bold text-xs text-[#262626] dark:text-[#F5F5F5] line-clamp-2 mb-1.5">
                    {item.topic}
                  </h4>

                  <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] line-clamp-3 mb-3 leading-relaxed">
                    {item.content?.cardTitle ? item.content.cardTitle.replace(/<br>/g, ' ') : (item.content?.theme || '')}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(item)}
                      title="Copiar Legenda e Hashtags"
                      className="p-1.5 rounded-lg border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#262626] text-[#737373] hover:text-[#833AB4] transition-all"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleExportHtml(item)}
                      title="Baixar Mini-Site HTML"
                      className="p-1.5 rounded-lg border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#262626] text-[#737373] hover:text-[#833AB4] transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      title="Excluir do Histórico"
                      className="p-1.5 rounded-lg border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#262626] text-[#737373] hover:text-red-600 transition-all opacity-60 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onLoadPost(item)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white font-bold text-[11px] flex items-center gap-1 shadow-xs hover:opacity-95 transition-all"
                  >
                    <span>Carregar</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
