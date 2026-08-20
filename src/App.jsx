import { useState } from "react";
import "./App.css";

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
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  function handleCardClick() {
    const newScore = score + 1;
    setScore(newScore);
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
