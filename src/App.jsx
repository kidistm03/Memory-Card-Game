function App() {
  return (
    <div className="app">

      <header>
        <h1>Memory Card Game</h1>

        <div>
          <p>Score: 0</p>
          <p>Best Score: 0</p>
        </div>
      </header>

      <main>
        <h2>Choose Difficulty</h2>

        <button>Easy</button>
        <button>Medium</button>
        <button>Hard</button>

        <div className="game-board">
          <div className="card">
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