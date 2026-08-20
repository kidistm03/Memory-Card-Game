import { useState } from "react";
import "./App.css";
function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
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
          <div className="card" onClick={handleCardClick}>
            <h3>Pikachu</h3>
          </div>

          <div className="card">
            <h3>Bulbasaur</h3>
          </div>

          <div className="card">
            <h3>Charmander</h3>
          </div>

          <div className="card">
            <h3>Squirtle</h3>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;