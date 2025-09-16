import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Coffee, Star, BookOpen } from 'lucide-react';
import LandingPageAudio from '@/components/heritage-game/LandingPageAudio';
import HeritageModal from '@/components/heritage-game/HeritageModal';

const LandingPage = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [isHeritageModalOpen, setIsHeritageModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      navigate('/game', { 
        state: { 
          player1Name: player1Name.trim(), 
          player2Name: player2Name.trim() 
        } 
      });
    }
  };

  const teamMembers = ['Adjuy', 'Adisa', 'Thu Ba', 'Sohan'];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <LandingPageAudio />
      
      {/* Background with game map */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/game-bg/8846f789-2096-4a33-a877-ad2f1bc326b3.png)'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="flex justify-between items-start">
            {/* Left: Project Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">USK</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">USK</h3>
                  <p className="text-yellow-400 text-sm">Universitas Syiah Kuala</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">EBA</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">EBA</h3>
                  <p className="text-blue-500 text-sm">Evidence Based Approach</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SOI</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">SOI Asia</h3>
                  <p className="text-red-400 text-sm">School on Internet Asia</p>
                </div>
              </div>
            </div>

            {/* Right: Team Info */}
            <div className="text-right">
              <Badge variant="secondary" className="mb-2 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 text-xl">
                <Coffee className="w-7 h-7 mr-3" />
                Team - Tea Party
              </Badge>
              <div className="space-y-1 pl-5">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-end gap-2 pr-3">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-white text-xl font-medium">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md bg-black/80 border-yellow-600 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                PENJAGA WARISAN
              </CardTitle>
              <p className="text-yellow-200 mt-2">Gampong Pande Heritage Game</p>
              <div className="flex justify-center mt-4">
                <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                  EBA Field Work Project 2025
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="player1" className="text-yellow-200 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Player 1 Name
                  </Label>
                  <Input
                    id="player1"
                    type="text"
                    placeholder="Enter Player 1 name"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    className="bg-black/50 border-yellow-600 text-white placeholder-yellow-300/50 focus:border-yellow-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="player2" className="text-yellow-200 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Player 2 Name
                  </Label>
                  <Input
                    id="player2"
                    type="text"
                    placeholder="Enter Player 2 name"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    className="bg-black/50 border-yellow-600 text-white placeholder-yellow-300/50 focus:border-yellow-400"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleStartGame}
                  disabled={!player1Name.trim() || !player2Name.trim()}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Heritage Adventure
                </Button>
                
                <Button 
                  onClick={() => setIsHeritageModalOpen(true)}
                  variant="outline"
                  className="w-full border-2 border-yellow-500 bg-black/20 text-yellow-300 hover:bg-yellow-500/20 hover:text-yellow-200 font-semibold py-3 backdrop-blur-sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Discover Gampong Pande Heritage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-yellow-200/80 text-sm">
            Preserving the cultural heritage of Gampong Pande through interactive gameplay
          </p>
        </footer>
      </div>
      
      <HeritageModal 
        isOpen={isHeritageModalOpen} 
        onClose={() => setIsHeritageModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;