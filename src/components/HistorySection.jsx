import React, { useState } from 'react';
import { History, Lock, Sparkles, ArrowRight, Trash2, Copy, Download, Calendar, Tag, Check, Search, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateStandaloneHtml, downloadHtmlFile } from '../services/htmlExportService';

export default function HistorySection({
  history,
  isPro,
  selectedBrand,
  onLoadPost,
  onDeleteHistoryItem,
  onOpenPricing
}) {
  const [filterBrandId, setFilterBrandId] = useState('current'); // 'current' | 'all'
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // If user is not Pro, show the locked monetization card
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

  // Filter history
  const filteredHistory = history.filter(item => {
    const matchesBrand = filterBrandId === 'all' || item.brandId === selectedBrand.id;
    const matchesSearch = searchTerm === '' || 
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.theme.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const handleCopy = (item) => {
    const fullText = `${item.content.caption}\n\n${item.content.hashtags}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedId(item.id);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleExport = (item) => {
    const htmlString = generateStandaloneHtml({
      brand: { ...selectedBrand, handle: item.brandHandle, name: item.brandName },
      content: item.content,
      format: item.format,
      aspectRatio: item.aspectRatio || '4/5'
    });
    downloadHtmlFile(htmlString, `historico-${item.brandHandle.replace('@', '')}-${item.format}.html`);
  };

  return (
    <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-5 sm:p-6 shadow-xs transition-colors duration-200">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center text-white shadow-xs">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Histórico de Postagens Salvas</h3>
            <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">
              {filteredHistory.length} postagens salvas {filterBrandId === 'current' ? `para ${selectedBrand.handle}` : 'no total'}
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Brand Filter */}
          <div className="flex bg-[#FAFAFA] dark:bg-[#1A1A1A] p-1 rounded-xl border border-[#DBDBDB] dark:border-[#262626] text-xs">
            <button
              onClick={() => setFilterBrandId('current')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                filterBrandId === 'current'
                  ? 'bg-white dark:bg-[#262626] text-[#833AB4] dark:text-pink-400 shadow-2xs'
                  : 'text-[#737373] dark:text-[#A8A8A8]'
              }`}
            >
              {selectedBrand.handle}
            </button>
            <button
              onClick={() => setFilterBrandId('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                filterBrandId === 'all'
                  ? 'bg-white dark:bg-[#262626] text-[#833AB4] dark:text-pink-400 shadow-2xs'
                  : 'text-[#737373] dark:text-[#A8A8A8]'
              }`}
            >
              Todos os Clientes
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#737373]" />
            <input
              type="text"
              placeholder="Buscar histórico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-[#DBDBDB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#1A1A1A] text-[#262626] dark:text-white outline-none focus:border-[#E1306C]"
            />
          </div>
        </div>
      </div>

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-[#DBDBDB] dark:border-[#262626] rounded-xl bg-[#FAFAFA]/50 dark:bg-[#1A1A1A]/30">
          <History className="w-8 h-8 text-[#737373] mx-auto mb-2 opacity-50" />
          <p className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5]">Nenhuma postagem encontrada no histórico</p>
          <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] mt-1">
            Gere novos posts para que eles sejam salvos automaticamente aqui!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[#DBDBDB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#1A1A1A] hover:border-[#833AB4] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-[#262626] text-[#833AB4] dark:text-pink-400 border border-[#DBDBDB] dark:border-[#333333]">
                      {item.format}
                    </span>
                    <span className="text-[10px] text-[#737373] dark:text-[#A8A8A8] flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#E1306C]">{item.brandHandle}</span>
                </div>

                <h4 className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5] line-clamp-1 mb-1">
                  {item.content.theme}
                </h4>

                <p className="text-[11.5px] text-[#737373] dark:text-[#A8A8A8] line-clamp-2 italic mb-3">
                  "{item.content.hook}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 border-t border-[#DBDBDB]/50 dark:border-[#262626] flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  onClick={() => onLoadPost(item)}
                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white text-[11px] font-bold flex items-center gap-1 hover:opacity-95 transition-all shadow-2xs"
                >
                  <span>Carregar no Editor</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    title="Copiar Legenda"
                    className="p-1.5 rounded-lg border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#262626] text-[#737373] dark:text-[#A8A8A8] hover:text-[#833AB4] transition-all"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExport(item)}
                    title="Baixar Mini-Site HTML"
                    className="p-1.5 rounded-lg border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#262626] text-[#737373] dark:text-[#A8A8A8] hover:text-[#833AB4] transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteHistoryItem(item.id)}
                    title="Excluir do Histórico"
                    className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
