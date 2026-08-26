import React, { useState } from 'react';
import { X, Check, Zap, Sparkles, QrCode, ShieldCheck, Crown, MessageCircle, Copy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PricingModal({ isOpen, onClose, onUpgradeSuccess, upgradeReason }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPixScreen, setShowPixScreen] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  const currentPrice = selectedPlan === 'pro'
    ? (billingCycle === 'monthly' ? '25,00' : '19,00')
    : (billingCycle === 'monthly' ? '50,00' : '39,00');

  const planName = selectedPlan === 'pro' ? 'Plano Base (5 Marcas)' : 'Plano Equipe & Agência (Ilimitado)';

  // Mock Copy-and-paste PIX code
  const pixCode = `00020126580014br.gov.bcb.pix0136postflow-ai-assinatura-${selectedPlan}-${Date.now()}520400005303986540${currentPrice.replace(',', '.')}5802BR5925POSTFLOW AI CRIACAO6009SAO PAULO62070503***6304ABCD`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode).then(() => {
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    });
  };

  const handleActivatePro = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUpgradeSuccess(selectedPlan);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setShowPixScreen(false);
      onClose();
    }, 1400);
  };

  const handleWhatsAppCheckout = () => {
    const text = encodeURIComponent(`Olá! Quero assinar o *${planName}* do PostFlow AI no valor de R$ ${currentPrice}/mês via PIX.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-2xl w-full border border-[#DBDBDB] dark:border-[#333333] shadow-2xl overflow-hidden relative text-[#262626] dark:text-[#F5F5F5] my-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowPixScreen(false);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Instagram Gradient */}
        <div className="bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Acelere sua Criação de Conteúdo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {showPixScreen ? 'Pagamento Seguro via PIX' : 'Desbloqueie o Plano PostFlow Pro'}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto">
            {showPixScreen
              ? `Você está assinando o ${planName} por R$ ${currentPrice}/mês.`
              : (upgradeReason || 'Crie posts, acesse o histórico completo de postagens e gerencie múltiplos clientes sem limites.')}
          </p>

          {!showPixScreen && (
            <div className="inline-flex items-center gap-1 bg-black/25 p-1 rounded-xl mt-5">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  billingCycle === 'monthly' ? 'bg-white text-[#262626] shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-white text-[#262626] shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                <span>Anual</span>
                <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">25% OFF</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Body: Plans View or PIX View */}
        <div className="p-6 sm:p-8">
          
          {!showPixScreen ? (
            <>
              {/* Plans Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                
                {/* Base Plan Card - R$ 25 */}
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
                      R$ {billingCycle === 'monthly' ? '25' : '19'}
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

                {/* Team / Agency Plan Card - R$ 50 */}
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
                      R$ {billingCycle === 'monthly' ? '50' : '39'}
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

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => setShowPixScreen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pagar R$ {currentPrice}/mês via PIX Instantâneo</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl border border-emerald-500/40 hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Dúvidas ou Falar no WhatsApp</span>
                </button>
              </div>
            </>
          ) : (
            /* PIX Checkout Screen */
            <div className="text-center space-y-4">
              <div className="bg-[#FAFAFA] dark:bg-[#121212] p-5 rounded-2xl border border-[#DBDBDB] dark:border-[#262626] max-w-sm mx-auto">
                <div className="w-36 h-36 mx-auto bg-white p-2.5 rounded-xl shadow-xs border border-[#DBDBDB] flex items-center justify-center mb-3">
                  <div className="text-center">
                    <QrCode className="w-24 h-24 mx-auto text-[#262626]" />
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block mt-1">PIX Automático</span>
                  </div>
                </div>

                <p className="text-xs font-bold text-[#262626] dark:text-white">Valor: R$ {currentPrice}</p>
                <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8] mt-0.5">Escaneie o QR Code ou copie o código PIX abaixo</p>

                {/* PIX Copy & Paste Box */}
                <div className="mt-3 flex items-center gap-1.5 bg-white dark:bg-[#1A1A1A] p-1.5 rounded-lg border border-[#DBDBDB] dark:border-[#333333]">
                  <input
                    type="text"
                    readOnly
                    value={pixCode}
                    className="w-full text-[10px] font-mono bg-transparent border-0 outline-none text-[#737373] dark:text-[#A8A8A8] truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="px-2.5 py-1 rounded bg-[#833AB4] text-white text-[10px] font-bold whitespace-nowrap flex items-center gap-1"
                  >
                    {copiedPix ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar PIX'}</span>
                  </button>
                </div>
              </div>

              {/* Confirm / Simulate Button */}
              <button
                disabled={isProcessing}
                onClick={handleActivatePro}
                className="w-full max-w-sm mx-auto py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Check className="w-4 h-4" />
                <span>{isProcessing ? 'Validando PIX...' : 'Já fiz o PIX! Liberar Acesso Pro'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPixScreen(false)}
                className="text-xs text-[#737373] dark:text-[#A8A8A8] hover:underline block mx-auto"
              >
                ← Voltar para a seleção de planos
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-[#737373] dark:text-[#A8A8A8]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantia incondicional de 7 dias</span>
            </span>
            <span>•</span>
            <span>Cancele quando quiser</span>
          </div>
        </div>

      </div>
    </div>
  );
}
