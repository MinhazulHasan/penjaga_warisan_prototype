import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface GameAudioProps {
  isBackgroundMuted?: boolean;
  onBackgroundMuteToggle?: () => void;
}

export const GameAudio: React.FC<GameAudioProps> = ({ 
  isBackgroundMuted = false, 
  onBackgroundMuteToggle 
}) => {
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = 0.3;
      backgroundAudioRef.current.loop = true;
      
      if (!isBackgroundMuted) {
        backgroundAudioRef.current.play().catch(console.error);
      } else {
        backgroundAudioRef.current.pause();
      }
    }
  }, [isBackgroundMuted]);

  return (
    <div className="flex items-center space-x-2">
      <audio
        ref={backgroundAudioRef}
        loop
        preload="auto"
      >
        <source src="https://www.soundjay.com/misc/sounds/calm-forest.wav" type="audio/wav" />
        <source src="https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg" type="audio/ogg" />
      </audio>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onBackgroundMuteToggle}
        className="h-8 w-8 p-0"
        title={isBackgroundMuted ? "Unmute background music" : "Mute background music"}
      >
        {isBackgroundMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

// Audio file players for custom sounds
export const playDiceRollSound = () => {
  try {
    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator for dice roll sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Dice roll sound effect (rapid frequency changes)
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  } catch (error) {
    console.warn('Could not play dice roll sound:', error);
  }
};

export const playMovementSound = () => {
  try {
    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator for movement sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Movement sound effect (gentle "pop" sound)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (error) {
    console.warn('Could not play movement sound:', error);
  }
};