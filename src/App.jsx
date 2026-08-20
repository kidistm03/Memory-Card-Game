import { useState } from "react";
import "./App.css";

// Our card data
const cards = [
  {
    id: 1,
    name: "Pikachu",
  },
  {
    id: 2,
    name: "Bulbasaur",
  },
  {
    id: 3,
    name: "Charmander",
  },
  {
    id: 4,
    name: "Squirtle",
  },
  {
    id: 5,
    name: "Eevee",
  },
  {
    id: 6,
    name: "Jigglypuff",
  },
  {
    id: 7,
    name: "Meowth",
  },
  {
    id: 8,
    name: "Psyduck",
  },
];

function App() {
  // Score
  const [score, setScore] = useState(0);

  // Highest score
  const [bestScore, setBestScore] = useState(0);
  // Cards that the player has already clicked
  const [clickedCards, setClickedCards] = useState([]);
  // create game card -Cards currently displayed
  const [gameCards, setGameCards] = useState(cards);

  // Runs when a card is clicked
  function handleCardClick(cardId) {
    // Check if this card was already clicked
    if (clickedCards.includes(cardId)) {
      console.log("Game Over!");
      return;
    }

    // Increase score
    const newScore = score + 1;
    setScore(newScore);

    // Add the clicked card to our clicked cards
    setClickedCards([...clickedCards, cardId]);

    // Update best score
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Memory Card Game</h1>

        <div>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>

      <main>
        <h2>Choose Difficulty</h2>

        <button>Easy</button>
        <button>Medium</button>
        <button>Hard</button>

        <div className="game-board">
          {cards.map((card) => (
            <div
              className="card"
              key={card.id}
              onClick={() => handleCardClick(card.id)}
            >
              <h3>{card.name}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
