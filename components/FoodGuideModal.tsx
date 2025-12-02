
import React from 'react';
import { IMAGES } from '../assets';

interface FoodGuideModalProps {
  onClose: () => void;
}

const FoodGuideModal: React.FC<FoodGuideModalProps> = ({ onClose }) => {
  const places = [
    {
      name: "เจ๊ไฝ (Jay Fai)",
      badge: "Michelin 1 Star ⭐",
      type: "Street Food",
      location: "ใกล้ภูเขาทอง",
      desc: "ไข่เจียวปูระดับตำนาน ราคาค่อนข้างสูงแต่คุ้มค่าแก่การลอง",
      img: IMAGES.FOOD_JAY_FAI
    },
    {
      name: "ทิพย์สมัย ผัดไทยประตูผี",
      badge: "Bib Gourmand",
      type: "Pad Thai",
      location: "ใกล้เสาชิงช้า",
      desc: "ผัดไทยเส้นจันท์ใส่มันกุ้ง ห่อไข่ รสชาติต้นตำรับ",
      img: IMAGES.FOOD_PAD_THAI
    },
    {
      name: "มนต์นมสด (Mont Nomsod)",
      badge: "Local Legend",
      type: "Dessert",
      location: "เสาชิงช้า",
      desc: "ขนมปังปิ้งสังขยาและนมสด แวะทานหลังเดินเที่ยววัด",
      img: IMAGES.FOOD_MONT_NOMSOD
    },
    {
      name: "ข้าวหมูแดงสีมรกต",
      badge: "Bib Gourmand",
      type: "Street Food",
      location: "ตลาดน้อย",
      desc: "ข้าวหมูแดงหมูกรอบ น้ำราดสูตรเด็ด เก่าแก่กว่า 70 ปี",
      img: IMAGES.FOOD_MOO_DAENG
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="w-full max-w-sm bg-thai-midnight border border-thai-gold rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)] overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-thai-crimson to-[#59070c] p-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl bg-white/20 p-1.5 rounded-full">🍽️</span>
            <div>
               <h3 className="font-bold text-white text-lg font-display leading-none">ร้านเด็ดห้ามพลาด</h3>
               <p className="text-white/70 text-[10px] font-serif">Local & Michelin Guide</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-black/20 rounded-full hover:bg-black/40 transition-colors text-white font-bold">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 relative bg-thai-silk/5">
          <div className="absolute inset-0 bg-thai-pattern opacity-5 pointer-events-none"></div>

          {places.map((place, idx) => (
             <div key={idx} className="bg-thai-midnight border border-thai-gold/30 rounded-xl overflow-hidden shadow-lg group">
                <div className="flex">
                   <div className="w-24 h-auto relative">
                      <img src={place.img} alt={place.name} className="w-full h-full object-cover absolute inset-0" />
                   </div>
                   <div className="flex-1 p-3 relative">
                      <div className="flex justify-between items-start mb-1">
                         <h4 className="font-bold text-thai-gold text-sm group-hover:text-white transition-colors">{place.name}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                         <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${place.badge.includes('Star') ? 'bg-thai-crimson text-white border-thai-crimson' : 'bg-thai-gold/20 text-thai-gold border-thai-gold/30'}`}>
                            {place.badge}
                         </span>
                         <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 text-gray-400">
                            {place.location}
                         </span>
                      </div>
                      <p className="text-[10px] text-thai-silk/70 line-clamp-2">
                         {place.desc}
                      </p>
                   </div>
                </div>
             </div>
          ))}
          
          <div className="text-center pt-2">
             <p className="text-[10px] text-thai-silk/40 italic">ข้อมูลร้านอาหารเป็นเพียงคำแนะนำเบื้องต้น</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FoodGuideModal;
