import { useEffect, useRef } from 'react';

const LandingPageAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume for background music

    const startAudio = () => {
      if (audio.paused) {
        audio.play().catch(console.error);
      }
    };

    // Start audio on first user interaction
    const handleInteraction = () => {
      startAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <audio 
      ref={audioRef} 
      preload="auto"
    >
      <source src="/landing_bg_music.mp3" type="audio/mpeg" />
      <source src="/landing_bg_music.ogg" type="audio/ogg" />
      {/* Fallback for browsers that don't support the audio element */}
      Your browser does not support the audio element.
    </audio>
  );
};

export default LandingPageAudio;