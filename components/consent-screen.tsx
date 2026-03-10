'use client';

import React from 'react';
import {motion} from 'motion/react';
import {ShieldCheck, MapPin, Bell, Smartphone} from 'lucide-react';

interface ConsentScreenProps {
  onAccept: () => void;
}

export function ConsentScreen({onAccept}: ConsentScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col p-6"
    >
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500">
          <ShieldCheck size={48} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white">Permissões Necessárias</h1>
          <p className="text-zinc-400 max-w-xs mx-auto">
            Para funcionar corretamente como um app de entregas, precisamos de acesso a algumas funções do seu Android.
          </p>
        </div>

        <div className="w-full space-y-4 text-left">
          <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-2xl border border-white/5">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Localização em Segundo Plano</h3>
              <p className="text-xs text-zinc-500">Permite que a expedição acompanhe sua rota mesmo com a tela desligada.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-2xl border border-white/5">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Notificações e Sons</h3>
              <p className="text-xs text-zinc-500">Alertas sonoros para novas rotas e mensagens da expedição.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-2xl border border-white/5">
            <div className="p-2 bg-green-500/10 rounded-xl text-green-500">
              <Smartphone size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Otimização de Bateria</h3>
              <p className="text-xs text-zinc-500">Garante que o app não seja fechado pelo sistema durante as entregas.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 space-y-4">
        <button 
          onClick={onAccept}
          className="w-full bg-yellow-500 hover:bg-yellow-400 py-4 rounded-2xl text-black font-bold text-lg shadow-xl shadow-yellow-500/20 transition-all active:scale-[0.98]"
        >
          CONCEDER ACESSO
        </button>
        <p className="text-[10px] text-zinc-600 text-center uppercase tracking-widest">
          Privacidade protegida pelo Dogão do Pastor
        </p>
      </footer>
    </motion.div>
  );
}
