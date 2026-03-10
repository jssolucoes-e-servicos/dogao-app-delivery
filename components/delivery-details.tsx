'use client';

import React from 'react';
import {motion} from 'motion/react';
import {ChevronLeft, MapPin, Phone, MessageCircle, Navigation, User} from 'lucide-react';

interface DeliveryDetailsProps {
  onBack: () => void;
  onChat: () => void;
  onSkip: () => void;
}

export function DeliveryDetails({onBack, onChat, onSkip}: DeliveryDetailsProps) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="absolute inset-0 z-40 bg-zinc-950 flex flex-col"
    >
      <header className="p-4 flex items-center border-b border-white/10 bg-zinc-900/50 backdrop-blur-md sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-bold ml-2 text-white">Detalhes da Entrega</h1>
      </header>

      <main className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="flex justify-center">
          <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-yellow-500/30">
            Em Rota
          </span>
        </div>

        <section className="bg-zinc-900 p-5 rounded-2xl shadow-lg border border-white/5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-zinc-500 text-xs uppercase font-semibold mb-1">Cliente</p>
              <h2 className="text-xl font-bold text-white">Ricardo Oliveira</h2>
            </div>
            <div className="bg-yellow-500/10 p-2 rounded-full">
              <User size={24} className="text-yellow-500" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-500">#</span>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Pedido</p>
                <p className="text-sm font-medium text-white">#DP-992841</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-zinc-500" />
              <div>
                <p className="text-xs text-zinc-500">Endereço</p>
                <p className="text-sm font-medium leading-tight text-white">
                  Rua das Flores, 123 - Apto 402<br/>
                  Bairro Central, Cidade Alta
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900/50 p-5 rounded-2xl border-l-4 border-yellow-500">
          <div className="flex items-center mb-2 space-x-2">
            <span className="text-yellow-500">ℹ️</span>
            <h3 className="text-sm font-bold text-yellow-500 uppercase">Instruções de Entrega</h3>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Interfone não funciona. Por favor, buzine ou chame no portão preto. Deixar com o porteiro se não atender.
          </p>
        </section>

        <div className="flex gap-4">
          <button className="flex-1 bg-zinc-900 hover:bg-zinc-800 p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-2 transition-colors">
            <Phone size={20} className="text-yellow-500" />
            <span className="text-xs font-semibold text-white">Ligar</span>
          </button>
          <button 
            onClick={onChat}
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-2 transition-colors"
          >
            <MessageCircle size={20} className="text-yellow-500" />
            <span className="text-xs font-semibold text-white">Chat</span>
          </button>
        </div>
      </main>

      <footer className="p-6 space-y-4 bg-zinc-950/80 backdrop-blur-md border-t border-white/5">
        <button className="w-full bg-yellow-500 hover:bg-yellow-400 active:scale-[0.98] transition-all py-4 rounded-2xl text-black font-bold text-lg shadow-xl shadow-yellow-500/20 flex items-center justify-center space-x-2">
          <Navigation size={20} />
          <span>Confirmar Entrega</span>
        </button>
        <button 
          onClick={onSkip}
          className="w-full bg-transparent hover:bg-white/5 border-2 border-white/10 py-3 rounded-2xl text-zinc-400 font-semibold text-base transition-colors"
        >
          Pular Parada
        </button>
      </footer>
    </motion.div>
  );
}
