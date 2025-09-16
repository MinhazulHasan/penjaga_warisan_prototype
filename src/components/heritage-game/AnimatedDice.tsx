import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { playDiceRollSound } from './GameAudio';

interface AnimatedDiceProps {
  onRoll: (value: number) => void;
  disabled?: boolean;
}

const DiceFaces = {
  1: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ],
  2: [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1]
  ],
  3: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]
};

export const AnimatedDice: React.FC<AnimatedDiceProps> = ({ onRoll, disabled }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [currentValue, setCurrentValue] = useState<1 | 2 | 3>(1);

  const handleRoll = () => {
    if (disabled || isRolling) return;
    
    // Play dice roll sound
    playDiceRollSound();
    
    setIsRolling(true);
    
    // Animate the rolling
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setCurrentValue((Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3);
      rollCount++;
      
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 3) + 1;
        setCurrentValue(finalValue as 1 | 2 | 3);
        setIsRolling(false);
        onRoll(finalValue);
      }
    }, 100);
  };

  const renderDots = () => {
    const face = DiceFaces[currentValue];
    return face.map((row, rowIndex) =>
      row.map((dot, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-200",
            dot ? "bg-primary shadow-lg" : "bg-transparent"
          )}
        />
      ))
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={cn(
          "relative w-20 h-20 bg-gradient-to-br from-white to-gray-100",
          "border-4 border-primary/20 rounded-xl shadow-2xl",
          "flex items-center justify-center cursor-pointer",
          "transition-all duration-300 hover:scale-105",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:rounded-lg",
          isRolling && "animate-bounce shadow-[0_0_30px_rgba(var(--primary),0.5)]"
        )}
        onClick={handleRoll}
      >
        <div className="grid grid-cols-3 gap-1 p-2 z-10">
          {renderDots()}
        </div>
        
        {/* 3D Effect */}
        <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-primary/20 rounded-xl -z-10" />
      </div>
      
      <Button
        onClick={handleRoll}
        disabled={disabled || isRolling}
        className={cn(
          "px-6 py-2 font-bold transition-all duration-300",
          "bg-gradient-to-r from-primary to-primary/80",
          "hover:from-primary/90 hover:to-primary",
          isRolling && "animate-pulse"
        )}
      >
        {isRolling ? "Rolling..." : "Roll Dice"}
      </Button>
    </div>
  );
};