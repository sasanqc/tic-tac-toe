import React, { Fragment } from "react";
import { ReactComponent as OIcon } from "../assets/icons/icon-o.svg";
import { ReactComponent as XIcon } from "../assets/icons/icon-x.svg";
const Winner = ({ onQuit, onNextRound, winner, p1 }) => {
  const title = winner === p1 ? "player 1 wins!" : "player 2 wins!";
  return (
    <Fragment>
      {winner && (
        <Fragment>
          <h1 className="heading--xs  winner__title">{title}</h1>
          <div className="winner__who">
            {winner === "x" ? (
              <XIcon className="icon--l icon--primary" />
            ) : (
              <OIcon className="icon--l icon--secondary" />
            )}

            <h1
              className={`heading--l heading--${
                winner === "x" ? "primary" : "secondary"
              }`}
            >
              takes the round
            </h1>
          </div>
        </Fragment>
      )}
      {!winner && (
        <h1 className="heading--l  restartGame__title">round tied</h1>
      )}

      <div className="winner__btns">
        <button className="btn--s btn--light" onClick={onQuit}>
          quit
        </button>
        <button className="btn--s btn--secondary" onClick={onNextRound}>
          next round
        </button>
      </div>
    </Fragment>
  );
};

export default Winner;
