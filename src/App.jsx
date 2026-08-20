import { useState } from "react";
import "./App.css";

function App() {
  // All Pokémon cards
  const [cards, setCards] = useState([]);

  // IDs of cards already clicked in this round
  const [clickedIds, setClickedIds] = useState([]);

  // Current score
  const [score, setScore] = useState(0);

  // Highest score
  const [bestScore, setBestScore] = useState(0);

  // "playing" | "won" | "lost"
  const [gameStatus, setGameStatus] = useState("playing");

  // Used while Pokémon are loading
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
    </div>
  );
}

export default App;