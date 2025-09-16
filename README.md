# Penjaga Warisan (Heritage Keepers)
## A Digital Board Game for Cultural Heritage Preservation Education

### 🌍 Project Context

This interactive digital board game was developed as part of the **SOI Asia Project - EBA (Evidence Based Approach)**, an international academic program hosted by **Universitas Syiah Kuala (USK)** in Banda Aceh, Indonesia. As the representative from **Bangladesh University of Engineering and Technology (BUET)**, I participated alongside delegates from various universities across Asia in this collaborative initiative. The project emerged from comprehensive fieldwork conducted in **Gampong Pande**, a historically significant archaeological site in Banda Aceh, during the 2025 EBA program.

### 🎯 Project Overview

**Penjaga Warisan** (Heritage Keepers) is an educational multiplayer board game designed to raise awareness about the preservation of Acehnese Islamic tombstones and cultural heritage. Through engaging gameplay mechanics, players learn about the historical significance of the ancient tombstones in Gampong Pande while understanding practical conservation methods and cultural knowledge.

The game transforms complex heritage preservation concepts into an accessible, competitive format that encourages learning through play, making it particularly effective for younger generations who will become future guardians of these invaluable cultural artifacts.

### 🏛️ Cultural Significance

Gampong Pande represents one of Southeast Asia's most important Islamic archaeological sites, containing tombstones dating back to the Lamuri Kingdom era. These artifacts showcase:
- Early Islamic settlement patterns in Southeast Asia
- Unique Acehnese artistic traditions blending Islamic and local motifs
- Historical records through Khat Thuluth calligraphy
- Gender distinctions in funerary art and architecture
- Evidence of Aceh's role in global Islamic trade networks

### 🎮 Game Mechanics

The game employs a dual-token system that reflects the two pillars of heritage preservation:

#### **Care Tokens** 🫶
Awarded for demonstrating practical preservation knowledge:
- Proper cleaning techniques for ancient stones
- Respectful visitor behaviors
- Community engagement in conservation efforts
- Protection methods against environmental damage

#### **Knowledge Tokens** 🧠
Earned through cultural and historical understanding:
- Identification of famous scholars buried in Gampong Pande
- Understanding of tombstone symbolism and calligraphy
- Recognition of architectural distinctions
- Comprehension of historical context and significance

### 🤖 AI Integration

The game leverages **OpenAI's GPT-4** to provide intelligent assessment of player responses to knowledge questions, allowing for:
- Natural language answer evaluation
- Contextual understanding beyond exact matching
- Educational feedback that enhances learning
- Adaptive difficulty based on player comprehension

### 🚀 Getting Started

#### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (comes with Node.js)
- **OpenAI API Key** - Required for AI-powered answer evaluation

#### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/penjaga-warisan-prototype.git
cd penjaga-warisan-prototype
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure OpenAI API Key:**

Open `src/components/heritage-game/GameBoard.tsx` and replace the placeholder API key on line 15:
```typescript
const client = new OpenAI({
  apiKey: "your-actual-openai-api-key-here",
  dangerouslyAllowBrowser: true
});
```

> ⚠️ **Security Note:** For production deployment, the API key should be stored securely in environment variables and accessed through a backend service rather than exposed in client-side code.

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to `http://localhost:5173` to play the game.

### 🎯 How to Play

1. **Two Player Competition**: The game is designed for two players competing to collect the most heritage tokens.

2. **Roll the Dice**: Players take turns rolling the dice to move across the board.

3. **Land on Tombstones**: When landing on special tombstone spaces, players choose between:
   - **Care Card Challenge**: Demonstrate preservation actions
   - **Knowledge Card Challenge**: Answer heritage questions

4. **Collect Tokens**: Successfully completing challenges awards tokens based on performance.

5. **Win Condition**: The player with the most combined Care and Knowledge tokens at the end wins!

### 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite for fast development
- **AI Integration**: OpenAI GPT-4 API
- **Audio System**: Web Audio API for immersive sound effects
- **State Management**: React hooks with functional components

### 📁 Project Structure

```
penjaga-warisan-prototype/
├── src/
│   ├── components/
│   │   ├── heritage-game/    # Game components
│   │   │   ├── GameBoard.tsx
│   │   │   ├── PlayerPawn.tsx
│   │   │   ├── AnimatedDice.tsx
│   │   │   ├── CardModal.tsx
│   │   │   └── ...
│   │   └── ui/               # Reusable UI components
│   ├── pages/
│   │   └── Index.tsx         # Main game page
│   └── main.tsx              # Application entry
├── public/
│   └── game-bg/              # Game assets
└── package.json
```

### 🎨 Visual Design

The game features a carefully crafted visual aesthetic that honors the cultural significance of the subject matter:
- Hand-drawn map style reminiscent of historical cartography
- Warm earth tones reflecting the archaeological site's atmosphere
- Islamic geometric patterns in UI elements
- Authentic representation of Acehnese tombstone designs

### 🤝 Academic Collaboration

This project represents the collaborative efforts of the SOI Asia EBA Program:

- **BUET Representative** (Author): Field research, game conceptualization, and technical implementation
- **USK Host Institution**: Program coordination, local expertise, and site access
- **International EBA Participants**: Cross-cultural perspectives from various Asian universities
- **Gampong Pande Community**: Cultural insights and preservation knowledge
- **SOI Asia Network**: Framework for international academic cooperation

### 📈 Impact and Future Development

The game serves multiple educational objectives:
- **Cultural Awareness**: Introducing younger generations to their heritage
- **Preservation Education**: Teaching practical conservation methods
- **Community Engagement**: Fostering local pride in cultural artifacts
- **International Cooperation**: Demonstrating successful academic collaboration

Future enhancements may include:
- Mobile application version for wider accessibility
- Additional heritage sites and expanded content
- Multiplayer online capabilities
- Educational curriculum integration
- Multi-language support (Bahasa Indonesia, Acehnese, Bengali)

### 📜 License

This project was developed for educational purposes as part of academic fieldwork. All cultural content and historical information are used with respect to the Gampong Pande community and in accordance with heritage preservation guidelines.

### 🙏 Acknowledgments

Special thanks to:
- **SOI Asia** for organizing the Evidence Based Approach (EBA) program
- **Universitas Syiah Kuala** for hosting the 2025 EBA program
- **Bangladesh University of Engineering and Technology (BUET)** for supporting my participation
- **Fellow EBA participants** from universities across Asia for their collaborative spirit
- The people of **Gampong Pande** for sharing their heritage
- Local archaeologists and historians who provided invaluable insights
- The Acehnese cultural preservation community

---

**Developed with dedication to preserving and celebrating the rich Islamic heritage of Aceh, Indonesia**

*For academic inquiries or collaboration opportunities, please contact the project team through the respective institutional channels.*