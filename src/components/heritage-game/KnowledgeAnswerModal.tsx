import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KnowledgeAnswerModalProps {
  isOpen: boolean;
  card: any;
  playerNumber: number;
  onSubmitAnswer: (answer: string) => void;
  isEvaluating?: boolean;
  evaluationResult?: {
    isCorrect: boolean;
    explanation: string;
    playerAnswer: string;
    correctAnswer: string;
  } | null;
  onComplete: () => void;
}

export const KnowledgeAnswerModal: React.FC<KnowledgeAnswerModalProps> = ({
  isOpen,
  card,
  playerNumber,
  onSubmitAnswer,
  isEvaluating = false,
  evaluationResult,
  onComplete
}) => {
  const [playerAnswer, setPlayerAnswer] = useState('');

  const handleSubmit = () => {
    if (playerAnswer.trim()) {
      onSubmitAnswer(playerAnswer);
    }
  };

  const resetAndClose = () => {
    setPlayerAnswer('');
    onComplete();
  };

  if (!card) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Knowledge Challenge
                </h2>
                <Badge variant="secondary" className="mt-1">
                  Player {playerNumber}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Points at stake</div>
              <div className="text-2xl font-bold text-blue-600">{card.tokens}</div>
            </div>
          </div>

          {/* Question */}
          <Card className="mb-6 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">Question:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">{card.question}</p>
            </CardContent>
          </Card>

          {/* Answer Input or Results */}
          {!evaluationResult ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Answer:
                </label>
                <Textarea
                  value={playerAnswer}
                  onChange={(e) => setPlayerAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[120px] resize-none border-2 border-blue-200 focus:border-blue-400"
                  disabled={isEvaluating}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!playerAnswer.trim() || isEvaluating}
                className={cn(
                  "w-full py-3 text-lg font-semibold",
                  "bg-gradient-to-r from-blue-500 to-indigo-600",
                  "hover:from-blue-600 hover:to-indigo-700",
                  isEvaluating && "animate-pulse"
                )}
              >
                {isEvaluating ? (
                  <>
                    <Brain className="w-5 h-5 mr-2 animate-spin" />
                    Guardian is evaluating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Answer
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Result Header */}
              <div className={cn(
                "flex items-center justify-center p-4 rounded-lg",
                evaluationResult.isCorrect 
                  ? "bg-green-100 border-2 border-green-300" 
                  : "bg-red-100 border-2 border-red-300"
              )}>
                {evaluationResult.isCorrect ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                    <span className="text-2xl font-bold text-green-700">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-red-600 mr-3" />
                    <span className="text-2xl font-bold text-red-700">Incorrect</span>
                  </>
                )}
              </div>

              {/* Answers Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-800">Your Answer:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{evaluationResult.playerAnswer}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Correct Answer:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{evaluationResult.correctAnswer}</p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Explanation */}
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-800">Guardian Evaluation:</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{evaluationResult.explanation}</p>
                </CardContent>
              </Card>

              {/* Points Earned */}
              <div className={cn(
                "text-center p-4 rounded-lg font-bold text-xl",
                evaluationResult.isCorrect 
                  ? "bg-green-50 text-green-700" 
                  : "bg-red-50 text-red-700"
              )}>
                {evaluationResult.isCorrect 
                  ? `+${card.tokens} points earned!` 
                  : "No points earned"}
              </div>

              <Button
                onClick={resetAndClose}
                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                Continue Game
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};