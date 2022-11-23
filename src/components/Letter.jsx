import React, { useContext, useEffect } from "react";
import "./letter.css";
import { AppContext } from "../App";

const Letter = ({ letterPos, attempVal }) => {
  const { board, correctWord, currentAttempt, setDisabledLetters } =
    useContext(AppContext);
  const letter = board[attempVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;

  // console.log(correctWord[letterPos], "ddsds", letter);
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currentAttempt.attempt > attempVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prevValues) => [...prevValues, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
