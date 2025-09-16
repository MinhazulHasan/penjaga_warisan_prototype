import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PlayerTokenDisplayProps {
  careTokens: number;
  knowledgeTokens: number;
  playerNumber: number;
  playerName?: string;
  isCurrentPlayer: boolean;
}

export const PlayerTokenDisplay: React.FC<PlayerTokenDisplayProps> = ({
  careTokens,
  knowledgeTokens,
  playerNumber,
  playerName,
  isCurrentPlayer
}) => {
  return (
    <Card className={cn(
      "border-2 transition-all duration-300",
      isCurrentPlayer 
        ? "border-primary shadow-lg ring-2 ring-primary/20" 
        : "border-muted"
    )}>
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <Badge 
            variant={isCurrentPlayer ? "default" : "secondary"}
            className="text-sm font-bold"
          >
            {playerName || `Player ${playerNumber}`}
          </Badge>
          {isCurrentPlayer && (
            <div className="text-xs text-primary font-semibold mt-1 animate-pulse">
              Current Turn
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Care Card */}
          <div className="relative">
            <div className={cn(
              "w-full h-24 rounded-lg border-2 border-red-300",
              "bg-gradient-to-br from-red-100 to-red-200",
              "flex items-center justify-center",
              "shadow-lg hover:shadow-xl transition-all duration-300"
            )}>
              <div className="text-center">
                <div className="text-xs font-semibold text-red-800 mb-1">CARE</div>
                <div className="text-2xl font-bold text-red-700">{careTokens}</div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">♥</span>
            </div>
          </div>

          {/* Knowledge Card */}
          <div className="relative">
            <div className={cn(
              "w-full h-24 rounded-lg border-2 border-blue-300",
              "bg-gradient-to-br from-blue-100 to-blue-200",
              "flex items-center justify-center",
              "shadow-lg hover:shadow-xl transition-all duration-300"
            )}>
              <div className="text-center">
                <div className="text-xs font-semibold text-blue-800 mb-1">KNOWLEDGE</div>
                <div className="text-2xl font-bold text-blue-700">{knowledgeTokens}</div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">🧠</span>
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <div className="text-sm font-semibold text-muted-foreground">
            Total: {careTokens + knowledgeTokens} points
          </div>
        </div>
      </CardContent>
    </Card>
  );
};