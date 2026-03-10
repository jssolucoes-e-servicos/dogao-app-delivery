'use client';

import React from 'react';
import {motion} from 'motion/react';
import {Lock, Mail, ArrowRight} from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({onLogin}: LoginScreenProps) {
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[90] bg-zinc-950 flex flex-col p-8"
    >
      <div className="flex-1 flex flex-col justify-center space-y-12">
        <div className="space-y-2">
          <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-black font-black text-3xl shadow-2xl shadow-yellow-500/20">
            D
          </div>
          <h1 className="text-3xl font-bold text-white">Bem-vindo,<br/>Entregador!</h1>
          <p className="text-zinc-500">Acesse sua conta para iniciar as entregas.</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input 
              type="email" 
              placeholder="E-mail ou CPF"
              className="w-full bg-zinc-900 border-white/5 focus:border-yellow-500 focus:ring-0 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input 
              type="password" 
              placeholder="Sua senha"
              className="w-full bg-zinc-900 border-white/5 focus:border-yellow-500 focus:ring-0 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 transition-all"
            />
          </div>
          <button className="text-yellow-500 text-sm font-semibold ml-1">Esqueci minha senha</button>
        </div>
      </div>

      <footer className="py-8">
        <button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-400 py-4 rounded-2xl text-black font-bold text-lg shadow-xl shadow-yellow-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              ENTRAR NO APP
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </footer>
    </motion.div>
  );
}
