import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, BookOpen } from 'lucide-react';

interface GameCardProps {
  card: {
    type: 'care' | 'knowledge';
    title?: string;
    description?: string;
    action?: string;
    question?: string;
    answer?: string;
    tokens: number;
  };
  onComplete: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ card, onComplete }) => {
  const isCareCard = card.type === 'care';
  
  return (
    <Card className={`border-2 animate-scale-in ${
      isCareCard 
        ? 'border-red-300 bg-gradient-to-br from-red-50 to-pink-50' 
        : 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50'
    }`}>
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          {isCareCard ? (
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          ) : (
            <BookOpen className="w-6 h-6 text-blue-500" />
          )}
          <Badge variant={isCareCard ? "destructive" : "default"} className="text-xs">
            {isCareCard ? 'CARE CARD' : 'KNOWLEDGE CARD'}
          </Badge>
        </div>
        
        {isCareCard ? (
          <CardTitle className="text-lg text-red-700">{card.title}</CardTitle>
        ) : (
          <CardTitle className="text-lg text-blue-700">Knowledge Challenge</CardTitle>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isCareCard ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">{card.description}</p>
            <div className="bg-amber-100 p-3 rounded-lg border border-amber-200">
              <p className="text-sm font-semibold text-amber-800">Action Required:</p>
              <p className="text-sm text-amber-700">{card.action}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-800">Question:</p>
              <p className="text-sm text-blue-700">{card.question}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg border border-green-200">
              <p className="text-sm font-semibold text-green-800">Answer:</p>
              <p className="text-sm text-green-700">{card.answer}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">Reward:</span>
            <Badge variant="outline" className="text-primary">
              {card.tokens} {card.tokens === 1 ? 'Token' : 'Tokens'}
            </Badge>
          </div>
          
          <Button 
            onClick={onComplete}
            size="sm"
            className={`${
              isCareCard 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};