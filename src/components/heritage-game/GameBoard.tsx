import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TombstoneZone } from './TombstoneZone';
import { PlayerPawn } from './PlayerPawn';
import { CardModal } from './CardModal';
import { AnimatedDice } from './AnimatedDice';
import { PlayerTokenDisplay } from './PlayerTokenDisplay';
import { KnowledgeAnswerModal } from './KnowledgeAnswerModal';
import { GameAudio, playMovementSound } from './GameAudio';
import { Users, Trophy } from 'lucide-react';
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-xxxxxxxxxxxxxx",
  dangerouslyAllowBrowser: true
});

interface PlayerState {
  position: number;
  careTokens: number;
  knowledgeTokens: number;
}

interface GameState {
  currentPlayer: 1 | 2;
  players: [PlayerState, PlayerState];
  diceValue: number;
  currentCard: any;
  gamePhase: 'roll' | 'move' | 'draw' | 'card' | 'knowledge-answer';
  isCardModalOpen: boolean;
  isKnowledgeModalOpen: boolean;
  isEvaluatingAnswer: boolean;
  evaluationResult: any;
  isBackgroundMuted: boolean;
}

// Updated positions based on the professional map
const BOARD_POSITIONS = [
  // Starting from bottom left, following the path
  { x: 15, y: 85, type: 'start' },
  { x: 34, y: 85, type: 'tombstone' },
  { x: 32.5, y: 74, type: 'normal' },
  { x: 27.5, y: 68, type: 'normal' },
  { x: 28, y: 53, type: 'tombstone' },
  { x: 27.5, y: 41, type: 'normal' },
  { x: 44, y: 41, type: 'tombstone' },
  { x: 48, y: 57, type: 'normal' },
  { x: 53, y: 69, type: 'tombstone' },
  { x: 51, y: 80, type: 'normal' },
  { x: 62, y: 80, type: 'tombstone' },
  { x: 62, y: 80, type: 'tombstone' },
  { x: 66, y: 70, type: 'normal' },
  { x: 73.5, y: 55, type: 'normal' },
  { x: 85, y: 40, type: 'tombstone' },
  { x: 69, y: 27, type: 'normal' },
  { x: 90, y: 13, type: 'tombstone' },
];

const CARE_CARDS = [
  {
    title: "Clean with Care",
    description: "Use a soft brush and water to gently clean tombstones",
    action: "Perform gentle cleaning motion",
    tokens: 1
  },
  {
    title: "Don't Use Tombstones to Sharpen Blades",
    description: "This damages the stone and disrespects the dead",
    action: "Promise to educate others",
    tokens: 1
  },
  {
    title: "No Climbing",
    description: "Never step or sit on a tombstone",
    action: "Show respectful visiting posture",
    tokens: 1
  },
  {
    title: "Plant Trees Nearby",
    description: "Provide shade, but not too close to cause root damage",
    action: "Plant tree at safe distance",
    tokens: 1
  },
  {
    title: "Report Damages",
    description: "Tell a local leader if a tombstone is broken or missing",
    action: "Report issue immediately",
    tokens: 1
  },
  {
    title: "Don’t Paint or Scratch",
    description: "Never write or paint on tombstones",
    action: "Avoid defacing stones",
    tokens: 1
  },
  {
    title: "Respect the Space",
    description: "Be quiet and peaceful when near tombs",
    action: "Practice silence and respect",
    tokens: 1
  },
  {
    title: "Teach the Young",
    description: "Tell children about the value of heritage",
    action: "Share cultural lessons",
    tokens: 1
  },
  {
    title: "Join a Cleaning Day",
    description: "Help during community clean-up events",
    action: "Participate actively",
    tokens: 1
  },
  {
    title: "Take Only Pictures",
    description: "Never remove stones or artifacts",
    action: "Capture memories respectfully",
    tokens: 1
  },
  {
    title: "Share Stories",
    description: "Ask elders about who is buried and share their stories",
    action: "Record and retell heritage",
    tokens: 1
  },
  {
    title: "Support Heritage Laws",
    description: "Follow and support rules for preservation",
    action: "Comply with heritage policies",
    tokens: 1
  },
  {
    title: "Use Technology",
    description: "Take digital photos and share history online",
    action: "Document heritage digitally",
    tokens: 1
  },
  {
    title: "Cover with Tarp in Rain",
    description: "Temporarily protect exposed tombs during floods",
    action: "Apply tarp during rainfall",
    tokens: 1
  },
  {
    title: "No Heavy Construction Nearby",
    description: "Avoid building too close to ancient tombs",
    action: "Respect safe distance rules",
    tokens: 1
  },
  {
    title: "Create Awareness Posters",
    description: "Make signs to remind others about respecting graves",
    action: "Design and display posters",
    tokens: 1
  }
];


const KNOWLEDGE_CARDS = [
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
    question: "What is “Jirat” in Acehnese tomb design?",
    answer: "The stone base where the tombstone stands",
    tokens: 1
  },
  {
    question: "What does “khat Thuluth” mean in tombstone writing?",
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
    question: "How does Gampong Pande reflect Aceh’s role in global Islamic history?",
    answer: "It shows early Islamic settlement, trade, and scholarship in Southeast Asia",
    tokens: 1
  }
];


interface GameBoardProps {
  player1Name?: string;
  player2Name?: string;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  player1Name = "Player 1", 
  player2Name = "Player 2" 
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 1,
    players: [
      { position: 0, careTokens: 0, knowledgeTokens: 0 },
      { position: 0, careTokens: 0, knowledgeTokens: 0 }
    ],
    diceValue: 0,
    currentCard: null,
    gamePhase: 'roll',
    isCardModalOpen: false,
    isKnowledgeModalOpen: false,
    isEvaluatingAnswer: false,
    evaluationResult: null,
    isBackgroundMuted: false
  });

  const rollDice = (roll: number) => {
    setGameState(prev => ({
      ...prev,
      diceValue: roll,
      gamePhase: 'move'
    }));
  };

  const movePlayer = () => {
    const currentPlayerIndex = gameState.currentPlayer - 1;
    const newPosition = Math.min(
      gameState.players[currentPlayerIndex].position + gameState.diceValue,
      BOARD_POSITIONS.length - 1
    );
    const landedPosition = BOARD_POSITIONS[newPosition];
    
    // Play movement sound
    playMovementSound();

    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, index) =>
        index === currentPlayerIndex
          ? { ...player, position: newPosition }
          : player
      ) as [PlayerState, PlayerState],
      gamePhase: landedPosition.type === 'tombstone' ? 'draw' : 'roll'
    }));

    // Switch to next player if not on tombstone
    if (landedPosition.type !== 'tombstone') {
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentPlayer: prev.currentPlayer === 1 ? 2 : 1
        }));
      }, 1000);
    }
  };

  const drawCard = (cardType: 'care' | 'knowledge') => {
    const cards = cardType === 'care' ? CARE_CARDS : KNOWLEDGE_CARDS;
    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    setGameState(prev => ({
      ...prev,
      currentCard: { ...randomCard, type: cardType },
      gamePhase: cardType === 'knowledge' ? 'knowledge-answer' : 'card',
      isCardModalOpen: cardType === 'care',
      isKnowledgeModalOpen: cardType === 'knowledge'
    }));
  };

  const completeCard = () => {
    if (!gameState.currentCard) return;

    const currentPlayerIndex = gameState.currentPlayer - 1;
    const tokensToAdd = gameState.currentCard.tokens;

    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, index) =>
        index === currentPlayerIndex ? {
          ...player,
          careTokens: player.careTokens + (prev.currentCard.type === 'care' ? tokensToAdd : 0),
          knowledgeTokens: player.knowledgeTokens + (prev.currentCard.type === 'knowledge' ? tokensToAdd : 0)
        } : player
      ) as [PlayerState, PlayerState],
      currentCard: null,
      gamePhase: 'roll',
      isCardModalOpen: false,
      currentPlayer: prev.currentPlayer === 1 ? 2 : 1
    }));
  };

  const uncompleteCard = () => {
    if (!gameState.currentCard) return;

    const currentPlayerIndex = gameState.currentPlayer - 1;
    const penalty = Math.ceil(gameState.currentCard.tokens / 2);

    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, index) =>
        index === currentPlayerIndex ? {
          ...player,
          careTokens: Math.max(0, player.careTokens - (prev.currentCard.type === 'care' ? penalty : 0)),
          knowledgeTokens: Math.max(0, player.knowledgeTokens - (prev.currentCard.type === 'knowledge' ? penalty : 0))
        } : player
      ) as [PlayerState, PlayerState],
      currentCard: null,
      gamePhase: 'roll',
      isCardModalOpen: false,
      currentPlayer: prev.currentPlayer === 1 ? 2 : 1
    }));
  };


  const submitAnswer = async (answer: string) => {
    if (!gameState.currentCard) return;

    // mark evaluation in progress
    setGameState(prev => ({ ...prev, isEvaluatingAnswer: true }));

    const question = gameState.currentCard.question;
    const playerAnswer = answer;
    const correctAnswer = gameState.currentCard.answer;

    const prompt = `You are an expert judge evaluating answers to heritage and cultural questions.

  Question: "${question}"
  Student's Answer: "${playerAnswer}"
  Official Answer: "${correctAnswer}"

  Please evaluate if the student's answer is correct or demonstrates sufficient understanding. Be reasonable - accept answers that convey the same meaning even if not word-for-word identical. Consider partially correct answer as a right answer as well.

  YOU ARE BOUND TO Respond with a JSON object containing:
  {
    "isCorrect": boolean,
    "explanation": "A brief explanation of why the answer is correct/incorrect and what makes a good answer"
  }
    
  STRICT COMPLIANCE: Adhere strictly to this format. Ensure valid JSON syntax without extra characters, comments, or formatting errors.
  NEVER EVER GIVE ME ANY UNWANTED WORDS LIKE json or SYMBOL 3 Backtick
  `;

    console.log("AI Evaluation Prompt:", prompt);

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      });

      const resultStr = completion.choices[0].message.content;
      let result: { isCorrect: boolean; explanation: string };

      try {
        result = JSON.parse(resultStr);
      } catch (e) {
        throw new Error("AI did not return valid JSON: " + resultStr);
      }

      const { isCorrect, explanation } = result;

      setGameState(prev => ({
        ...prev,
        isEvaluatingAnswer: false, // ✅ stop evaluating
        evaluationResult: {
          isCorrect,
          explanation,
          playerAnswer,
          correctAnswer
        }
      }));
    } catch (error) {
      console.error("Error evaluating answer:", error);
      setGameState(prev => ({
        ...prev,
        isEvaluatingAnswer: false, // ✅ stop evaluating
        evaluationResult: {
          isCorrect: false,
          explanation: "Error evaluating answer. Please try again.",
          playerAnswer: answer,
          correctAnswer
        }
      }));
    }
  };



  const completeKnowledgeCard = () => {
    if (!gameState.evaluationResult) return;

    const currentPlayerIndex = gameState.currentPlayer - 1;
    const tokensToAdd = gameState.evaluationResult.isCorrect ? gameState.currentCard.tokens : 0;

    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, index) =>
        index === currentPlayerIndex ? {
          ...player,
          knowledgeTokens: player.knowledgeTokens + tokensToAdd
        } : player
      ) as [PlayerState, PlayerState],
      currentCard: null,
      gamePhase: 'roll',
      isKnowledgeModalOpen: false,
      evaluationResult: null,
      currentPlayer: prev.currentPlayer === 1 ? 2 : 1
    }));
  };

  const restartGame = () => {
    setGameState({
      currentPlayer: 1,
      players: [
        { position: 0, careTokens: 0, knowledgeTokens: 0 },
        { position: 0, careTokens: 0, knowledgeTokens: 0 }
      ],
      diceValue: 0,
      currentCard: null,
      gamePhase: 'roll',
      isCardModalOpen: false,
      isKnowledgeModalOpen: false,
      isEvaluatingAnswer: false,
      evaluationResult: null,
      isBackgroundMuted: false
    });
  };

  const closeCardModal = () => {
    setGameState(prev => ({
      ...prev,
      isCardModalOpen: false
    }));
  };

  const toggleBackgroundMusic = () => {
    setGameState(prev => ({
      ...prev,
      isBackgroundMuted: !prev.isBackgroundMuted
    }));
  };

  const getCurrentPlayer = () => gameState.players[gameState.currentPlayer - 1];
  const getWinner = () => {
    const player1Total = gameState.players[0].careTokens + gameState.players[0].knowledgeTokens;
    const player2Total = gameState.players[1].careTokens + gameState.players[1].knowledgeTokens;

    if (player1Total === player2Total) return null;
    return player1Total > player2Total ? 1 : 2;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-card p-4 relative">
      {/* Audio Controls - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <GameAudio 
          isBackgroundMuted={gameState.isBackgroundMuted}
          onBackgroundMuteToggle={toggleBackgroundMusic}
        />
      </div>

      {/* Header */}
      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-4xl font-bold text-primary mb-2">PENJAGA WARISAN</h1>
        <p className="text-xl text-muted-foreground">Heritage Keepers • Gampong Pande 2025</p>
        <div className="flex items-center justify-center mt-3 space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold text-primary">Multiplayer Competition</span>
          <Trophy className="w-5 h-5 text-amber-500" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] relative overflow-hidden border-4 border-amber-600/50 shadow-2xl bg-amber-50">
            {/* Professional Map Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/game-bg/982b5d99-46fc-4dcb-a9f8-905e6af7bb49.png')`,
                filter: 'brightness(1.1) contrast(1.05)'
              }}
            />

            {/* Overlay for better visibility */}
            <div className="absolute inset-0 bg-black/5" />

            {/* Elegant Border Frame */}
            <div className="absolute inset-4 border-4 border-amber-700/40 rounded-lg shadow-inner"
              style={{
                background: 'linear-gradient(45deg, transparent 49%, rgba(139, 69, 19, 0.1) 50%, transparent 51%)',
                backgroundSize: '20px 20px'
              }} />

            {/* Corner Decorations */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-amber-700/60 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-amber-700/60 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-amber-700/60 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-amber-700/60 rounded-br-lg" />

            {/* SVG Path for board positions */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="roughPaper">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                  <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="1">
                    <feDistantLight azimuth="45" elevation="60" />
                  </feDiffuseLighting>
                </filter>
              </defs>

              {/* Multiple rough strokes for hand-drawn effect - skipping first position */}
              {[...Array(3)].map((_, strokeIndex) => (
                <path
                  key={strokeIndex}
                  d={BOARD_POSITIONS.slice(1).reduce((acc, p, i) => {
                    if (i === 0) {
                      return `M ${p.x + (Math.random() * 0.3 - 0.15)},${p.y + (Math.random() * 0.3 - 0.15)}`;
                    }
                    const prev = BOARD_POSITIONS.slice(1)[i - 1];
                    const midX = (prev.x + p.x) / 2;
                    const midY = (prev.y + p.y) / 2;

                    // Add hand-drawn wobble
                    const wobbleX = Math.sin(i * 0.5) * 0.2 + (Math.random() * 0.4 - 0.2);
                    const wobbleY = Math.cos(i * 0.7) * 0.2 + (Math.random() * 0.4 - 0.2);

                    return acc + ` Q ${midX + wobbleX},${midY + wobbleY} ${p.x + (Math.random() * 0.3 - 0.15)},${p.y + (Math.random() * 0.3 - 0.15)}`;
                  }, "")}
                  fill="none"
                  stroke={strokeIndex === 0 ? "#e9ba35" : strokeIndex === 1 ? "#e9ba35" : "#e9ba35"}
                  strokeWidth={strokeIndex === 0 ? "0.8" : strokeIndex === 1 ? "0.6" : "0.4"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={strokeIndex === 0 ? "0.7" : strokeIndex === 1 ? "0.5" : "0.3"}
                />
              ))}

              {/* Sketchy crosshatch effect at each position */}
              {BOARD_POSITIONS.slice(1).map((pos, i) => (
                <g key={i}>
                  {/* Small sketchy marks */}
                  <line
                    x1={pos.x - 0.5}
                    y1={pos.y - 0.5}
                    x2={pos.x + 0.5}
                    y2={pos.y + 0.5}
                    stroke="#e9ba35"
                    strokeWidth="0.2"
                    opacity="0.4"
                  />
                  <line
                    x1={pos.x + 0.5}
                    y1={pos.y - 0.5}
                    x2={pos.x - 0.5}
                    y2={pos.y + 0.5}
                    stroke="#e9ba35"
                    strokeWidth="0.2"
                    opacity="0.4"
                  />
                </g>
              ))}

              {/* Rough pencil-like texture overlay */}
              <path
                d={BOARD_POSITIONS.slice(1).map((p, i) => {
                  const jitter = () => Math.random() * 0.15 - 0.075;
                  return i === 0
                    ? `M ${p.x + jitter()},${p.y + jitter()}`
                    : `L ${p.x + jitter()},${p.y + jitter()}`;
                }).join(" ")}
                fill="none"
                stroke="#3e2f1f"
                strokeWidth="0.3"
                strokeLinecap="round"
                strokeDasharray="0.5 0.8 0.2 0.6 0.4 0.9"
                opacity="0.6"
              />
            </svg>

            {/* Positions */}
            {BOARD_POSITIONS.map((position, index) => (
              <div key={index}>
                {position.type === 'tombstone' ? (
                  <TombstoneZone
                    x={position.x}
                    y={position.y}
                    isActive={getCurrentPlayer().position === index && gameState.gamePhase === 'draw'}
                    onClick={() => gameState.gamePhase === 'draw' && setGameState(prev => ({ ...prev, gamePhase: 'draw' }))}
                  />
                ) : (
                  <div
                    className="absolute w-4 h-4 bg-secondary rounded-full border-2 border-secondary-foreground/30 shadow-lg"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                )}
              </div>
            ))}

            {/* Player Pawns */}
            {gameState.players.map((player, index) => (
              <PlayerPawn
                key={index}
                x={BOARD_POSITIONS[player.position].x}
                y={BOARD_POSITIONS[player.position].y}
                playerNumber={index + 1}
                isCurrentPlayer={gameState.currentPlayer === index + 1}
              />
            ))}
          </Card>
        </div>

        {/* Player Stats and Game Controls */}
        <div className="space-y-4">
          {/* Player 1 */}
          <PlayerTokenDisplay
            careTokens={gameState.players[0].careTokens}
            knowledgeTokens={gameState.players[0].knowledgeTokens}
            playerNumber={1}
            playerName={player1Name}
            isCurrentPlayer={gameState.currentPlayer === 1}
          />

          {/* Player 2 */}
          <PlayerTokenDisplay
            careTokens={gameState.players[1].careTokens}
            knowledgeTokens={gameState.players[1].knowledgeTokens}
            playerNumber={2}
            playerName={player2Name}
            isCurrentPlayer={gameState.currentPlayer === 2}
          />
        </div>

        <div className="space-y-4">
          <Card className="border-2 border-destructive/20">
            <CardHeader className="text-center">
              <CardTitle className="text-primary">Wanna Reset?</CardTitle>
              <CardDescription>Reset the competition</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={restartGame}
                variant="destructive"
                className="w-full"
              >
                New Game
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-primary">Game Control</CardTitle>
              <CardDescription>
                {gameState.currentPlayer === 1 ? player1Name : player2Name}'s Turn
                {getWinner() && (
                  <div className="mt-2 text-lg font-bold text-amber-600">
                    🏆 {getWinner() === 1 ? player1Name : player2Name} Wins!
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {gameState.gamePhase === 'roll' && (
                <AnimatedDice
                  onRoll={rollDice}
                  disabled={false}
                />
              )}

              {gameState.gamePhase === 'move' && (
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-primary">Rolled: {gameState.diceValue}</p>
                  <Button onClick={movePlayer} className="w-full">
                    Move {gameState.currentPlayer === 1 ? player1Name : player2Name}
                  </Button>
                </div>
              )}

              {gameState.gamePhase === 'draw' && (
                <div className="space-y-2">
                  <p className="text-center text-primary font-semibold">Choose Your Challenge!</p>
                  <Button onClick={() => drawCard('care')} variant="outline" className="w-full">
                    🫶 Draw Care Card
                  </Button>
                  <Button onClick={() => drawCard('knowledge')} variant="outline" className="w-full">
                    🧠 Draw Knowledge Card
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        <CardModal
          isOpen={gameState.isCardModalOpen}
          onClose={closeCardModal}
          card={gameState.currentCard}
          onComplete={completeCard}
          onUncomplete={uncompleteCard}
        />

        <KnowledgeAnswerModal
          isOpen={gameState.isKnowledgeModalOpen}
          card={gameState.currentCard}
          playerNumber={gameState.currentPlayer}
          onSubmitAnswer={submitAnswer}
          isEvaluating={gameState.isEvaluatingAnswer}
          evaluationResult={gameState.evaluationResult}
          onComplete={completeKnowledgeCard}
        />
      </div>
    </div>
  );
};