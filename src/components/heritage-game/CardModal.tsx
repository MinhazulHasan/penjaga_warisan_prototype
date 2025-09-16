import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, BookOpen, Star, Sparkles, Award } from 'lucide-react';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: {
    type: 'care' | 'knowledge';
    title?: string;
    description?: string;
    action?: string;
    question?: string;
    answer?: string;
    tokens: number;
  } | null;
  onComplete: () => void;
  onUncomplete: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({ isOpen, onClose, card, onComplete, onUncomplete }) => {
  if (!card) return null;

  const isCareCard = card.type === 'care';

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const [showAnswer, setShowAnswer] = React.useState(false);
  const handleUncomplete = () => {
    onUncomplete();
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-gradient-to-br from-background via-card to-muted border-4 border-primary/20 shadow-2xl" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        {/* Remove close button */}
        <button
          className="absolute right-4 top-4 opacity-0 pointer-events-none"
          tabIndex={-1}
        />
        {/* Decorative Header Background */}
        <div className={`relative overflow-hidden ${isCareCard
          ? 'bg-gradient-to-r from-red-500/20 via-pink-500/20 to-rose-500/20'
          : 'bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20'
          }`}>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <DialogHeader className="relative p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className={`p-4 rounded-full ${isCareCard
                ? 'bg-gradient-to-br from-red-400 to-pink-500 shadow-lg shadow-red-500/30'
                : 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/30'
                } animate-pulse-glow`}>
                {isCareCard ? (
                  <Heart className="w-8 h-8 text-white fill-white" />
                ) : (
                  <BookOpen className="w-8 h-8 text-white" />
                )}
              </div>
            </div>

            <Badge
              className={`mb-4 text-sm px-4 py-2 ${isCareCard
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-300'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-300'
                } animate-fade-in shadow-lg`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isCareCard ? 'HERITAGE CARE CARD' : 'KNOWLEDGE CHALLENGE'}
            </Badge>

            <DialogTitle className={`text-3xl font-bold ${isCareCard ? 'text-red-700' : 'text-blue-700'
              } animate-fade-in`}>
              {isCareCard ? card.title : 'Test Your Knowledge'}
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-6">
          {isCareCard ? (
            <div className="space-y-6 animate-fade-in">
              {/* Description */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200/50 shadow-inner">
                <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Heritage Wisdom
                </h4>
                <p className="text-amber-700 leading-relaxed text-lg">{card.description}</p>
              </div>

              {/* Action Required */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200/50 shadow-inner">
                <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Your Mission
                </h4>
                <p className="text-emerald-700 leading-relaxed text-lg font-medium">{card.action}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Question */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50 shadow-inner">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Knowledge Challenge
                </h4>
                <p className="text-blue-700 leading-relaxed text-lg">{card.question}</p>
              </div>

              {/* Answer */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200/50 shadow-inner">

                {showAnswer ?
                  <>
                    <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Answer
                    </h4>
                    <p className="text-emerald-700 leading-relaxed text-lg font-medium">{card.answer}</p>
                  </>
                  :
                  <Button
                    variant="outline"
                    className="text-emerald-700 font-bold px-6 py-3 bg-gradient-to-r from-emerald-200 to-green-200 hover:from-emerald-300 hover:to-green-300 shadow-lg transition-all duration-300 animate-pulse-glow"
                    onClick={() => setShowAnswer(true)}
                  >
                    Reveal Answer
                  </Button>
                }
              </div>
            </div>
          )}

          {/* Reward Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 p-6 rounded-xl border border-primary/20 shadow-inner animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-primary to-primary-glow rounded-full shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg">Heritage Reward</h4>
                  <p className="text-muted-foreground">Complete this task to earn tokens</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-primary to-primary-glow text-white px-4 py-2 text-lg font-bold shadow-lg animate-pulse-glow">
                +{card.tokens} {card.tokens === 1 ? 'Token' : 'Tokens'}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center pt-4 space-y-4">
            <Button 
              onClick={handleComplete}
              size="lg"
              className={`w-full px-12 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105 ${
                isCareCard 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-red-500/30' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-blue-500/30'
              } text-white animate-pulse-glow`}
            >
              <Award className="w-5 h-5 mr-2" />
              Complete Heritage Task
            </Button>
            
            <Button 
              onClick={handleUncomplete}
              size="lg"
              variant="outline"
              className="w-full px-12 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105 border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Heart className="w-5 h-5 mr-2" />
              Uncomplete Heritage Task
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <Star className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </DialogContent>
    </Dialog>
  );
};