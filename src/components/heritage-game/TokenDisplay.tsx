import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, BookOpen } from 'lucide-react';

interface TokenDisplayProps {
  careTokens: number;
  knowledgeTokens: number;
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({ careTokens, knowledgeTokens }) => {
  const totalTokens = careTokens + knowledgeTokens;
  const balance = Math.abs(careTokens - knowledgeTokens);
  const isBalanced = balance <= 2;
  
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg text-primary">Heritage Guardian Tokens</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Care Tokens */}
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-semibold text-red-700">Care Tokens</span>
          </div>
          <Badge variant="destructive" className="text-lg px-3 py-1">
            {careTokens}
          </Badge>
        </div>
        
        {/* Knowledge Tokens */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-blue-700">Knowledge Tokens</span>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1 bg-blue-500 text-white">
            {knowledgeTokens}
          </Badge>
        </div>
        
        {/* Balance Indicator */}
        <div className={`p-3 rounded-lg border-2 transition-all duration-300 ${
          isBalanced 
            ? 'bg-green-50 border-green-300' 
            : 'bg-amber-50 border-amber-300'
        }`}>
          <div className="text-center">
            <p className="text-sm font-semibold mb-1">
              {isBalanced ? '🎉 Well Balanced Guardian!' : '⚖️ Keep Balancing'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isBalanced 
                ? 'You understand both care and knowledge are important!'
                : `Focus on ${careTokens < knowledgeTokens ? 'care' : 'knowledge'} to balance your heritage keeping`
              }
            </p>
          </div>
        </div>
        
        {/* Total Progress */}
        <div className="text-center p-2 bg-primary/10 rounded-lg">
          <p className="text-lg font-bold text-primary">
            Total Heritage Points: {totalTokens}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};