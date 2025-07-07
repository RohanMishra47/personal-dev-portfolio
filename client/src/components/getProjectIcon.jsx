import { 
  Code, 
  Globe, 
  Database, 
  Smartphone, 
  Brain, 
  Gamepad2, 
  ShoppingCart, 
  MessageSquare,
  Server,
  Palette,
  Zap,
  BookOpen,
  Calculator,
  Music,
  Camera,
  Shield,
  Laptop,
  FileText,
  Heart,
  Briefcase
} from 'lucide-react';

const getProjectIcon = (projectName, description) => {
  const name = (projectName || '').toLowerCase();
  const desc = (description || '').toLowerCase();
  const combinedText = `${name} ${desc}`;
  
  // Web Development
  if (combinedText.includes('portfolio') || combinedText.includes('website') || 
      combinedText.includes('landing') || combinedText.includes('frontend')) {
    return Globe;
  }
  
  // E-commerce
  if (combinedText.includes('shop') || combinedText.includes('store') || 
      combinedText.includes('ecommerce') || combinedText.includes('cart')) {
    return ShoppingCart;
  }
  
  // Communication/Chat
  if (combinedText.includes('chat') || combinedText.includes('message') || 
      combinedText.includes('social') || combinedText.includes('comment')) {
    return MessageSquare;
  }
  
  // Games
  if (combinedText.includes('game') || combinedText.includes('puzzle') || 
      combinedText.includes('quiz') || combinedText.includes('play')) {
    return Gamepad2;
  }
  
  // AI/ML
  if (combinedText.includes('ai') || combinedText.includes('ml') || 
      combinedText.includes('neural') || combinedText.includes('machine learning') ||
      combinedText.includes('tensorflow') || combinedText.includes('model')) {
    return Brain;
  }
  
  // Mobile Apps
  if (combinedText.includes('mobile') || combinedText.includes('app') || 
      combinedText.includes('android') || combinedText.includes('ios') ||
      combinedText.includes('flutter') || combinedText.includes('react native')) {
    return Smartphone;
  }
  
  // Database/API
  if (combinedText.includes('database') || combinedText.includes('api') || 
      combinedText.includes('backend') || combinedText.includes('server') ||
      combinedText.includes('sql') || combinedText.includes('mongodb')) {
    return Database;
  }
  
  // Tools/Utilities
  if (combinedText.includes('tool') || combinedText.includes('utility') || 
      combinedText.includes('helper') || combinedText.includes('automation')) {
    return Tool;
  }
  
  // Calculator/Math
  if (combinedText.includes('calculator') || combinedText.includes('math') || 
      combinedText.includes('compute') || combinedText.includes('algorithm')) {
    return Calculator;
  }
  
  // Music/Audio
  if (combinedText.includes('music') || combinedText.includes('audio') || 
      combinedText.includes('sound') || combinedText.includes('player')) {
    return Music;
  }
  
  // Photography/Image
  if (combinedText.includes('photo') || combinedText.includes('image') || 
      combinedText.includes('gallery') || combinedText.includes('camera')) {
    return Camera;
  }
  
  // Documentation/Blog
  if (combinedText.includes('blog') || combinedText.includes('doc') || 
      combinedText.includes('wiki') || combinedText.includes('readme')) {
    return BookOpen;
  }
  
  // Security
  if (combinedText.includes('security') || combinedText.includes('auth') || 
      combinedText.includes('login') || combinedText.includes('password')) {
    return Shield;
  }
  
  // Design/UI
  if (combinedText.includes('design') || combinedText.includes('ui') || 
      combinedText.includes('theme') || combinedText.includes('css')) {
    return Palette;
  }
  
  // Business/Professional
  if (combinedText.includes('business') || combinedText.includes('management') || 
      combinedText.includes('crm') || combinedText.includes('dashboard')) {
    return Briefcase;
  }
  
  // Health/Fitness
  if (combinedText.includes('health') || combinedText.includes('fitness') || 
      combinedText.includes('workout') || combinedText.includes('medical')) {
    return Heart;
  }
  
  // Performance/Speed
  if (combinedText.includes('fast') || combinedText.includes('performance') || 
      combinedText.includes('speed') || combinedText.includes('optimiz')) {
    return Zap;
  }
  
  // Server/DevOps
  if (combinedText.includes('docker') || combinedText.includes('deploy') || 
      combinedText.includes('cloud') || combinedText.includes('devops')) {
    return Server;
  }
  
  // Desktop Applications
  if (combinedText.includes('desktop') || combinedText.includes('electron') || 
      combinedText.includes('gui') || combinedText.includes('application')) {
    return Laptop;
  }
  
  // Text/Editor
  if (combinedText.includes('editor') || combinedText.includes('text') || 
      combinedText.includes('markdown') || combinedText.includes('writer')) {
    return FileText;
  }
  
  // Default fallback
  return Code;
};

export default getProjectIcon;