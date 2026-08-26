import React, { useState } from 'react';
import { X, Sparkles, Lock, Mail, User, ShieldCheck, ArrowRight, Smartphone, Laptop } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await loginWithGoogle();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao conectar com Google. Tente com email e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Preencha seu e-mail e senha.');
      return;
    }

    setIsLoading(true);
    try {
      if (tab === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password, displayName);
      }
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setErrorMsg('E-mail ou senha incorretos.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('Este e-mail já está cadastrado. Faça login ou use outro e-mail.');
      } else {
        setErrorMsg(err.message || 'Houve um erro ao autenticar.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-md w-full border border-[#DBDBDB] dark:border-[#333333] shadow-2xl overflow-hidden relative text-[#262626] dark:text-[#F5F5F5] my-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] p-6 text-white text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Sincronização na Nuvem</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-1">
            {tab === 'login' ? 'Acesse sua Conta' : 'Crie sua Conta Grátis'}
          </h3>
          <p className="text-xs text-white/90 max-w-xs mx-auto">
            Use seus clientes, personalidades e histórico em qualquer computador ou celular.
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-medium text-white/90 bg-black/20 py-1.5 px-3 rounded-xl max-w-xs mx-auto">
            <Laptop className="w-4 h-4" />
            <span>PC</span>
            <span>⇄</span>
            <Smartphone className="w-4 h-4" />
            <span>Celular</span>
            <span className="text-emerald-300 font-bold ml-1">· Sincronizado</span>
          </div>
        </div>

        <div className="p-6">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 rounded-xl border border-[#DBDBDB] dark:border-[#333333] hover:border-[#833AB4] bg-white dark:bg-[#1E1E1E] text-xs sm:text-sm font-bold text-[#262626] dark:text-white flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all mb-4"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Continuar com o Google</span>
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#DBDBDB] dark:bg-[#333333]" />
            <span className="text-[11px] text-[#737373] dark:text-[#A8A8A8] uppercase tracking-wider font-semibold">
              ou com e-mail
            </span>
            <div className="flex-1 h-px bg-[#DBDBDB] dark:bg-[#333333]" />
          </div>

          <div className="flex bg-[#FAFAFA] dark:bg-[#121212] p-1 rounded-xl border border-[#DBDBDB] dark:border-[#333333] mb-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setTab('login'); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                tab === 'login' ? 'bg-[#833AB4] text-white shadow-xs' : 'text-[#737373] dark:text-[#A8A8A8]'
              }`}
            >
              Já Tenho Conta
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                tab === 'signup' ? 'bg-[#833AB4] text-white shadow-xs' : 'text-[#737373] dark:text-[#A8A8A8]'
              }`}
            >
              Criar Conta Nova
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === 'signup' && (
              <div>
                <label className="text-[11px] font-bold text-[#737373] dark:text-[#A8A8A8] block mb-1">
                  Seu Nome ou Nome da Agência
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ex: Ana Silva"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#1E1E1E] text-[#262626] dark:text-white outline-none focus:border-[#833AB4]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-[#737373] dark:text-[#A8A8A8] block mb-1">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#1E1E1E] text-[#262626] dark:text-white outline-none focus:border-[#833AB4]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#737373] dark:text-[#A8A8A8] block mb-1">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E8E8E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#DBDBDB] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#1E1E1E] text-[#262626] dark:text-white outline-none focus:border-[#833AB4]"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium py-1">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 transition-all mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{tab === 'login' ? 'Entrar no PostFlow' : 'Criar Conta & Sincronizar'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737373] dark:text-[#A8A8A8] mt-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dados 100% criptografados e sincronizados</span>
          </div>

        </div>

      </div>
    </div>
  );
}
