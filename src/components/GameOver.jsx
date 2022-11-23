import React, { useContext } from "react";
import { AppContext } from "../App";
import "./gameOver.css";

function GameOver() {
  const { gameOver, correctWord, currentAttempt } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h2>{gameOver.guessWord ? "You Correctly guessed!" : "You failed!"}</h2>
      <h3>Correct word: {correctWord}</h3>
      {gameOver.guessWord && (
        <h3>You guessed in {currentAttempt.attempt} attempts.</h3>
      )}
    </div>
  );
}

export default GameOver;
