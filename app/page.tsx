'use client';

import React from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {MapBackground} from '@/components/map-background';
import {RouteAlert} from '@/components/route-alert';
import {DeliveryDetails} from '@/components/delivery-details';
import {DispatchChat} from '@/components/dispatch-chat';
import {LoginScreen} from '@/components/login-screen';
import {ConsentScreen} from '@/components/consent-screen';
import {ProfileScreen} from '@/components/profile-screen';
import {SkipStopModal} from '@/components/skip-stop-modal';
import {ChevronLeft, MapPin, Navigation, Phone, MessageCircle, User, Bell, Power} from 'lucide-react';
import {useTheme} from '@/hooks/use-theme';

type AppState = 'login' | 'consent' | 'main';
type View = 'map' | 'details' | 'chat' | 'profile';

export default function DeliveryApp() {
  // App State
  const [appState, setAppState] = React.useState<AppState>('login');
  const [view, setView] = React.useState<View>('map');
  const [isOnline, setIsOnline] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState<'dispatch_call' | 'assigned_route'>('dispatch_call');
  const [isSkipModalOpen, setIsSkipModalOpen] = React.useState(false);
  
  const {theme, toggleTheme} = useTheme();

  // Sound and Notification Logic
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const soundTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const stopNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (soundTimeoutRef.current) {
      clearTimeout(soundTimeoutRef.current);
      soundTimeoutRef.current = null;
    }
  };

  const playStatusSound = (online: boolean) => {
    // Online: Positive chime, Offline: Neutral/Negative chime
    const url = online 
      ? 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' 
      : 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
    const audio = new Audio(url);
    audio.volume = 0.8;
    audio.play().catch(e => console.log("Audio play blocked", e));
  };

  const playNotificationSound = (isPersistent: boolean) => {
    stopNotificationSound();
    
    // Dispatch Call: Loud Alarm, Assigned Route: Clear Ping
    const url = isPersistent 
      ? 'https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3'
      : 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
      
    const audio = new Audio(url);
    audio.loop = isPersistent;
    audio.volume = 1.0; // Max volume for notifications
    audioRef.current = audio;
    
    audio.play().catch(e => console.log("Audio play blocked by browser", e));

    if (isPersistent) {
      soundTimeoutRef.current = setTimeout(() => {
        stopNotificationSound();
        setIsAlertOpen(false); 
      }, 60000);
    } else {
      setTimeout(() => stopNotificationSound(), 5000);
    }
  };

  const toggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    playStatusSound(nextState);
  };

  // Simulate receiving notifications
  // In a native app, this would be a background service listener
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isOnline && !isAlertOpen) {
      // Randomly decide between Dispatch Call and Assigned Route
      timer = setTimeout(() => {
        const type = Math.random() > 0.5 ? 'dispatch_call' : 'assigned_route';
        setAlertType(type);
        setIsAlertOpen(true);
        playNotificationSound(type === 'dispatch_call');
      }, 10000);
    }
    
    return () => clearTimeout(timer);
  }, [isOnline, isAlertOpen]);

  // Stop sound when alert is closed
  React.useEffect(() => {
    if (!isAlertOpen) {
      stopNotificationSound();
    }
  }, [isAlertOpen]);

  const handleLogin = () => setAppState('consent');
  const handleConsent = () => setAppState('main');
  const handleLogout = () => {
    stopNotificationSound();
    setAppState('login');
    setIsOnline(false);
    setView('map');
  };

  if (appState === 'login') return <LoginScreen onLogin={handleLogin} />;
  if (appState === 'consent') return <ConsentScreen onAccept={handleConsent} />;

  return (
    <div className="relative h-screen w-full flex flex-col bg-zinc-950 overflow-hidden font-sans">
      {/* Background Map */}
      <MapBackground />

      {/* Top Bar */}
      <header className="relative z-10 p-4 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <button 
            onClick={() => setView('profile')}
            className="w-12 h-12 bg-zinc-900 rounded-2xl shadow-lg flex items-center justify-center text-white border border-white/10 overflow-hidden"
          >
            <div className="w-full h-full relative">
              <img src="https://picsum.photos/seed/driver/100/100" alt="Avatar" className="w-full h-full object-cover" />
              <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-zinc-900 ${isOnline ? 'bg-green-500' : 'bg-zinc-600'}`} />
            </div>
          </button>
        </div>

        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <div className={`p-3 rounded-2xl shadow-lg border flex items-center gap-3 transition-all ${
            isOnline ? 'bg-green-500/10 border-green-500/20' : 'bg-zinc-900 border-white/10'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isOnline ? 'bg-green-500/20' : 'bg-zinc-800'
            }`}>
              <Navigation size={20} className={isOnline ? 'text-green-500' : 'text-zinc-500'} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Status</p>
              <p className={`text-sm font-bold ${isOnline ? 'text-green-500' : 'text-zinc-400'}`}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </p>
            </div>
          </div>
          
          <button 
            onClick={toggleOnline}
            className={`w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center border transition-all ${
              isOnline ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500 text-black border-transparent'
            }`}
          >
            <Power size={24} />
          </button>
        </div>
      </header>

      {/* Floating Tools */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        <button className="w-12 h-12 bg-zinc-900 rounded-2xl shadow-lg border border-white/10 flex items-center justify-center text-zinc-300">
          <span className="text-xl font-bold">+</span>
        </button>
        <button className="w-12 h-12 bg-zinc-900 rounded-2xl shadow-lg border border-white/10 flex items-center justify-center text-zinc-300">
          <span className="text-xl font-bold">-</span>
        </button>
        <button className="w-12 h-12 bg-zinc-900 rounded-2xl shadow-lg border border-white/10 flex items-center justify-center text-yellow-500">
          <MapPin size={24} />
        </button>
      </div>

      {/* Bottom Sheet (Only if Online) */}
      <AnimatePresence>
        {isOnline && (
          <motion.section 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-zinc-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5"
          >
            <div className="flex justify-center p-3">
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full" />
            </div>
            <div className="px-6 pb-8 pt-2">
              <div className="flex justify-between items-start mb-6">
                <div className="max-w-[70%]">
                  <h2 className="text-xs font-semibold text-yellow-500 uppercase tracking-widest mb-1">Próxima Parada</h2>
                  <h1 className="text-xl font-bold leading-tight text-white">Rua das Amoras, 452</h1>
                  <p className="text-sm text-zinc-500 mt-1">Jardim das Flores, São Paulo - SP</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">12</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">Minutos</div>
                </div>
              </div>

              <hr className="border-white/5 mb-6" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border-2 border-yellow-500/20">
                    <User size={24} className="text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Ricardo S.</p>
                    <p className="text-xs text-zinc-500">Combo Dogão Clássico + Suco</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-700 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button 
                    onClick={() => setView('chat')}
                    className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
                  >
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setView('details')}
                className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all py-4 rounded-2xl text-black font-bold text-lg shadow-xl shadow-yellow-500/10 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Navigation size={24} />
                Iniciar Navegação
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Offline Placeholder */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-8 pointer-events-none"
          >
            <div className="bg-zinc-900/90 p-8 rounded-3xl border border-white/10 text-center space-y-4 max-w-xs pointer-events-auto">
              <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 mx-auto">
                <Power size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Você está Offline</h3>
                <p className="text-sm text-zinc-500">Fique online para começar a receber rotas da expedição.</p>
              </div>
              <button 
                onClick={toggleOnline}
                className="w-full bg-green-500 hover:bg-green-400 py-3 rounded-xl text-black font-bold transition-all active:scale-95"
              >
                FICAR ONLINE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RouteAlert 
        isOpen={isAlertOpen} 
        type={alertType}
        onClose={() => {
          setIsAlertOpen(false);
          stopNotificationSound();
        }} 
        onAccept={() => {
          setIsAlertOpen(false);
          stopNotificationSound();
          setIsBusy(true);
          setView('details');
        }}
      />

      <AnimatePresence>
        {view === 'details' && (
          <DeliveryDetails 
            onBack={() => setView('map')} 
            onChat={() => setView('chat')} 
            onSkip={() => setIsSkipModalOpen(true)}
          />
        )}
        {view === 'chat' && (
          <DispatchChat onBack={() => setView('details')} />
        )}
        {view === 'profile' && (
          <ProfileScreen 
            onBack={() => setView('map')} 
            onLogout={handleLogout}
            isOnline={isOnline}
            onToggleOnline={toggleOnline}
          />
        )}
      </AnimatePresence>

      <SkipStopModal 
        isOpen={isSkipModalOpen}
        onClose={() => setIsSkipModalOpen(false)}
        onConfirm={(reason) => {
          console.log('Skipping with reason:', reason);
          setIsSkipModalOpen(false);
          setIsBusy(false);
          setView('map');
        }}
      />

      {/* iOS Style Status Bar Spacer */}
      <div className="fixed top-0 left-0 right-0 h-11 bg-transparent z-50 pointer-events-none">
        <div className="flex justify-between px-8 pt-3">
          <span className="text-xs font-bold text-white">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-4 bg-white/20 rounded-sm" />
            <div className="w-4 h-4 bg-white/20 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
