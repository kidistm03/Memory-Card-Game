import { useState, useEffect } from "react";
import "./App.css";
function getRandomIds(count) {
  const ids = [];

  while (ids.length < count) {
    const randomId = Math.floor(Math.random() * 898) + 1;

    if (!ids.includes(randomId)) {
      ids.push(randomId);
    }
  }

  return ids;
}
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
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
  function handleCardClick(id) {
    // The card was already clicked
    if (clickedIds.includes(id)) {
      if (score > bestScore) {
        setBestScore(score);
      }

      setScore(0);
      setClickedIds([]);
      setGameStatus("lost");
    }

    // This is a new card
    else {
      const newScore = score + 1;

      setScore(newScore);

      setClickedIds((prev) => [...prev, id]);

      setCards((prev) => shuffle([...prev]));

      if (newScore === cards.length) {
        setGameStatus("won");

        if (newScore > bestScore) {
          setBestScore(newScore);
        }
      }
    }
  }
  useEffect(() => {
    async function fetchPokemon() {
      setIsLoading(true);

      try {
        console.log("Fetching Pokémon...");
      } catch (error) {
        console.error("Failed to load Pokémon:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
    </div>
  );
}

export default App;
