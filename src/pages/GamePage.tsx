import React from 'react';
import { useLocation } from 'react-router-dom';
import { GameBoard } from '@/components/heritage-game/GameBoard';

interface GamePageState {
  player1Name: string;
  player2Name: string;
}

const GamePage = () => {
  const location = useLocation();
  const state = location.state as GamePageState;
  
  const player1Name = state?.player1Name || 'Player 1';
  const player2Name = state?.player2Name || 'Player 2';

  return <GameBoard player1Name={player1Name} player2Name={player2Name} />;
};

export default GamePage;