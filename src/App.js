import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import WinScreen from "./components/WinScreen";

const cardImages = [
  { src: "/img/charizard.png", matched: false },
  { src: "/img/dragonite.png", matched: false },
  { src: "/img/gengar.png", matched: false },
  { src: "/img/jigglypuff.png", matched: false },
  { src: "/img/mewtwo.png", matched: false },
  { src: "/img/pikachu.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  //Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //Handle choice
  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //Compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //Start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Check if all cards are matched
  useEffect(() => {
    if (mounted) {
      const allMatched = cards.every((card) => card.matched);
      if (allMatched) {
        setTimeout(() => {
          setHasWon(true);
        }, 700);
      }
    } else {
      setMounted(true);
    }
  }, [cards, mounted]);

  if (hasWon) {
    return <WinScreen shuffleCards={shuffleCards} setHasWon={setHasWon} />;
  } else {
    return (
      <div className="App">
        <h1>Pokémon Match!</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    );
  }
}

export default App;
