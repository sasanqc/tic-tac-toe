import { useState, useRef, useEffect } from "react";
import { checkWinner, findEmptyCell } from "../utils/game";
export const useGame = (p1, via) => {
  const [p1WinsNumber, setP1WinsNumber] = useState(0);
  const [p2WinsNumber, setP2WinsNumber] = useState(0);
  const [ties, setTies] = useState(0);
  const [data, setData] = useState([...Array(9).keys()].map((el) => ""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState("");
  const [showRestart, setShowRestart] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const cellsRef = useRef([]);

  const cpuPickCell = (data) => {
    // find a random empty cell
    const emptyCell = findEmptyCell(data);
    if (emptyCell) {
      cellsRef.current[emptyCell].changeCell();
    }
  };
  useEffect(() => {
    if (via === "cpu" && turn !== p1) {
      setTimeout(() => cpuPickCell(data), 1000);
    }
    return () => {};
  }, []);

  const handleChangeCell = (index) => {
    const temp = [...data];
    temp[index] = turn === "x" ? "x" : "o";
    const winner = checkWinner(temp);

    if (winner) {
      setTimeout(() => {
        setShowWinner(true);
      }, 500);

      setWinner(winner);

      if (winner === "x") {
        if (p1 === "x") {
          setP1WinsNumber((current) => current + 1);
        } else {
          setP2WinsNumber((current) => current + 1);
        }
      }

      if (winner === "o") {
        if (p1 === "x") {
          setP2WinsNumber((current) => current + 1);
        } else {
          setP1WinsNumber((current) => current + 1);
        }
      }
      setData(temp);
      return;
    }
    //game tied
    if (temp.join("").length === 9) {
      setWinner("");
      setShowWinner(true);
      setTies((current) => current + 1);
      setData(temp);
      return;
    }

    setData(temp);
    if (via === "cpu" && p1 === turn) {
      setTimeout(() => cpuPickCell(temp), 1000);
    }

    setTurn((current) => (current === "x" ? "o" : "x"));
  };
  const resetGame = () => {
    setData([...Array(9).keys()].map((el) => ""));
    setTurn("x");
    if (via === "cpu" && "x" !== p1) {
      setTimeout(() => cpuPickCell(data), 1000);
    }
  };
  const handleRestartGame = () => {
    resetGame();
    setShowRestart(false);
  };

  const handleNextRound = () => {
    resetGame();
    setShowWinner(false);
  };

  return {
    handleNextRound,
    handleRestartGame,
    handleChangeCell,
    setShowRestart,
    p1WinsNumber,
    p2WinsNumber,
    ties,
    winner,
    showRestart,
    showWinner,
    data,
    turn,
    cellsRef,
  };
};
