import React from 'react';
import { cn } from '@/lib/utils';

interface TombstoneZoneProps {
  x: number;
  y: number;
  isActive: boolean;
  onClick: () => void;
}

export const TombstoneZone: React.FC<TombstoneZoneProps> = ({ x, y, isActive, onClick }) => {
  return (
    <div
      className={cn(
        "absolute w-10 h-10 cursor-pointer transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 z-20",
        isActive 
          ? "scale-150 animate-pulse-glow z-30" 
          : "hover:scale-125"
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
    >
      {/* Tombstone Square (matching the map design) */}
      <div className={cn(
        "w-full h-full border-4 shadow-lg transition-all duration-300",
        isActive
          ? "bg-amber-200 border-amber-600 shadow-amber-400/50"
          : "bg-amber-100 border-amber-500 hover:bg-amber-150 shadow-amber-300/40"
      )}>
        {/* Tombstone Icon */}
        <div className="w-full h-full flex items-center justify-center">
          <div className={cn(
            "w-4 h-5 rounded-t-lg transition-all duration-300",
            isActive ? "bg-amber-700" : "bg-amber-600"
          )} />
        </div>
      </div>
      
      {/* Glow Effect for Active Zone */}
      {isActive && (
        <>
          <div className="absolute inset-0 border-4 border-yellow-400 animate-ping opacity-75" />
          <div className="absolute inset-0 bg-yellow-300/20 animate-pulse" />
        </>
      )}
    </div>
  );
};