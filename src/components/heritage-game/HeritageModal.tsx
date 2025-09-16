import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface KnowledgeCard {
  question: string;
  answer: string;
  tokens: number;
}

const KNOWLEDGE_CARDS: KnowledgeCard[] = [
  {
    question: "Name one famous scholar buried in Gampong Pande.",
    answer: "Teungku Fakinah or others mentioned in the history",
    tokens: 1
  },
  {
    question: "What is the difference between a male and female tombstone in Aceh?",
    answer: "Male tombstones are usually bigger and sword-shaped; female ones are softer and rounder",
    tokens: 1
  },
  {
    question: "What is 'Jirat' in Acehnese tomb design?",
    answer: "The stone base where the tombstone stands",
    tokens: 1
  },
  {
    question: "What does 'khat Thuluth' mean in tombstone writing?",
    answer: "A flowing Arabic calligraphy style used in royal graves",
    tokens: 1
  },
  {
    question: "Why are tombstones important for understanding Acehnese Islamic history?",
    answer: "Because they show religion, art, royal lineage, and values from the past",
    tokens: 1
  },
  {
    question: "What is the function of a decorative border on tombstones?",
    answer: "To frame the inscription and enhance the visual impact",
    tokens: 1
  },
  {
    question: "What does the presence of Arabic poetry on tombstones show?",
    answer: "The deep Islamic influence in Acehnese culture",
    tokens: 1
  },
  {
    question: "What challenges do archaeologists face in preserving Gampong Pande?",
    answer: "Lack of funding, local awareness, and rapid city growth",
    tokens: 1
  },
  {
    question: "What is the historical significance of Lamuri inscriptions?",
    answer: "They provide early records of Islamic presence in Aceh",
    tokens: 1
  },
  {
    question: "How does Gampong Pande reflect Aceh's role in global Islamic history?",
    answer: "It shows early Islamic settlement, trade, and scholarship in Southeast Asia",
    tokens: 1
  }
];

interface HeritageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeritageModal: React.FC<HeritageModalProps> = ({ isOpen, onClose }) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleCard = (cardIndex: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardIndex)) {
        newSet.delete(cardIndex);
      } else {
        newSet.add(cardIndex);
      }
      return newSet;
    });
  };

  const resetAllCards = () => {
    setFlippedCards(new Set());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-gradient-to-br from-amber-900/95 to-orange-900/95 border-2 border-amber-600 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Heritage of Gampong Pande
          </DialogTitle>
          <p className="text-center text-yellow-200 mt-2 text-lg">
            Discover the rich cultural heritage through interactive knowledge cards
          </p>
        </DialogHeader>
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-yellow-300">Knowledge Cards</h3>
            <Button
              onClick={resetAllCards}
              variant="outline"
              size="sm"
              className="border-yellow-500 bg-black/20 text-yellow-300 hover:bg-yellow-500/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Cards
            </Button>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="ml-4">
              {KNOWLEDGE_CARDS.map((card, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-2">
                    <div 
                      className="relative w-full h-80 cursor-pointer perspective-1000"
                      onClick={() => toggleCard(index)}
                    >
                      <div 
                        className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
                          flippedCards.has(index) ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* Front Side - Question */}
                        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 border-2 border-emerald-400 shadow-xl p-6 flex flex-col justify-center">
                          <div className="text-center">
                            <div className="inline-block px-3 py-1 rounded-full text-xl font-semibold mb-4 bg-yellow-100 text-yellow-800">
                              Question Card
                            </div>
                            <h4 className="font-bold text-white mb-4 text-xl leading-tight">
                              {card.question}
                            </h4>
                            <div className="mt-6 text-sm text-emerald-100">
                              Click to reveal answer
                            </div>
                          </div>
                        </div>
                        
                        {/* Back Side - Answer */}
                        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-orange-600 to-red-700 rounded-xl shadow-xl border-2 border-orange-400 p-6 flex flex-col justify-center">
                          <div className="text-center">
                            <div className="inline-block px-3 py-1 rounded-full text-xl font-semibold mb-4 bg-yellow-100 text-yellow-800">
                              Answer Card
                            </div>
                            <p className="text-white text-xl leading-relaxed mb-4">
                              {card.answer}
                            </p>
                            <div className="mt-4 text-xs text-orange-100">
                              Click to flip back
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-yellow-500 bg-black/20 text-yellow-300 hover:bg-yellow-500/20" />
            <CarouselNext className="border-yellow-500 bg-black/20 text-yellow-300 hover:bg-yellow-500/20" />
          </Carousel>
          
          <div className="mt-8 text-center">
            <p className="text-yellow-200 text-sm">
              Use the arrows to navigate between cards, or click any card to flip and discover more about Gampong Pande's heritage
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeritageModal;