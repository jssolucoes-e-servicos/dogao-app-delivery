'use client';

import React from 'react';
import {motion} from 'motion/react';
import {ChevronLeft, MoreVertical, Paperclip, Send, CheckCheck, Truck} from 'lucide-react';
import Image from 'next/image';

interface DispatchChatProps {
  onBack: () => void;
}

export function DispatchChat({onBack}: DispatchChatProps) {
  const [message, setMessage] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[120] bg-zinc-950 flex flex-col"
    >
      <header className="bg-zinc-900 border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-yellow-500 overflow-hidden bg-zinc-800 flex items-center justify-center text-yellow-500">
                <Truck size={20} />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
            </div>
            <div>
              <h1 className="font-semibold text-sm text-white">Expedição Dogão</h1>
              <p className="text-[10px] text-zinc-400">Central de Operações</p>
            </div>
          </div>
        </div>
        <button className="p-2 text-yellow-500">
          <MoreVertical size={20} />
        </button>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <div className="flex justify-center my-4">
          <span className="bg-white/5 text-zinc-500 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">Hoje</span>
        </div>

        <div className="flex flex-col items-start max-w-[85%]">
          <div className="bg-zinc-800 text-zinc-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
            <p className="text-sm">João, recebemos seu alerta de pneu furado. Já estamos remanejando a entrega #DP-992841 para outro entregador.</p>
          </div>
          <span className="text-[10px] text-zinc-500 mt-1 ml-1">14:20</span>
        </div>

        <div className="flex flex-col items-end max-w-[85%] ml-auto">
          <div className="bg-yellow-500 text-black p-3 rounded-2xl rounded-br-none shadow-sm font-medium">
            <p className="text-sm">Obrigado! Já estou no borracheiro. Em 30 minutos volto a ficar online.</p>
          </div>
          <div className="flex items-center gap-1 mt-1 mr-1">
            <span className="text-[10px] text-zinc-500">14:22</span>
            <CheckCheck size={12} className="text-yellow-500" />
          </div>
        </div>

        <div className="flex flex-col items-start max-w-[85%]">
          <div className="bg-zinc-800 text-zinc-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
            <p className="text-sm">Combinado. Avise assim que estiver pronto para novas rotas.</p>
          </div>
          <span className="text-[10px] text-zinc-500 mt-1 ml-1">14:23</span>
        </div>
      </main>

      <footer className="bg-zinc-900 border-t border-white/10 p-4 pb-8">
        <div className="flex items-center gap-2">
          <button className="bg-white/5 hover:bg-white/10 p-3 rounded-xl text-zinc-300 transition-colors">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 relative">
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-zinc-800 border-transparent focus:border-yellow-500 focus:ring-0 text-sm text-white rounded-xl py-3 px-4 transition-all" 
              placeholder="Falar com a expedição..." 
              type="text"
            />
          </div>
          <button className="bg-yellow-500 hover:opacity-90 p-3 rounded-xl text-black shadow-lg shadow-yellow-500/20 transition-all active:scale-95">
            <Send size={20} />
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
