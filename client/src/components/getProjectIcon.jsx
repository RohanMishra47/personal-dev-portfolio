import {
  Code,
  Mail,
  Gamepad2,
  Calculator,
  Camera,
  User,
  Clock,
  Cloud
} from 'lucide-react';

const getProjectIcon = (projectName, description) => {
  const name = (projectName || '').toLowerCase();
  const desc = (description || '').toLowerCase();
  const combinedText = `${name} ${desc}`;

  // Helper function to check for whole word matches
  const containsWord = (text, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(text);
  };

  // Helper function to check for any of the keywords
  const containsAnyWord = (text, words) => {
    return words.some(word => containsWord(text, word));
  };

  // Web Development
  if (containsAnyWord(combinedText, ['portfolio', 'website', 'landing', 'frontend'])) {
    return User;
  }

  // Communication/Chat
  if (containsAnyWord(combinedText, ['form', 'submit', 'submission'])) {
    return Mail;
  }

  // Games
  if (containsAnyWord(combinedText, ['game', 'puzzle', 'quiz', 'play'])) {
    return Gamepad2;
  }

  // Calculator/Math - Add currency converter here!
  if (containsAnyWord(combinedText, ['calculator', 'math', 'compute', 'algorithm', 'converter', 'currency'])) {
    return Calculator;
  }

  // Photography/Image
  if (containsAnyWord(combinedText, ['photo', 'image', 'gallery', 'camera'])) {
    return Camera;
  }

  if (containsAnyWord(combinedText, ['clock', 'alarm', 'stopwatch', 'timer'])) {
    return Clock;
  }

  if (containsAnyWord(combinedText, ['weather', 'temperature', 'forecast', 'humidity'])) {
    return Cloud;
  }

  // Default fallback
  return Code;
};

export default getProjectIcon;