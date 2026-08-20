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
  // Current difficulty
  const [difficulty, setDifficulty] = useState("medium");
  const cardCounts = {
  easy: 8,
  medium: 12,
  hard: 20,
};
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
  function handleCardClick(id) {
    // Don't allow clicks after winning
    if (gameStatus === "won") {
      return;
    }

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

      // Start playing again after a game over
      setGameStatus("playing");

      if (newScore > bestScore) {
        setBestScore(newScore);
      }

      if (newScore === cards.length) {
        setGameStatus("won");
      }
    }
  }
  useEffect(() => {
  async function fetchPokemon() {
    setIsLoading(true);

    // Reset the current game
    setScore(0);
    setClickedIds([]);
    setGameStatus("playing");

    try {
      // Get the number of cards for the selected difficulty
      const numberOfCards = cardCounts[difficulty];

      // Get random Pokémon IDs
      const ids = getRandomIds(numberOfCards);

      // Fetch all Pokémon
      const requests = ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      );

      const responses = await Promise.all(requests);

      // Convert responses to JSON
      const pokemonData = await Promise.all(
        responses.map((response) => response.json())
      );

      // Create the cards we need
      const pokemonCards = pokemonData.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image:
          pokemon.sprites.other["official-artwork"].front_default,
      }));

      setCards(pokemonCards);
    } catch (error) {
      console.error("Failed to load Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  }

  fetchPokemon();
}, [difficulty]);
  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <div className="difficulty">
  <p>Difficulty:</p>

  <button onClick={() => setDifficulty("easy")}>
    Easy
  </button>

  <button onClick={() => setDifficulty("medium")}>
    Medium
  </button>

  <button onClick={() => setDifficulty("hard")}>
    Hard
  </button>
</div>

      <div className="score-board">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      {/* to show win and lost messages  */}
      {gameStatus === "won" && <h2>You Won!</h2>}
      {gameStatus === "lost" && (
        <h2>Game Over! Click a card to start again.</h2>
      )}

      {isLoading ? (
        <h2>Loading Pokémon...</h2>
      ) : (
        <div className="game-board">
          {cards.map((card) => (
            <div
              key={card.id}
              className="card"
              onClick={() => handleCardClick(card.id)}
            >
              <img src={card.image} alt={card.name} />
              <h3>{card.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
