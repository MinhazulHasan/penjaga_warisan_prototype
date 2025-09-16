import React from 'react';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerPawnProps {
  x: number;
  y: number;
  playerNumber: number;
  isCurrentPlayer: boolean;
}

export const PlayerPawn: React.FC<PlayerPawnProps> = ({ x, y, playerNumber, isCurrentPlayer }) => {
  const playerColors = {
    1: {
      body: 'from-blue-400 via-blue-500 to-blue-600',
      border: 'border-blue-700',
      crown: 'text-blue-400 fill-blue-300',
      aura: 'from-blue-300/20'
    },
    2: {
      body: 'from-red-400 via-red-500 to-red-600',
      border: 'border-red-700',
      crown: 'text-red-400 fill-red-300',
      aura: 'from-red-300/20'
    }
  };

  const colors = playerColors[playerNumber as keyof typeof playerColors];
  return (
    <div
      className={cn(
        "absolute w-8 h-10 transition-all duration-700 ease-in-out z-30 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl",
        isCurrentPlayer && "animate-bounce scale-110"
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Professional Heritage Guardian */}
      <div className="relative w-full h-full">
        {/* Glowing Crown */}
        <div className={cn(
          "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 animate-float",
          isCurrentPlayer && "animate-pulse"
        )}>
          <Crown className={cn("w-5 h-5 drop-shadow-lg filter brightness-110", colors.crown)} />
          <div className={cn("absolute inset-0 rounded-full animate-pulse", isCurrentPlayer ? "bg-yellow-300/60" : "bg-current/40")} />
        </div>

        {/* Enhanced Guardian Body */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
          <div className={cn(
            "w-7 h-8 bg-gradient-to-b rounded-xl border-2 shadow-2xl relative overflow-hidden",
            colors.body,
            colors.border
          )}>
            {/* Traditional Acehnese Patterns */}
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-200/30 to-transparent rounded-lg" />
            <div className="w-full h-3 bg-amber-800/40 mt-3 rounded-sm border-b border-amber-900/50" />
            <div className="w-full h-2 bg-amber-800/30 mt-1 rounded-sm" />
            <div className="w-full h-1 bg-amber-800/20 mt-1 rounded-sm" />

            {/* Detailed Face */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
              <div className="w-3.5 h-3.5 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full border border-amber-400 shadow-inner">
                <div className="flex justify-center items-center h-full">
                  <div className="w-1 h-1 bg-amber-900 rounded-full shadow-sm" />
                </div>
              </div>
            </div>

            {/* Heritage Symbol on Chest */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-1.5 bg-yellow-400 rounded border border-yellow-600 opacity-80" />
            </div>
          </div>
        </div>

        {/* Professional Shadow with Glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
          <div className="w-6 h-2 bg-gradient-radial from-black/30 to-transparent rounded-full blur-md" />
          <div className="absolute inset-0 w-6 h-2 bg-amber-400/20 rounded-full animate-pulse" />
        </div>

        {/* Heritage Keeper Aura */}
        <div className={cn(
          "absolute inset-0 bg-gradient-radial via-transparent to-transparent rounded-full animate-pulse",
          colors.aura
        )} />

        {/* Player Number Badge */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black/70 px-2 py-1 rounded-full">
          P{playerNumber}
        </div>

        {/* Current Player Ring */}
        {isCurrentPlayer && (
          <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-pulse" />
        )}
      </div>
    </div>
  );
};