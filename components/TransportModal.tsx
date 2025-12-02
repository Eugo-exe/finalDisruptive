import React from 'react';

interface TransportModalProps {
  onClose: () => void;
}

const TransportModal: React.FC<TransportModalProps> = ({ onClose }) => {
  const apps = [
    {
      category: "รถเมล์ (Bus Tracking)",
      icon: "🚌",
      color: "text-blue-400",
      items: [
        { name: "ViaBus", desc: "ติดตามรถเมล์ ขสมก. เรียลไทม์", store: "Essential for BMTA buses" },
        { name: "TSB GO Plus", desc: "สำหรับรถเมล์ไฟฟ้า Thai Smile Bus", store: "For EV Buses" }
      ]
    },
    {
      category: "รถไฟฟ้า (Skytrain & Metro)",
      icon: "🚆",
      color: "text-purple-400",
      items: [
        { name: "The Skytrains", desc: "แผนที่ BTS/MRT และคำนวณค่าโดยสาร", store: "Best for route planning" },
        { name: "Transit", desc: "แอพนำทางขนส่งสาธารณะที่แม่นยำ", store: "Global Standard" }
      ]
    },
    {
      category: "เรือด่วน (Boat)",
      icon: "🚤",
      color: "text-orange-400",
      items: [
        { name: "Chao Phraya Boat", desc: "ตารางเดินเรือเจ้าพระยา", store: "Boat Schedule" }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="w-full max-w-sm bg-thai-midnight border border-thai-gold rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)] overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-thai-gold to-[#B8860B] p-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl bg-white/20 p-1.5 rounded-full">🗺️</span>
            <div>
               <h3 className="font-bold text-thai-midnight text-lg font-display leading-none">คู่มือเดินทาง</h3>
               <p className="text-thai-midnight/70 text-[10px] font-serif">Transport Guide</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-black/10 rounded-full hover:bg-black/20 transition-colors text-thai-midnight font-bold">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto custom-scrollbar space-y-6 relative">
          <div className="absolute inset-0 bg-thai-pattern opacity-5 pointer-events-none"></div>

          {/* Quick Tip */}
          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl flex gap-3 items-start">
             <div className="text-xl">💡</div>
             <div>
                <h4 className="font-bold text-blue-400 text-sm mb-1">คำแนะนำ (Tip)</h4>
                <p className="text-thai-silk/80 text-xs leading-relaxed">
                   การเดินทางในกรุงเทพฯ ช่วงเวลาเร่งด่วน (07:00-09:00, 17:00-19:00) ควรหลีกเลี่ยงรถเมล์และใช้รถไฟฟ้าแทนเจ้าค่ะ
                </p>
             </div>
          </div>

          {/* App Lists */}
          {apps.map((section, idx) => (
            <div key={idx}>
              <h4 className={`font-bold ${section.color} mb-3 flex items-center gap-2 font-display`}>
                {section.icon} {section.category}
              </h4>
              <div className="space-y-3">
                {section.items.map((app, appIdx) => (
                  <div key={appIdx} className="bg-white/5 border border-white/10 p-3 rounded-xl flex justify-between items-center group hover:border-thai-gold/50 transition-colors">
                     <div>
                        <div className="font-bold text-thai-silk text-sm group-hover:text-thai-gold transition-colors">{app.name}</div>
                        <div className="text-xs text-gray-400 mb-1">{app.desc}</div>
                        <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[9px] text-gray-500">{app.store}</span>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 group-hover:bg-thai-gold group-hover:text-thai-midnight transition-all">
                        ⬇
                     </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default TransportModal;
