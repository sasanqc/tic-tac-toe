import React, { Fragment } from "react";
import { ReactComponent as OIcon } from "../assets/icons/icon-o.svg";
import { ReactComponent as XIcon } from "../assets/icons/icon-x.svg";
import { ReactComponent as PathIcon } from "../assets/icons/icon-path.svg";
import GameCell from "../components/GameCell";
import Modal from "../layouts/Modal";
import RestarGame from "../components/RestarGame";
import Winner from "../components/Winner";
import { useGame } from "../hooks/useGame";
const Game = ({ via, p1, onQuit }) => {
  const game = useGame(p1, via);

  return (
    <Fragment>
      {game.showRestart && (
        <Modal onBackdropClicked={() => {}}>
          <RestarGame
            onCancel={() => game.setShowRestart(false)}
            onRestart={game.handleRestartGame}
          />
        </Modal>
      )}
      {game.showWinner && (
        <Modal onBackdropClicked={() => {}}>
          <Winner
            onNextRound={game.handleNextRound}
            onQuit={onQuit}
            winner={game.winner}
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
                {game.turn === "x" ? (
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
            onClick={() => game.setShowRestart(true)}
          >
            <PathIcon className="icon--s icon--dark" />
          </button>
        </div>
        {game.data.map((el, index) => (
          <GameCell
            player={el}
            p1={p1}
            via={via}
            key={index}
            turn={game.turn}
            ref={(item) => {
              game.cellsRef.current[index] = item;
            }}
            handleChangeCell={() => game.handleChangeCell(index)}
          />
        ))}

        <div className="game__status--primary">
          <p className="body--dark">{`X (${
            p1 === "x"
              ? via === "cpu"
                ? "YOU"
                : "P1"
              : via === "cpu"
              ? "CPU"
              : "P2"
          })`}</p>
          <p className="heading--m">
            {p1 === "x" ? game.p1WinsNumber : game.p2WinsNumber}
          </p>
        </div>
        <div className=" game__status--light">
          <p className="body--dark">TIES</p>
          <p className="heading--m">{game.ties}</p>
        </div>
        <div className="game__status--secondary">
          <p className="body--dark">{`O (${
            p1 === "x"
              ? via === "cpu"
                ? "CPU"
                : "P2"
              : via === "cpu"
              ? "YOU"
              : "P1"
          })`}</p>
          <p className="heading--m">
            {p1 === "x" ? game.p2WinsNumber : game.p1WinsNumber}
          </p>
        </div>
      </article>
    </Fragment>
  );
};

export default Game;
