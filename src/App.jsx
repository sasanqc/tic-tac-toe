import { useState } from "react";
import NewGame from "./layouts/NewGame";
import Game from "./layouts/Game";

function App() {
  const [newGame, setNewGame] = useState(true);
  const [p1, setP1] = useState("x");
  const [via, setVia] = useState();

  const handleChangePlayer = (p) => {
    setP1(p);
  };
  const handleStartNewGame = (via) => {
    setNewGame(false);
    setVia(via);
  };
  return (
    <main className="home">
      {newGame ? (
        <NewGame
          onChangePlayer={handleChangePlayer}
          activePlayer={p1}
          onStartNewGame={handleStartNewGame}
        />
      ) : (
        <Game via={via} p1={p1} onQuit={() => setNewGame(true)} />
      )}
    </main>
  );
}

export default App;
