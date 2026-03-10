'use client';

import React from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {X, AlertTriangle, Send} from 'lucide-react';

interface SkipStopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function SkipStopModal({isOpen, onClose, onConfirm}: SkipStopModalProps) {
  const [reason, setReason] = React.useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                  <AlertTriangle size={24} />
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">Pular Parada?</h2>
                <p className="text-sm text-zinc-500">
                  Informe o motivo para a expedição. Esta ação será registrada no log da rota.
                </p>
              </div>

              <div className="space-y-4">
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ex: Endereço não encontrado, pneu furado, cliente não atende..."
                  className="w-full bg-zinc-800 border-white/5 focus:border-red-500 focus:ring-0 rounded-2xl p-4 text-sm text-white min-h-[120px] transition-all"
                />
                
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {['Endereço Errado', 'Acidente', 'Veículo Quebrado'].map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => setReason(opt)}
                      className="whitespace-nowrap px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-[10px] font-bold text-zinc-400 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <footer className="p-4 bg-zinc-800/50 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button 
                disabled={!reason.trim()}
                onClick={() => onConfirm(reason)}
                className="flex-1 py-3 bg-red-500 hover:bg-red-400 disabled:opacity-50 rounded-xl text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send size={16} />
                CONFIRMAR
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
