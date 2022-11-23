import React, { useCallback, useEffect, useContext } from "react";
import "./keyboard.css";
import Key from "./Key";
import { AppContext } from "../App";

const Keyboard = () => {
  const key1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const key2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const key3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const { onDelete, onSelectLetter, onEnter, disabledLetters } =
    useContext(AppContext);

  const handleKeyboard = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        key1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        key2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        key3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [key1, key2, key3, onDelete, onEnter, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line-1">
        {key1.map((char, index) => {
          return (
            <Key
              char={char}
              key={index}
              disabled={disabledLetters.includes(char)}
            />
          );
        })}
      </div>
      <div className="line-2">
        {key2.map((char, index) => {
          return (
            <Key
              char={char}
              key={index}
              disabled={disabledLetters.includes(char)}
            />
          );
        })}
      </div>
      <div className="line-3">
        <Key char={"ENTER"} bigKey />
        {key3.map((char, index) => {
          return (
            <Key
              char={char}
              key={index}
              disabled={disabledLetters.includes(char)}
            />
          );
        })}
        <Key char={"DELETE"} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
