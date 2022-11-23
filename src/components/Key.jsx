import React, { useContext } from "react";
import "./key.css";
import { AppContext } from "../App";

const Key = ({ char, bigKey, disabled }) => {
  const { onDelete, onSelectLetter, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (char === "ENTER") {
      onEnter();
    } else if (char === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(char);
    }
  };

  return (
    <div
      className="key"
      id={bigKey ? "big" : disabled && "disabled"}
      onClick={selectLetter}
    >
      {char}
    </div>
  );
};

export default Key;
