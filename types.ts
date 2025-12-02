export enum AppView {
  LANDING = 'LANDING',
  AR_SCANNER = 'AR_SCANNER',
  CHAT = 'CHAT',
  TRAVEL_GUIDE = 'TRAVEL_GUIDE',
  PROFILE = 'PROFILE'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SceneConfig {
  targetMindUrl: string; // The .mind file URL
  modelUrl: string;      // The .gltf/.glb file URL
}

export interface RecommendationItem {
  name: string;
  description: string;
  category: string;
  location?: string;
  priceRange?: string; // For restaurants
}

export interface ProvinceData {
  attractions: RecommendationItem[];
  restaurants: RecommendationItem[];
}