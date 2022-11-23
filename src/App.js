import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { defaultBoard, generateWords } from "./Words";
import { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(defaultBoard);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  // const correctWord = "RIGHT";

  useEffect(() => {
    generateWords().then((words) => {
      console.log(words.randomWord);
      setWordSet(words.wordsSet);
      setCorrectWord(words.randomWord);
    });
  }, []);

  // console.log(generateWords());

  const onSelectLetter = (char) => {
    if (currentAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    //   console.log(newBoard);
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = char;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    //   console.log(newBoard);
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }
    console.log(wordSet.has(currentWord.toLowerCase()));

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPosition: 0,
      });
      console.log("yes");
    } else {
      alert("Word not found");
    }

    if (currentWord === correctWord.toUpperCase()) {
      setGameOver({ gameOver: true, guessWord: true });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessWord: false });
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="container">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
