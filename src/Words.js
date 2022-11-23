import workBank from "./word-bank.txt";

export const defaultBoard = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWords = async () => {
  // const newSet = new Set()
  let wordsSet;
  let randomWord;
  await fetch(workBank)
    .then((res) => res.text())
    .then((data) => {
      const wordArray = data.split("\r\n");
      randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
      wordsSet = new Set(wordArray);
    });

  return { wordsSet, randomWord };
};
