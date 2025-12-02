import React, { useState, useMemo } from 'react';
import { getProvinceRecommendations } from '../services/geminiService';
import { ProvinceData, RecommendationItem } from '../types';

interface TravelGuideProps {
  onBack: () => void;
  isTabMode?: boolean;
}

const POPULAR_PROVINCES = [
  { name: 'กรุงเทพฯ', icon: '🏙️', color: 'from-blue-500 to-purple-600' },
  { name: 'เชียงใหม่', icon: '⛰️', color: 'from-green-500 to-emerald-700' },
  { name: 'ภูเก็ต', icon: '🏖️', color: 'from-cyan-400 to-blue-600' },
  { name: 'อยุธยา', icon: '🛕', color: 'from-orange-500 to-red-700' },
  { name: 'ชลบุรี', icon: '🌊', color: 'from-blue-400 to-indigo-600' },
  { name: 'ขอนแก่น', icon: '🦕', color: 'from-yellow-500 to-orange-600' },
];

const TravelGuide: React.FC<TravelGuideProps> = ({ onBack, isTabMode = false }) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [data, setData] = useState<ProvinceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'attractions' | 'restaurants'>('attractions');
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  
  // State for Modal with Map
  const [selectedPlace, setSelectedPlace] = useState<RecommendationItem | null>(null);

  const handleProvinceSelect = async (provinceName: string) => {
    setSelectedProvince(provinceName);
    setLoading(true);
    setData(null);
    setSelectedCategory('ทั้งหมด');
    try {
      const result = await getProvinceRecommendations(provinceName);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to open Google Maps (External)
  const handleOpenMapExternal = (placeName: string) => {
    const query = encodeURIComponent(`${placeName} ${selectedProvince || 'Thailand'}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // Function to show details and internal map
  const handleViewDetails = (item: RecommendationItem) => {
    setSelectedPlace(item);
  };

  // Function to filter by same category (Simulating "Nearby/Similar")
  const handleShowNearby = (category: string) => {
    setSelectedCategory(category);
    // Optional: Scroll to top or show a feedback toast could go here
  };

  // Derived state for categories
  const categories = useMemo(() => {
    if (!data) return ['ทั้งหมด'];
    const items = activeTab === 'attractions' ? data.attractions : data.restaurants;
    const uniqueCats = Array.from(new Set(items.map(item => item.category)));
    return ['ทั้งหมด', ...uniqueCats];
  }, [data, activeTab]);

  // Derived state for filtered items
  const filteredItems = useMemo(() => {
    if (!data) return [];
    const items = activeTab === 'attractions' ? data.attractions : data.restaurants;
    if (selectedCategory === 'ทั้งหมด') return items;
    return items.filter(item => item.category === selectedCategory);
  }, [data, activeTab, selectedCategory]);

  return (
    <div className="flex flex-col h-full bg-thai-midnight text-white overflow-hidden font-sans relative">
      {/* Background Decor - Thai Pattern */}
      <div className="absolute inset-0 bg-thai-pattern opacity-10 pointer-events-none z-0"></div>
      
      {/* Thai-style Border Frame (Top corners) */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-thai-gold/20 rounded-tl-3xl pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-thai-gold/20 rounded-tr-3xl pointer-events-none z-10"></div>

      {/* Header */}
      <div className="flex items-center p-4 bg-thai-midnight/90 backdrop-blur-md border-b border-thai-gold/30 z-20 shadow-lg relative">
        {!isTabMode && (
          <button 
            onClick={onBack}
            className="p-2 mr-2 rounded-full hover:bg-white/10 text-thai-gold transition-colors active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}
        <div className="flex-1 text-center pr-8">
          <h2 className="font-serif font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-thai-gold via-yellow-200 to-thai-gold drop-shadow-sm tracking-wide">
            {selectedProvince ? selectedProvince : 'ทั่วถิ่นแดนไทย'}
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-thai-gold to-transparent mx-auto mt-1 opacity-50"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 scroll-smooth custom-scrollbar relative z-10">
        
        {/* Province Selector */}
        {!selectedProvince && (
           <div className="animate-float">
             <div className="text-center mb-8 mt-2">
               <div className="w-16 h-16 mx-auto mb-3 bg-thai-gold/10 rounded-full flex items-center justify-center border border-thai-gold/30">
                 <span className="text-3xl">🗺️</span>
               </div>
               <h3 className="text-lg text-thai-silk font-light">เลือกจังหวัดที่ท่านต้องการไป</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-4 pb-10">
               {POPULAR_PROVINCES.map((prov) => (
                 <button
                   key={prov.name}
                   onClick={() => handleProvinceSelect(prov.name)}
                   className="relative group h-36 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-thai-gold/30 hover:border-thai-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all transform active:scale-95 duration-300"
                 >
                   <div className={`absolute inset-0 bg-gradient-to-br ${prov.color} opacity-70 group-hover:opacity-90 transition-opacity`}></div>
                   
                   {/* Decorative corner */}
                   <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/60"></div>
                   <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/60"></div>

                   <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-2">
                     <span className="text-5xl mb-3 filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500 ease-out">{prov.icon}</span>
                     <span className="font-bold text-lg text-white drop-shadow-md font-serif tracking-wide">{prov.name}</span>
                   </div>
                   {/* Pattern overlay */}
                   <div className="absolute inset-0 opacity-15 bg-thai-pattern"></div>
                 </button>
               ))}
             </div>
           </div>
        )}

        {/* Selected View */}
        {selectedProvince && (
          <div className="animate-pulse-slow">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-6">
               <button 
                  onClick={() => setSelectedProvince(null)}
                  className="flex items-center gap-1 text-xs bg-white/5 border border-thai-gold/20 px-3 py-1.5 rounded-full text-thai-silk hover:bg-thai-gold hover:text-thai-midnight transition-colors"
               >
                  <span>← เลือกจังหวัดอื่น</span>
               </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="relative">
                   <div className="w-20 h-20 rounded-full border-2 border-thai-gold/20 animate-ping"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-12 h-12 border-2 border-thai-gold border-t-transparent rounded-full animate-spin"></div>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center text-xl animate-bounce">🌧️</div>
                </div>
                <p className="text-thai-gold font-serif text-sm animate-pulse tracking-wider">น้องน้ำฝนกำลังรวบรวมข้อมูลเจ้าค่ะ...</p>
              </div>
            )}

            {/* Data Display */}
            {!loading && data && (
              <>
                {/* Main Tabs */}
                <div className="flex p-1 bg-black/40 rounded-xl mb-4 backdrop-blur-sm border border-thai-gold/20">
                  <button
                    onClick={() => { setActiveTab('attractions'); setSelectedCategory('ทั้งหมด'); }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all font-display ${
                      activeTab === 'attractions' 
                      ? 'bg-gradient-to-r from-thai-gold to-[#B8860B] text-thai-midnight shadow-lg' 
                      : 'text-thai-silk/70 hover:bg-white/5'
                    }`}
                  >
                    🏛️ ที่เที่ยว
                  </button>
                  <button
                    onClick={() => { setActiveTab('restaurants'); setSelectedCategory('ทั้งหมด'); }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all font-display ${
                      activeTab === 'restaurants' 
                      ? 'bg-gradient-to-r from-thai-tea to-orange-700 text-white shadow-lg' 
                      : 'text-thai-silk/70 hover:bg-white/5'
                    }`}
                  >
                    🍜 ร้านเด็ด
                  </button>
                </div>

                {/* Category Filter Chips (Horizontal Scroll) */}
                <div className="mb-6 -mx-4 px-4 overflow-x-auto no-scrollbar py-1">
                  <div className="flex gap-2 min-w-min">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs border transition-all ${
                          selectedCategory === cat
                            ? 'bg-thai-gold border-thai-gold text-thai-midnight font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                            : 'bg-transparent border-thai-gold/30 text-thai-gold/80 hover:border-thai-gold hover:text-thai-gold'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Cards */}
                <div className="space-y-5">
                  {filteredItems.length === 0 ? (
                     <div className="text-center py-10 text-thai-silk/50">
                        <p>ไม่มีข้อมูลในหมวดหมู่นี้เจ้าค่ะ</p>
                     </div>
                  ) : (
                    filteredItems.map((item, idx) => (
                      <div 
                        key={idx}
                        className="group relative bg-thai-midnight border border-thai-gold/30 rounded-2xl shadow-lg overflow-hidden transition-all hover:-translate-y-1"
                      >
                        {/* Thai Background Pattern inside card */}
                        <div className="absolute inset-0 bg-thai-pattern opacity-10"></div>
                        
                        {/* Corner decorative element (Kanok hint) */}
                        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20">
                           <svg viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="2">
                              <path d="M100 0 C 50 0 50 50 0 50" />
                              <path d="M100 20 C 70 20 70 50 20 50" />
                           </svg>
                        </div>

                        <div className="relative z-10 p-5 pb-3">
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <h3 className="text-lg font-serif font-bold text-thai-gold group-hover:text-white transition-colors leading-tight">
                              {item.name}
                            </h3>
                            <span className="text-[9px] uppercase tracking-wider bg-thai-gold/10 px-2 py-1 rounded text-thai-gold border border-thai-gold/20 whitespace-nowrap">
                              {item.category}
                            </span>
                          </div>
                          
                          <p className="text-xs text-thai-silk/80 font-light leading-relaxed mb-3 border-l-2 border-thai-gold/30 pl-3">
                            {item.description}
                          </p>
                          
                          {item.priceRange && (
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-[10px] text-thai-tea font-bold bg-thai-tea/10 px-2 py-0.5 rounded border border-thai-tea/20">
                                ราคา: {item.priceRange}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Actions Footer */}
                        <div className="bg-black/20 border-t border-thai-gold/10 px-4 py-2 flex gap-3">
                           <button 
                             onClick={() => handleViewDetails(item)}
                             className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold text-thai-gold bg-thai-gold/5 border border-thai-gold/30 hover:bg-thai-gold hover:text-thai-midnight transition-all active:scale-95"
                           >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                              ดูแผนที่
                           </button>
                           <button 
                             onClick={() => handleShowNearby(item.category)}
                             className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold text-thai-silk/80 bg-white/5 border border-white/10 hover:border-thai-rain hover:text-thai-rain transition-all active:scale-95"
                           >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                              ใกล้เคียง
                           </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Place Details Modal with Interactive Map */}
      {selectedPlace && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-shimmer">
           <div className="w-full h-[85%] sm:h-auto sm:max-w-lg bg-thai-midnight border-t sm:border border-thai-gold rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-thai-crimson transition-colors"
              >
                ✕
              </button>

              {/* Map Container */}
              <div className="h-2/3 sm:h-64 w-full bg-gray-800 relative">
                 <iframe 
                   title="Location Map"
                   width="100%" 
                   height="100%" 
                   frameBorder="0" 
                   scrolling="no" 
                   marginHeight={0} 
                   marginWidth={0} 
                   className="filter grayscale-[30%] contrast-125 hover:grayscale-0 transition-all duration-500"
                   src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedPlace.name + ' ' + (selectedProvince || 'Thailand'))}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                 ></iframe>
                 {/* Map Decorative Border */}
                 <div className="absolute inset-0 border-b-4 border-thai-gold pointer-events-none"></div>
              </div>

              {/* Info Container */}
              <div className="flex-1 p-6 bg-thai-midnight relative">
                 {/* Decorative background */}
                 <div className="absolute inset-0 bg-thai-pattern opacity-5 pointer-events-none"></div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-2xl">📍</span>
                       <h3 className="font-serif font-bold text-xl text-thai-gold">{selectedPlace.name}</h3>
                    </div>
                    
                    <span className="inline-block px-2 py-1 bg-thai-gold/10 border border-thai-gold/20 rounded text-[10px] text-thai-gold uppercase tracking-wider mb-4">
                       {selectedPlace.category}
                    </span>

                    <p className="text-thai-silk/80 text-sm leading-relaxed mb-6">
                       {selectedPlace.description}
                       {selectedPlace.priceRange && <span className="block mt-2 text-thai-tea font-bold">ราคาโดยประมาณ: {selectedPlace.priceRange}</span>}
                    </p>

                    <button 
                       onClick={() => handleOpenMapExternal(selectedPlace.name)}
                       className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold shadow-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                       นำทางด้วย Google Maps
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default TravelGuide;