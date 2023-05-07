import React, { Fragment, useState } from "react";
import { ReactComponent as OIcon } from "../assets/icons/icon-o.svg";
import { ReactComponent as XIcon } from "../assets/icons/icon-x.svg";
import { ReactComponent as PathIcon } from "../assets/icons/icon-path.svg";
import GameCell from "../components/GameCell";
import Modal from "../layouts/Modal";
import RestarGame from "../components/RestarGame";
import { checkWinner } from "../utils/game";
import Winner from "../components/Winner";

const Game = ({ via, p1, onQuit }) => {
  const [p1WinsNumber, setP1WinsNumber] = useState(0);
  const [p2WinsNumber, setP2WinsNumber] = useState(0);
  const [ties, setTies] = useState(0);
  const [game, setGame] = useState([...Array(9).keys()].map((el) => ""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState("");
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const handleChangeCell = (index) => {
    const temp = [...game];
    temp[index] = turn === "x" ? "x" : "o";

    const winner = checkWinner(temp);

    if (winner) {
      setShowWinnerModal(true);
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
    }

    if (temp.join("").length === 9) {
      setWinner("");
      setShowWinnerModal(true);
      setTies((current) => current + 1);
    }

    setGame(temp);
    setTurn((current) => (current === "x" ? "o" : "x"));
  };

  const handleRestartGame = () => {
    setGame([...Array(9).keys()].map((el) => ""));
    setTurn("x");
    setShowRestartModal(false);
  };

  const handleNextRound = () => {
    setGame([...Array(9).keys()].map((el) => ""));
    setTurn("x");
    setShowWinnerModal(false);
  };

  return (
    <Fragment>
      {showRestartModal && (
        <Modal onBackdropClicked={() => {}}>
          <RestarGame
            onCancel={() => setShowRestartModal(false)}
            onRestart={handleRestartGame}
          />
        </Modal>
      )}
      {showWinnerModal && (
        <Modal onBackdropClicked={() => {}}>
          <Winner
            onNextRound={handleNextRound}
            onQuit={onQuit}
            winner={winner}
            p1={p1}
          />
        </Modal>
      )}
      <article className="game">
        <div className="game__header">
          <div className="game__icons">
            <XIcon className="icon--m icon--primary" />
            <OIcon className="icon--m icon--secondary" />
          </div>
          <div className="wrapper--s wrapper--dark">
            <p className="heading--xs heading--light-2 game__turnText">
              <span>
                {turn === "x" ? (
                  <XIcon className="icon--s icon--light" />
                ) : (
                  <OIcon className="icon--s icon--light" />
                )}
              </span>
              turn
            </p>
          </div>
          <button
            className="btn--s btn--light"
            onClick={() => setShowRestartModal(true)}
          >
            <PathIcon className="icon--s icon--dark" />
          </button>
        </div>
        {game.map((el, index) => (
          <GameCell
            player={el}
            key={index}
            turn={turn}
            handleChangeCell={() => handleChangeCell(index)}
          />
        ))}

        <div className="game__status--primary">
          <p className="body--dark">{`X (${p1 === "x" ? "P1" : "P2"})`}</p>
          <p className="heading--m">
            {p1 === "x" ? p1WinsNumber : p2WinsNumber}
          </p>
        </div>
        <div className=" game__status--light">
          <p className="body--dark">TIES</p>
          <p className="heading--m">{ties}</p>
        </div>
        <div className="game__status--secondary">
          <p className="body--dark">{`O (${p1 === "x" ? "P2" : "P1"})`}</p>
          <p className="heading--m">
            {p1 === "x" ? p2WinsNumber : p1WinsNumber}
          </p>
        </div>
      </article>
    </Fragment>
  );
};

export default Game;
