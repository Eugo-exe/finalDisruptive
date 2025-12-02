
import React, { useState } from 'react';
import { IMAGES } from '../assets';

interface ProfileProps {
  onBack: () => void;
  isTabMode?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ onBack, isTabMode = false }) => {
  const [activeTab, setActiveTab] = useState<'stamps' | 'rewards'>('stamps');

  // Mock User Data
  const user = {
    name: "คุณสมศรี นักเดินทาง",
    level: "Siam Explorer",
    points: 350,
    nextLevelPoints: 500,
    avatar: IMAGES.PROFILE_USER_AVATAR,
  };

  // Mock Stamps (AR Collection)
  const stamps = [
    { id: 1, name: "วัดอรุณฯ", date: "10 ต.ค. 66", image: IMAGES.PROFILE_STAMP_WAT_ARUN, collected: true },
    { id: 2, name: "เสาชิงช้า", date: "12 ต.ค. 66", image: IMAGES.PROFILE_STAMP_GIANT_SWING, collected: true },
    { id: 3, name: "ภูเขาทอง", date: "-", image: IMAGES.PROFILE_STAMP_GOLDEN_MOUNT, collected: false },
    { id: 4, name: "วัดพระแก้ว", date: "-", image: IMAGES.PROFILE_STAMP_WAT_PHRA_KAEW, collected: false },
  ];

  // Mock Rewards
  const rewards = [
    { id: 1, name: "ส่วนลด 50฿ ร้านผัดไทยประตูผี", cost: 150, icon: "🍝", type: "Food" },
    { id: 2, name: "ฟรี! ชาไทย 1 แก้ว (Café Boran)", cost: 100, icon: "🧋", type: "Drink" },
    { id: 3, name: "บัตรขึ้นเรือด่วนเจ้าพระยา 1 เที่ยว", cost: 200, icon: "🚤", type: "Travel" },
    { id: 4, name: "ส่วนลด 10% สินค้า OTOP", cost: 300, icon: "🛍️", type: "Shop" },
  ];

  const progressPercent = (user.points / user.nextLevelPoints) * 100;

  return (
    <div className="flex flex-col h-full bg-thai-midnight text-white overflow-hidden font-sans relative">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-thai-pattern opacity-10 pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-thai-gold rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 pb-2 relative z-10 flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-thai-gold">โปรไฟล์ของฉัน</h2>
        <div className="w-8 h-8 rounded-full border border-thai-gold/30 flex items-center justify-center text-thai-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 relative z-10 pb-24">
        
        {/* User Info & Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full p-1 border-2 border-thai-gold/50 bg-black/20 relative z-10">
              <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
            {/* Rank Badge */}
            <div className="absolute -bottom-1 -right-1 bg-thai-gold text-thai-midnight text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 z-20 shadow-md">
              LV.2
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-serif">{user.name}</h3>
            <p className="text-thai-silk/60 text-sm mb-1">{user.level}</p>
            <div className="flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 rounded text-thai-silk/80 w-max">
              <span>Member ID:</span>
              <span className="font-mono">TH-88924</span>
            </div>
          </div>
        </div>

        {/* Loyalty Card (Starbucks Style) */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-2xl group transition-all hover:scale-[1.01]">
          {/* Card Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B] via-thai-gold to-[#F9E79F]"></div>
          
          {/* Decorative Patterns */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
             <svg viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
                <path d="M100 0 C 50 0 50 50 0 50" />
             </svg>
          </div>
          <div 
            className="absolute bottom-0 left-0 w-full h-full opacity-10" 
            style={{ backgroundImage: `url('${IMAGES.PROFILE_CARD_BG_PATTERN}')` }}
          ></div>
          
          <div className="absolute inset-0 p-5 flex flex-col justify-between text-thai-midnight">
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                   <span className="text-2xl">☸</span>
                   <span className="font-display font-bold tracking-widest text-sm opacity-80">SIAM PASS</span>
                </div>
                <div className="bg-black/10 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold">
                   GOLD TIER
                </div>
             </div>

             <div>
                <div className="flex items-end gap-2 mb-1">
                   <span className="text-5xl font-display font-bold leading-none">{user.points}</span>
                   <span className="text-sm font-bold mb-1 opacity-80">แต้มบุญ</span>
                </div>
                <p className="text-[10px] opacity-70 mb-3">อีก {user.nextLevelPoints - user.points} แต้ม เพื่อเลื่อนขั้นเป็น Platinum</p>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                   <div 
                      className="h-full bg-thai-midnight rounded-full"
                      style={{ width: `${progressPercent}%` }}
                   ></div>
                </div>
             </div>
          </div>
        </div>

        {/* Quick Action: Scan */}
        <div className="bg-white/5 border border-thai-gold/20 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-thai-rain to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                 📷
              </div>
              <div>
                 <h4 className="font-bold text-sm text-thai-silk">สแกนเก็บแต้ม</h4>
                 <p className="text-[10px] text-thai-silk/50">สแกนวัตถุโบราณตามสถานที่ต่างๆ</p>
              </div>
           </div>
           <button className="text-xs bg-thai-gold text-thai-midnight px-3 py-1.5 rounded-full font-bold hover:bg-white transition-colors">
              สแกนเลย
           </button>
        </div>

        {/* Tabs Section */}
        <div>
          <div className="flex border-b border-thai-gold/20 mb-4">
             <button 
                onClick={() => setActiveTab('stamps')}
                className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === 'stamps' ? 'text-thai-gold' : 'text-thai-silk/40'}`}
             >
                สมุดสะสม
                {activeTab === 'stamps' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-thai-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>}
             </button>
             <button 
                onClick={() => setActiveTab('rewards')}
                className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === 'rewards' ? 'text-thai-gold' : 'text-thai-silk/40'}`}
             >
                แลกของรางวัล
                {activeTab === 'rewards' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-thai-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>}
             </button>
          </div>

          {/* Content: Passport Stamps */}
          {activeTab === 'stamps' && (
             <div className="grid grid-cols-3 gap-3">
                {stamps.map((stamp) => (
                   <div key={stamp.id} className={`aspect-square rounded-xl border-2 ${stamp.collected ? 'border-thai-gold/50 bg-white/5' : 'border-dashed border-white/10 bg-transparent'} p-2 flex flex-col items-center justify-center relative group`}>
                      {stamp.collected ? (
                         <>
                            <div className="w-full h-full rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity mb-1">
                               <img src={stamp.image} className="w-full h-full object-cover filter sepia-[0.5]" alt={stamp.name} />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                               <div className="w-12 h-12 border-2 border-thai-gold rounded-full flex items-center justify-center transform -rotate-12 bg-thai-midnight/80 backdrop-blur-sm shadow-lg">
                                  <span className="text-[8px] font-bold text-thai-gold text-center leading-tight">VISA<br/>THAI<br/>PASSED</span>
                               </div>
                            </div>
                            <p className="text-[10px] text-thai-gold font-serif mt-1 absolute bottom-1 bg-black/60 px-2 rounded-full backdrop-blur-md">{stamp.name}</p>
                         </>
                      ) : (
                         <div className="flex flex-col items-center opacity-30">
                            <span className="text-2xl mb-1">🔒</span>
                            <span className="text-[10px] text-center">{stamp.name}</span>
                         </div>
                      )}
                   </div>
                ))}
                {/* Empty slots filler */}
                {[1, 2].map((i) => (
                   <div key={`empty-${i}`} className="aspect-square rounded-xl border-2 border-dashed border-white/5 bg-transparent flex items-center justify-center">
                      <span className="text-white/5 text-2xl">?</span>
                   </div>
                ))}
             </div>
          )}

          {/* Content: Rewards */}
          {activeTab === 'rewards' && (
             <div className="space-y-3">
                {rewards.map((reward) => (
                   <div key={reward.id} className="bg-white/5 border border-thai-gold/10 rounded-xl p-3 flex gap-4 items-center group hover:bg-white/10 transition-colors">
                      <div className="w-16 h-16 bg-gradient-to-br from-thai-gold/20 to-transparent rounded-lg flex items-center justify-center text-3xl border border-thai-gold/20">
                         {reward.icon}
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-thai-silk mb-1 line-clamp-1">{reward.name}</h4>
                            <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">{reward.type}</span>
                         </div>
                         <p className="text-[10px] text-thai-silk/50 mb-2">ใช้ได้ที่ร้านค้าที่ร่วมรายการ</p>
                         <div className="flex items-center justify-between">
                            <span className="text-thai-gold font-bold text-sm">{reward.cost} แต้ม</span>
                            <button 
                               disabled={user.points < reward.cost}
                               className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${
                                  user.points >= reward.cost 
                                  ? 'bg-thai-gold text-thai-midnight hover:scale-105 shadow-[0_0_10px_rgba(212,175,55,0.3)]' 
                                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
                               }`}
                            >
                               {user.points >= reward.cost ? 'แลกสิทธิ์' : 'แต้มไม่พอ'}
                            </button>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
