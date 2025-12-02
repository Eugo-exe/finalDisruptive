
import React, { useState, useEffect } from 'react';
import ARScanner from './components/ARScanner';
import ChatInterface from './components/ChatInterface';
import TravelGuide from './components/TravelGuide';
import Profile from './components/Profile';
import TransportModal from './components/TransportModal';
import FoodGuideModal from './components/FoodGuideModal';
import { AppView } from './types';
import { IMAGES } from './assets';

// Mock Data for Slideshow
const FEATURED_PLACES = [
  {
    id: 1,
    title: "วัดอรุณราชวราราม",
    subtitle: "ชมความงามริมแม่น้ำเจ้าพระยา",
    image: IMAGES.HOME_WAT_ARUN,
    category: "แลนด์มาร์ค"
  },
  {
    id: 2,
    title: "สตรีทฟู้ดเยาวราช",
    subtitle: "สวรรค์ของนักชิมยามค่ำคืน",
    image: IMAGES.HOME_YAOWARAT,
    category: "อาหาร"
  },
  {
    id: 3,
    title: "ตลาดน้ำดำเนินสะดวก",
    subtitle: "วิถีชีวิตริมน้ำแบบดั้งเดิม",
    image: IMAGES.HOME_FLOATING_MARKET,
    category: "วัฒนธรรม"
  },
  {
    id: 4,
    title: "ทะเลอันดามัน",
    subtitle: "ความงดงามแห่งท้องทะเลไทย",
    image: IMAGES.HOME_ANDAMAN,
    category: "ธรรมชาติ"
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [isARActive, setIsARActive] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [activeModal, setActiveModal] = useState<'transport' | 'food' | null>(null);

  // Splash Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500); // Show splash for 3.5 seconds
    return () => clearTimeout(timer);
  }, []);

  // Function to switch tabs
  const handleTabChange = (view: AppView) => {
    setCurrentView(view);
  };

  const handleOpenAR = () => {
    setIsARActive(true);
  };

  // Splash Screen Component
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-thai-midnight flex flex-col items-center justify-center overflow-hidden font-sans">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-thai-pattern opacity-10 animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-thai-gold/10 to-transparent pointer-events-none"></div>

        {/* Logo Container */}
        <div className="relative z-10 flex flex-col items-center animate-float">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-thai-gold rounded-full blur-[30px] opacity-40 animate-pulse"></div>
            <div className="w-32 h-32 rounded-full border-4 border-thai-gold/60 p-1 relative bg-gradient-to-b from-thai-midnight to-black shadow-2xl">
               <div className="w-full h-full rounded-full bg-thai-rain/10 flex items-center justify-center text-6xl overflow-hidden relative z-10">
                  🌧️
               </div>
               {/* Orbital Rings */}
               <div className="absolute inset-0 border border-thai-gold/30 rounded-full animate-spin-slow" style={{ animationDuration: '8s' }}></div>
               <div className="absolute -inset-2 border border-thai-gold/20 rounded-full animate-spin-slow" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-thai-gold via-yellow-200 to-thai-gold drop-shadow-lg tracking-wider mb-2">
            ARAI
          </h1>
          <p className="text-thai-silk font-serif text-lg tracking-widest opacity-90">น้องน้ำฝนพาเที่ยว</p>
        </div>

        {/* Loading Bar */}
        <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-thai-gold w-full animate-shimmer"></div>
        </div>
        
        <div className="absolute bottom-10 text-thai-silk/40 text-xs font-light">
          Smart Tourism Prototype
        </div>
      </div>
    );
  }

  // Home Component (Dashboard)
  const HomeView = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Carousel Auto-play logic
    useEffect(() => {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % FEATURED_PLACES.length);
      }, 5000); // Change every 5 seconds
      return () => clearInterval(slideInterval);
    }, []);

    return (
      <div className="flex flex-col h-full overflow-y-auto pb-24 relative">
        {/* Decorative BG */}
        <div className="absolute inset-0 bg-thai-pattern opacity-10 pointer-events-none z-0"></div>
        
        {/* Header / Hero Section */}
        <div className="relative z-10 pt-10 pb-6 px-6 bg-gradient-to-b from-thai-midnight via-thai-midnight/90 to-transparent">
          <div className="flex items-center justify-between mb-6">
             <div>
               <h1 className="text-3xl font-display font-bold text-white">
                 สวัสดีเจ้าค่ะ <span className="text-xl">🙏</span>
               </h1>
               <p className="text-thai-gold font-serif italic">น้องน้ำฝนพร้อมดูแลค่ะ</p>
             </div>
             <div className="w-12 h-12 rounded-full border-2 border-thai-gold/50 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
               <div className="w-full h-full rounded-full bg-thai-rain/20 flex items-center justify-center text-xl overflow-hidden">
                  🌧️
               </div>
             </div>
          </div>
  
          {/* Feature Banner */}
          <div className="w-full bg-gradient-to-r from-thai-gold to-[#B8860B] rounded-2xl p-5 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
            <div className="relative z-10 text-thai-midnight">
              <h3 className="font-bold text-lg font-display mb-1">AR สแกนวัตถุโบราณ</h3>
              <p className="text-sm opacity-80 mb-3 max-w-[70%]">ส่องกล้องเพื่อดูประวัติความเป็นมาแบบ 3 มิติ</p>
              <button 
                onClick={handleOpenAR}
                className="bg-thai-midnight text-thai-gold px-4 py-1.5 rounded-full text-xs font-bold shadow-md active:scale-95 transition-transform"
              >
                ลองเล่นเลย
              </button>
            </div>
            <div className="absolute bottom-2 right-4 text-4xl opacity-80 group-hover:scale-110 transition-transform duration-500">
               📷
            </div>
          </div>
        </div>
  
        {/* Quick Stats / Info Grid */}
        <div className="px-6 grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-white/5 border border-thai-gold/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-thai-tea text-2xl mb-2">🌡️</div>
            <div className="text-2xl font-bold text-white font-display">32°C</div>
            <div className="text-xs text-thai-silk/60">กรุงเทพมหานคร</div>
          </div>
          <div className="bg-white/5 border border-thai-gold/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-thai-rain text-2xl mb-2">💧</div>
            <div className="text-lg font-bold text-white font-display">มีฝนเล็กน้อย</div>
            <div className="text-xs text-thai-silk/60">พยากรณ์วันนี้</div>
          </div>
  
          {/* PM 2.5 Monitoring Widget */}
          <div className="col-span-2 bg-gradient-to-r from-white/5 to-white/10 border border-thai-gold/20 rounded-xl p-4 backdrop-blur-sm flex items-center justify-between relative overflow-hidden group">
              {/* Status Indicator Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div> 
              
              <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl animate-pulse-slow">
                    😷
                  </div>
                  <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-thai-silk/80 font-bold uppercase tracking-wider">คุณภาพอากาศ</span>
                      </div>
                      <div className="flex items-end gap-2">
                          <span className="text-3xl font-display font-bold text-white leading-none">35</span>
                          <span className="text-xs text-thai-silk/60 pb-1">µg/m³</span>
                      </div>
                  </div>
              </div>
  
              <div className="text-right z-10">
                   <div className="inline-block bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-md border border-green-500/30 mb-1">
                      อากาศดีเยี่ยม
                   </div>
                   <p className="text-[10px] text-gray-400">เหมาะกับการท่องเที่ยว</p>
              </div>
  
              {/* Background Dust Particles Animation */}
              <div className="absolute right-0 top-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
                  <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 left-3/4 animate-float opacity-50"></div>
                  <div className="absolute w-1 h-1 bg-white rounded-full top-3/4 left-1/2 animate-pulse opacity-30"></div>
                  <div className="absolute w-3 h-3 bg-white rounded-full top-1/2 right-10 animate-spin-slow opacity-10"></div>
              </div>
          </div>
          
          {/* New Guide Buttons Section */}
          <div 
             onClick={() => setActiveModal('transport')}
             className="bg-white/5 border border-thai-gold/20 rounded-xl p-3 flex flex-col justify-between items-start backdrop-blur-sm hover:bg-white/10 transition-colors active:scale-95 cursor-pointer relative overflow-hidden"
          >
             <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">🚌</div>
             <div>
               <h4 className="font-bold text-sm text-thai-gold">การเดินทาง</h4>
               <p className="text-[10px] text-thai-silk/60">แนะนำแอพฯ ขนส่ง</p>
             </div>
             {/* Decor */}
             <div className="absolute -right-2 -bottom-2 text-4xl opacity-10 rotate-12">🚆</div>
          </div>

          <div 
             onClick={() => setActiveModal('food')}
             className="bg-white/5 border border-thai-gold/20 rounded-xl p-3 flex flex-col justify-between items-start backdrop-blur-sm hover:bg-white/10 transition-colors active:scale-95 cursor-pointer relative overflow-hidden"
          >
             <div className="w-8 h-8 rounded-lg bg-thai-crimson/20 text-thai-crimson flex items-center justify-center mb-2">🥣</div>
             <div>
               <h4 className="font-bold text-sm text-thai-gold">ร้านเด็ดห้ามพลาด</h4>
               <p className="text-[10px] text-thai-silk/60">Michelin & Local</p>
             </div>
             {/* Decor */}
             <div className="absolute -right-2 -bottom-2 text-4xl opacity-10 rotate-12">⭐</div>
          </div>

        </div>
        
        {/* Recommended Today - Slideshow */}
        <div className="px-6 mt-6 relative z-10">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-thai-gold font-display font-bold">แนะนำวันนี้</h3>
            <span className="text-[10px] text-thai-silk/50">ยอดนิยม</span>
          </div>

          <div 
            onClick={() => handleTabChange(AppView.TRAVEL_GUIDE)}
            className="w-full h-56 rounded-2xl relative overflow-hidden shadow-2xl border border-thai-gold/20 cursor-pointer group"
          >
            {FEATURED_PLACES.map((item, index) => (
              <div 
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                {/* Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-[5000ms]"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-thai-midnight via-thai-midnight/50 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-5 z-10">
                   <div className="inline-block px-2 py-0.5 rounded bg-thai-gold text-thai-midnight text-[10px] font-bold mb-2">
                     {item.category}
                   </div>
                   <h4 className="text-xl font-display font-bold text-white mb-1 drop-shadow-md">{item.title}</h4>
                   <p className="text-xs text-thai-silk/80 font-light flex items-center justify-between">
                      {item.subtitle}
                      <span className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm group-hover:bg-thai-gold group-hover:text-thai-midnight transition-colors">
                        ➔
                      </span>
                   </p>
                </div>
              </div>
            ))}

            {/* Slideshow Indicators */}
            <div className="absolute bottom-3 right-5 flex gap-1.5 z-20">
              {FEATURED_PLACES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-4 bg-thai-gold' : 'w-1 bg-white/40'}`}
                ></div>
              ))}
            </div>
            
            {/* Corner Decor */}
            <div className="absolute top-3 right-3 w-8 h-8 opacity-60">
               <svg viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="3">
                  <path d="M100 0 C 60 0 60 40 0 40" />
               </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[100dvh] bg-thai-midnight text-white overflow-hidden font-sans flex flex-col">
      
      {/* Main Content View Port */}
      <div className="flex-1 overflow-hidden relative">
        {currentView === AppView.LANDING && <HomeView />}
        {currentView === AppView.CHAT && <ChatInterface onBack={() => {}} isTabMode={true} />}
        {currentView === AppView.TRAVEL_GUIDE && <TravelGuide onBack={() => {}} isTabMode={true} />}
        {currentView === AppView.PROFILE && <Profile onBack={() => {}} isTabMode={true} />}
      </div>

      {/* Modals */}
      {activeModal === 'transport' && <TransportModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'food' && <FoodGuideModal onClose={() => setActiveModal(null)} />}

      {/* AR Scanner Modal (Full Screen Overlay) */}
      {isARActive && (
        <div className="absolute inset-0 z-50">
          <ARScanner onClose={() => setIsARActive(false)} />
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="h-20 bg-thai-midnight/95 backdrop-blur-xl border-t border-thai-gold/30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex items-end justify-between px-6 pb-2 safe-pb relative z-40">
        
        {/* Left Tabs */}
        <button 
          onClick={() => handleTabChange(AppView.LANDING)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 pb-2 transition-colors ${currentView === AppView.LANDING ? 'text-thai-gold' : 'text-thai-silk/40 hover:text-thai-silk'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="text-[10px] font-display">หน้าหลัก</span>
        </button>

        <button 
          onClick={() => handleTabChange(AppView.TRAVEL_GUIDE)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 pb-2 transition-colors ${currentView === AppView.TRAVEL_GUIDE ? 'text-thai-gold' : 'text-thai-silk/40 hover:text-thai-silk'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          <span className="text-[10px] font-display">ท่องเที่ยว</span>
        </button>

        {/* Center Space for FAB */}
        <div className="w-20"></div>

        {/* Center Floating Action Button (FAB) */}
        <div className="absolute left-1/2 -top-8 transform -translate-x-1/2">
          <button 
            onClick={handleOpenAR}
            className="w-16 h-16 rounded-full bg-gradient-to-b from-thai-gold to-[#B87333] shadow-[0_0_20px_rgba(212,175,55,0.6)] border-4 border-thai-midnight flex items-center justify-center text-thai-midnight active:scale-95 transition-transform group relative overflow-hidden"
          >
             {/* Spinner effect ring */}
             <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-spin-slow"></div>
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="z-10"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
          </button>
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-thai-gold tracking-wider whitespace-nowrap shadow-black drop-shadow-md">สแกน</span>
        </div>

        {/* Right Tabs */}
        <button 
          onClick={() => handleTabChange(AppView.CHAT)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 pb-2 transition-colors ${currentView === AppView.CHAT ? 'text-thai-gold' : 'text-thai-silk/40 hover:text-thai-silk'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span className="text-[10px] font-display">คุยกับน้อง</span>
        </button>

        <button 
          onClick={() => handleTabChange(AppView.PROFILE)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 pb-2 transition-colors ${currentView === AppView.PROFILE ? 'text-thai-gold' : 'text-thai-silk/40 hover:text-thai-silk'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span className="text-[10px] font-display">โปรไฟล์</span>
        </button>

      </div>
    </div>
  );
};

export default App;
