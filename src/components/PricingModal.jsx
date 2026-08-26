import React, { useState } from 'react';
import { X, Check, Zap, Sparkles, ShieldCheck, Crown, MessageCircle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

const MERCADO_PAGO_LINKS = {
  pro: 'https://mpago.la/1ESoUNW',      // Plano Base R$ 10,00
  agency: 'https://mpago.la/2ay7dia'    // Plano Equipe R$ 25,00
};

export default function PricingModal({ isOpen, onClose, onUpgradeSuccess, upgradeReason }) {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentPrice = selectedPlan === 'pro' ? '10,00' : '25,00';
  const planName = selectedPlan === 'pro' ? 'Plano Base (5 Marcas)' : 'Plano Equipe & Agência (Ilimitado)';
  const checkoutUrl = MERCADO_PAGO_LINKS[selectedPlan];

  const handleOpenMercadoPago = () => {
    window.open(checkoutUrl, '_blank');
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUpgradeSuccess(selectedPlan);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      onClose();
    }, 1200);
  };

  const handleWhatsAppCheckout = () => {
    const text = encodeURIComponent(`Olá! Tenho dúvidas sobre o *${planName}* do PostFlow AI no valor de R$ ${currentPrice}/mês.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-2xl w-full border border-[#DBDBDB] dark:border-[#333333] shadow-2xl overflow-hidden relative text-[#262626] dark:text-[#F5F5F5] my-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Acelere sua Criação de Conteúdo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Desbloqueie o Plano PostFlow Pro
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto">
            {upgradeReason || 'Crie posts ilimitados, acesse o histórico completo de postagens e gerencie múltiplos clientes sem complicação.'}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            
            <div
              onClick={() => setSelectedPlan('pro')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPlan === 'pro'
                  ? 'border-[#E1306C] bg-gradient-to-b from-pink-50/40 to-purple-50/20 dark:from-pink-950/20 dark:to-purple-950/20 ring-2 ring-[#E1306C]/20 shadow-md'
                  : 'border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] hover:border-[#833AB4]'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Plano Base</h4>
                  <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">Para Criadores & Profissionais</p>
                </div>
                <Zap className="w-5 h-5 text-amber-500 fill-current" />
              </div>
              <div className="my-3">
                <span className="text-3xl font-extrabold text-[#262626] dark:text-[#F5F5F5]">
                  R$ 10
                </span>
                <span className="text-xs text-[#737373] dark:text-[#A8A8A8]"> / mês</span>
              </div>
              <ul className="text-xs text-[#262626] dark:text-[#E0E0E0] space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Até <strong>5 clientes / marcas</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Histórico completo</strong> de posts salvos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Gerações de posts <strong>ilimitadas</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Exportação de mini-sites em HTML</span>
                </li>
              </ul>
            </div>

            <div
              onClick={() => setSelectedPlan('agency')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPlan === 'agency'
                  ? 'border-[#833AB4] bg-gradient-to-b from-purple-50/50 to-pink-50/20 dark:from-purple-950/20 dark:to-pink-950/20 ring-2 ring-[#833AB4]/20 shadow-md'
                  : 'border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] hover:border-[#833AB4]'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Plano Equipe & Agência</h4>
                  <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">Para Social Medias e Agências</p>
                </div>
                <Crown className="w-5 h-5 text-[#833AB4]" />
              </div>
              <div className="my-3">
                <span className="text-3xl font-extrabold text-[#262626] dark:text-[#F5F5F5]">
                  R$ 25
                </span>
                <span className="text-xs text-[#737373] dark:text-[#A8A8A8]"> / mês</span>
              </div>
              <ul className="text-xs text-[#262626] dark:text-[#E0E0E0] space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Clientes & Marcas Ilimitados</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Histórico completo</strong> para todos os clientes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Prioridade máxima no Gemini 3.7</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Exportação em lote & Suporte VIP</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="space-y-3">
            <button
              onClick={handleOpenMercadoPago}
              className="w-full py-4 rounded-2xl bg-[#009EE3] hover:bg-[#0081B8] text-white font-bold text-sm shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <span className="bg-white text-[#009EE3] rounded-full w-5 h-5 flex items-center justify-center font-extrabold text-xs">
                MP
              </span>
              <span>Pagar R$ {currentPrice} via Mercado Pago (PIX ou Cartão)</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              disabled={isProcessing}
              onClick={handleConfirmPayment}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{isProcessing ? 'Validando ativação...' : 'Já realizou o pagamento? Liberar Acesso Pro'}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="w-full py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-emerald-500/50 text-[#737373] dark:text-[#A8A8A8] hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-xs flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>Dúvidas com o pagamento? Falar no WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-[#737373] dark:text-[#A8A8A8]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pagamento Seguro Mercado Pago</span>
            </span>
            <span>•</span>
            <span>Ativação Instantânea</span>
          </div>

        </div>

      </div>
    </div>
  );
}
