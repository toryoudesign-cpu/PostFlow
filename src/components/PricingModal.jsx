import React, { useState } from 'react';
import { X, Check, Zap, Sparkles, ShieldCheck, Crown, MessageCircle, ExternalLink, Lock, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';

const MERCADO_PAGO_LINKS = {
  pro: 'https://mpago.la/1ESoUNW',      // Plano Base R$ 10,00
  agency: 'https://mpago.la/2ay7dia'    // Plano Equipe R$ 25,00
};

// Códigos VIP de Ativação que só você (dono do app) conhece e passa para quem pagou
const VALID_ACTIVATION_CODES = [
  'POSTFLOW10',
  'POSTFLOW25',
  'PRO2026',
  'VIP-POSTFLOW',
  'TORYOU-PRO',
  'EQUIPE-VIP'
];

export default function PricingModal({ isOpen, onClose, onUpgradeSuccess, upgradeReason }) {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [codeError, setCodeError] = useState('');

  if (!isOpen) return null;

  const currentPrice = selectedPlan === 'pro' ? '10,00' : '25,00';
  const planName = selectedPlan === 'pro' ? 'Plano Base (5 Marcas)' : 'Plano Equipe & Agência (Ilimitado)';
  const checkoutUrl = MERCADO_PAGO_LINKS[selectedPlan];

  const handleOpenMercadoPago = () => {
    window.open(checkoutUrl, '_blank');
  };

  const handleValidateCode = (e) => {
    e.preventDefault();
    const cleanCode = activationCode.trim().toUpperCase();

    if (!cleanCode) {
      setCodeError('Por favor, digite o código de ativação fornecido.');
      return;
    }

    if (VALID_ACTIVATION_CODES.includes(cleanCode)) {
      setCodeError('');
      const targetPlan = (cleanCode === 'POSTFLOW25' || cleanCode === 'EQUIPE-VIP') ? 'agency' : selectedPlan;
      onUpgradeSuccess(targetPlan);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      onClose();
    } else {
      setCodeError('Código de ativação inválido. Conclua o pagamento no Mercado Pago ou solicite seu código pelo WhatsApp.');
    }
  };

  const handleWhatsAppReceipt = () => {
    const text = encodeURIComponent(`Olá! Acabei de realizar o pagamento do *${planName}* (R$ ${currentPrice}) pelo Mercado Pago. Segue o comprovante para liberação do meu código de ativação Pro!`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-2xl w-full border border-[#DBDBDB] dark:border-[#333333] shadow-2xl overflow-hidden relative text-[#262626] dark:text-[#F5F5F5] my-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowCodeInput(false);
            setCodeError('');
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
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

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            
            {/* Base Plan */}
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

            {/* Agency Plan */}
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

          {/* Action Buttons */}
          <div className="space-y-3">
            
            {/* Primary Button: Pagar no Mercado Pago */}
            <button
              onClick={handleOpenMercadoPago}
              className="w-full py-4 rounded-2xl bg-[#009EE3] hover:bg-[#0081B8] text-white font-bold text-sm shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <span className="bg-white text-[#009EE3] rounded-full w-5 h-5 flex items-center justify-center font-extrabold text-xs">
                MP
              </span>
              <span>Pagar R$ {currentPrice} no Mercado Pago (PIX ou Cartão)</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* WhatsApp Receipt Button */}
            <button
              type="button"
              onClick={handleWhatsAppReceipt}
              className="w-full py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 hover:border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Já paguei! Enviar comprovante no WhatsApp para liberar</span>
            </button>

            {/* Secret Activation Code Toggle Form */}
            {!showCodeInput ? (
              <button
                type="button"
                onClick={() => setShowCodeInput(true)}
                className="text-xs text-[#737373] dark:text-[#A8A8A8] hover:text-[#833AB4] dark:hover:text-pink-400 block mx-auto pt-1 font-medium transition-all"
              >
                Possui um código ou cupom de ativação? <span className="underline font-bold">Clique aqui</span>
              </button>
            ) : (
              <form onSubmit={handleValidateCode} className="bg-[#FAFAFA] dark:bg-[#121212] p-3.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#262626] dark:text-white">
                  <KeyRound className="w-3.5 h-3.5 text-[#833AB4]" />
                  <span>Código de Ativação VIP:</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                    placeholder="Ex: POSTFLOW10"
                    className="flex-1 text-xs uppercase font-mono p-2.5 rounded-lg border border-[#DBDBDB] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] text-[#262626] dark:text-white outline-none focus:border-[#833AB4]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg bg-[#833AB4] hover:bg-[#722e9e] text-white font-bold text-xs shadow-xs"
                  >
                    Ativar
                  </button>
                </div>
                {codeError && (
                  <p className="text-[11px] text-red-600 dark:text-red-400 font-medium">
                    {codeError}
                  </p>
                )}
              </form>
            )}

          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-[#737373] dark:text-[#A8A8A8]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pagamento Seguro Mercado Pago</span>
            </span>
            <span>•</span>
            <span>Garantia de 7 dias</span>
          </div>

        </div>

      </div>
    </div>
  );
}
