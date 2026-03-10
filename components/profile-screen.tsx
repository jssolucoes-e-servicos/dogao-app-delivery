'use client';

import React from 'react';
import {motion} from 'motion/react';
import {ChevronLeft, User, Settings, LogOut, Star, Package, Map, Shield} from 'lucide-react';
import Image from 'next/image';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
  isOnline: boolean;
  onToggleOnline: () => void;
}

export function ProfileScreen({onBack, onLogout, isOnline, onToggleOnline}: ProfileScreenProps) {
  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      className="fixed inset-0 z-[80] bg-zinc-950 flex flex-col"
    >
      <header className="p-4 flex items-center justify-between border-b border-white/10 bg-zinc-900/50 backdrop-blur-md">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">Meu Perfil</h1>
        <button className="p-2 hover:bg-white/5 rounded-full text-zinc-400">
          <Settings size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl border-4 border-yellow-500 overflow-hidden bg-zinc-800 shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/driver/200/200" 
                alt="Driver" 
                width={96} 
                height={96} 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-zinc-950 flex items-center justify-center ${isOnline ? 'bg-green-500' : 'bg-zinc-600'}`}>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-white">João Silva</h2>
            <p className="text-sm text-zinc-500">Entregador Nível 4 • Dogão do Pastor</p>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1 bg-zinc-900 p-3 rounded-2xl border border-white/5">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Avaliação</p>
              <div className="flex items-center justify-center gap-1 text-yellow-500">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold">4.9</span>
              </div>
            </div>
            <div className="flex-1 bg-zinc-900 p-3 rounded-2xl border border-white/5">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Entregas</p>
              <span className="text-sm font-bold text-white">1,240</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest ml-1">Status de Trabalho</h3>
          <button 
            onClick={onToggleOnline}
            className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
              isOnline 
                ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                : 'bg-zinc-900 border-white/5 text-zinc-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-zinc-700'}`} />
              <span className="font-bold">{isOnline ? 'ESTOU ONLINE' : 'ESTOU OFFLINE'}</span>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${isOnline ? 'bg-green-500' : 'bg-zinc-800'}`}>
              <motion.div 
                animate={{ x: isOnline ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
              />
            </div>
          </button>
          <p className="text-[10px] text-zinc-600 px-2">
            {isOnline 
              ? 'Você está visível para a expedição e pode receber novas rotas.' 
              : 'Fique online para aparecer no sistema e começar a trabalhar.'}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest ml-1">Menu</h3>
          <div className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden">
            {[
              { icon: Package, label: 'Histórico de Pedidos', color: 'text-blue-500' },
              { icon: Map, label: 'Minhas Rotas', color: 'text-purple-500' },
              { icon: Shield, label: 'Segurança e Dados', color: 'text-green-500' },
            ].map((item, i) => (
              <button key={i} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                <div className={`p-2 bg-zinc-800 rounded-xl ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-medium text-zinc-300">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        <button 
          onClick={onLogout}
          className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl border border-red-500/20 flex items-center justify-center gap-2 font-bold transition-all"
        >
          <LogOut size={20} />
          SAIR DA CONTA
        </button>
      </main>
    </motion.div>
  );
}
