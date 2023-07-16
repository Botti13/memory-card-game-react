import React from "react";
import "./WinScreen.css";

function WinScreen({ shuffleCards, setHasWon }) {
  const newGame = () => {
    setHasWon(false);
    shuffleCards();
  };

  return (
    <div className="winScreen">
      <h1>Congratulations, you caught 'em all!</h1>
      <img src="/img/pokeball.png" alt="pokeball" />
      <button onClick={newGame} className="winButton">
        New Game
      </button>
    </div>
  );
}

export default WinScreen;
