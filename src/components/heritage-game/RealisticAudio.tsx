// More realistic audio implementation using Web Audio API
export const createDiceRollSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create a complex dice roll sound with multiple components
  const duration = 0.8;
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate dice roll sound with multiple phases
  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate;
    let sample = 0;
    
    // Initial impact (dice hitting surface)
    if (t < 0.1) {
      sample += Math.random() * 0.8 * Math.exp(-t * 20);
    }
    
    // Rolling/tumbling phase
    if (t >= 0.1 && t < 0.6) {
      const rollFreq = 40 + (t - 0.1) * 20;
      sample += Math.random() * 0.3 * Math.sin(2 * Math.PI * rollFreq * t) * Math.exp(-(t - 0.1) * 5);
    }
    
    // Final settle
    if (t >= 0.6) {
      sample += Math.random() * 0.1 * Math.exp(-(t - 0.6) * 10);
    }
    
    data[i] = sample * 0.5; // Overall volume
  }
  
  return buffer;
};

export const createMovementSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create a soft piece movement sound
  const duration = 0.3;
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate;
    let sample = 0;
    
    // Soft slide sound
    const freq = 150 + t * 50;
    sample = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 8) * 0.2;
    
    // Add some texture
    sample += Math.random() * 0.05 * Math.exp(-t * 12);
    
    data[i] = sample;
  }
  
  return buffer;
};

export const playRealisticDiceRoll = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const buffer = createDiceRollSound();
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = 0.4;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.start();
  } catch (error) {
    console.warn('Could not play dice roll sound:', error);
  }
};

export const playRealisticMovement = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const buffer = createMovementSound();
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = 0.2;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.start();
  } catch (error) {
    console.warn('Could not play movement sound:', error);
  }
};