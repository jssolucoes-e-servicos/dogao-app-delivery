'use client';

import React from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Map, Navigation, X} from 'lucide-react';

interface RouteAlertProps {
  isOpen: boolean;
  type: 'dispatch_call' | 'assigned_route';
  onClose: () => void;
  onAccept: () => void;
}

export function RouteAlert({isOpen, type, onClose, onAccept}: RouteAlertProps) {
  const isDispatchCall = type === 'dispatch_call';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl p-8 text-center"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className={`p-4 rounded-2xl ${isDispatchCall ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white animate-pulse'}`}>
                {isDispatchCall ? <Map size={32} /> : <Navigation size={32} />}
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-white/5 text-zinc-500 text-[10px] uppercase font-bold tracking-widest rounded-full border border-white/10">
                  {isDispatchCall ? 'Solicitação de Expedição' : 'Nova Rota Atribuída'}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {isDispatchCall ? 'Chamada Disponível' : 'Sua Rota está Pronta'}
                </h2>
                <p className="text-zinc-500 text-sm">
                  {isDispatchCall 
                    ? 'A expedição está chamando entregadores. Seja o primeiro a aceitar!' 
                    : 'Uma nova rota foi vinculada ao seu perfil pela expedição.'}
                </p>
              </div>

              <div className="w-full pt-4 flex flex-col gap-3">
                <button 
                  onClick={onAccept}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] shadow-xl ${
                    isDispatchCall 
                      ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-yellow-500/20' 
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                >
                  {isDispatchCall ? 'ACEITAR CHAMADA' : 'VAMOS LÁ!'}
                </button>
                
                {isDispatchCall && (
                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-transparent hover:bg-white/5 text-zinc-500 font-semibold rounded-2xl border border-white/10 transition-colors"
                  >
                    Ignorar
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
