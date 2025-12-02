
import React, { useEffect, useState } from 'react';
import { IMAGES } from '../assets';

interface ARScannerProps {
  onClose: () => void;
}

const ARScanner: React.FC<ARScannerProps> = ({ onClose }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [targetFound, setTargetFound] = useState(false);

  // Define assets from centralized assets file
  const TARGET_MIND = IMAGES.AR_TARGET_MIND;
  const MODEL_GLB = IMAGES.AR_MODEL_GLB;

  useEffect(() => {
    // We need to listen to events on the scene to update React state
    const sceneEl = document.querySelector('a-scene');
    const targetEl = document.querySelector('#ar-target');

    const handleTargetFound = () => {
      console.log("Target Found");
      setTargetFound(true);
    };

    const handleTargetLost = () => {
      console.log("Target Lost");
      setTargetFound(false);
    };

    if (targetEl) {
      targetEl.addEventListener('targetFound', handleTargetFound);
      targetEl.addEventListener('targetLost', handleTargetLost);
    }

    // Cleanup function when component unmounts
    return () => {
      if (targetEl) {
        targetEl.removeEventListener('targetFound', handleTargetFound);
        targetEl.removeEventListener('targetLost', handleTargetLost);
      }
      
      const video = document.querySelector('video');
      if (video) {
        const stream = video.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
        video.remove();
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-black z-50 font-sans overflow-hidden">
      
      {/* Decorative Thai Frame Overlay (Viewfinder) */}
      <div className="absolute inset-0 pointer-events-none z-40 p-6 flex flex-col justify-between">
        <div className="flex justify-between">
            <div className="w-12 h-12 border-t-4 border-l-4 border-thai-gold rounded-tl-xl drop-shadow-md"></div>
            <div className="w-12 h-12 border-t-4 border-r-4 border-thai-gold rounded-tr-xl drop-shadow-md"></div>
        </div>
        <div className="flex justify-between">
            <div className="w-12 h-12 border-b-4 border-l-4 border-thai-gold rounded-bl-xl drop-shadow-md"></div>
            <div className="w-12 h-12 border-b-4 border-r-4 border-thai-gold rounded-br-xl drop-shadow-md"></div>
        </div>
      </div>

      {/* Center Reticle */}
      {!targetFound && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 opacity-50">
            <div className="w-64 h-64 border border-thai-gold/30 rounded-lg relative animate-pulse-slow">
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-thai-gold rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 left-1/2 h-4 w-[1px] bg-thai-gold transform -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 h-4 w-[1px] bg-thai-gold transform -translate-x-1/2"></div>
                <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-thai-gold transform -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-4 h-[1px] bg-thai-gold transform -translate-y-1/2"></div>
            </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full z-50 p-4 pt-8 flex justify-between items-start pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={onClose}
          className="pointer-events-auto bg-black/40 backdrop-blur-md text-thai-silk border border-thai-gold/50 px-5 py-2 rounded-full font-bold hover:bg-thai-crimson hover:border-thai-crimson transition-all flex items-center gap-2 group shadow-lg"
        >
          <span className="text-thai-gold group-hover:text-white text-lg">✕</span> 
          <span className="text-sm tracking-wide font-display">ออก</span>
        </button>
        <div className="bg-black/40 backdrop-blur-md border border-thai-gold px-4 py-1.5 rounded-full text-thai-gold text-xs font-display tracking-widest shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
          ระบบ AR ทำงาน
        </div>
      </div>

      {/* Bottom Instructions / Status */}
      <div className="absolute bottom-12 left-0 w-full z-50 flex flex-col items-center pointer-events-none px-6 text-center">
        {!targetFound ? (
          <div className="bg-black/60 backdrop-blur-xl text-thai-silk px-6 py-4 rounded-xl border-t border-thai-gold/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transform transition-all duration-500">
            <p className="font-display text-thai-gold text-xl mb-1 tracking-wide">กรุณาส่องไปที่รูปภาพ</p>
            <p className="text-xs text-gray-400 font-light">Scan the target image to unlock content</p>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-thai-midnight via-black to-thai-midnight text-white px-8 py-5 rounded-2xl border border-thai-gold shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-float">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-2xl animate-spin-slow">☸</span>
              <p className="font-display text-thai-gold text-2xl font-bold">พบวัตถุโบราณ!</p>
            </div>
            <p className="text-sm text-gray-300 font-serif italic">"วัดอรุณราชวราราม (จำลอง)"</p>
          </div>
        )}
      </div>

      {/* A-Frame Scene */}
      {/* @ts-ignore */}
      <a-scene 
        mindar-image={`imageTargetSrc: ${TARGET_MIND}; filterMinCF:0.0001; filterBeta: 0.001;`} 
        color-space="sRGB" 
        renderer="colorManagement: true, physicallyCorrectLights" 
        vr-mode-ui="enabled: false" 
        device-orientation-permission-ui="enabled: false"
        className="absolute inset-0 w-full h-full"
      >
        {/* @ts-ignore */}
        <a-assets>
            {/* @ts-ignore */}
          <a-asset-item id="avatarModel" src={MODEL_GLB}></a-asset-item>
        {/* @ts-ignore */}
        </a-assets>

        {/* Camera */}
        {/* @ts-ignore */}
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Target Entity */}
        {/* @ts-ignore */}
        <a-entity id="ar-target" mindar-image-target="targetIndex: 0">
            {/* 3D Model Overlay */}
            {/* @ts-ignore */}
            <a-gltf-model 
                rotation="0 0 0 " 
                position="0 -0.25 0" 
                scale="0.05 0.05 0.05" 
                src="#avatarModel" 
                animation="property: position; to: 0 -0.2 0; dir: alternate; dur: 2000; loop: true"
            >
            {/* @ts-ignore */}
            </a-gltf-model>
             
             {/* Floating Info Plane */}
             {/* @ts-ignore */}
            <a-plane position="0 0.5 0" width="1.8" height="0.5" color="#050A18" opacity="0.9" side="double">
                {/* @ts-ignore */}
                <a-text value="Wat Arun (Temple of Dawn)" align="center" width="3" color="#D4AF37" font="exo2bold" position="0 0.05 0"></a-text>
                {/* @ts-ignore */}
                <a-text value="Interactive 3D Artifact" align="center" width="2" color="#AAAAAA" position="0 -0.1 0"></a-text>
                {/* Border for the plane */}
                {/* @ts-ignore */}
                <a-entity geometry="primitive: plane; width: 1.75; height: 0.45" material="color: #D4AF37; shader: flat; side: double" position="0 0 -0.01"></a-entity>
            {/* @ts-ignore */}
            </a-plane>

        {/* @ts-ignore */}
        </a-entity>
      {/* @ts-ignore */}
      </a-scene>
    </div>
  );
};

export default ARScanner;
