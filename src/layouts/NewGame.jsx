import React from "react";
import { ReactComponent as XIcon } from "../assets/icons/icon-x.svg";
import { ReactComponent as OIcon } from "../assets/icons/icon-o.svg";
const NewGame = ({ activePlayer, onChangePlayer, onStartNewGame }) => {
  return (
    <article className="newGame">
      <div className="newGame__icons">
        <XIcon className="icon--m icon--primary" />
        <OIcon className="icon--m icon--secondary" />
      </div>
      <div className="newGame__pickPlayer">
        <p className="heading--xs heading--light-2">PICK PLAYER 1’S MARK</p>
        <div className="newGame__selectBtns">
          <button
            className={`newGame__selectBtn ${
              activePlayer === "x" ? "newGame__selectBtn--active" : ""
            }`}
            onClick={() => onChangePlayer("x")}
          >
            <XIcon
              className={`icon--m icon--${
                activePlayer === "x" ? "dark" : "light"
              }`}
            />
          </button>
          <button
            className={`newGame__selectBtn ${
              activePlayer === "o" ? "newGame__selectBtn--active" : ""
            }`}
            onClick={() => onChangePlayer("o")}
          >
            <OIcon
              className={`icon--m icon--${
                activePlayer === "o" ? "dark" : "light"
              }`}
            />
          </button>
        </div>
        <p className="body--light-2">REMEMBER : X GOES FIRST</p>
      </div>
      <div className="newGame__startBtns">
        <button className="btn--secondary btn--l">NEW GAME (VS CPU)</button>
        <button
          className="btn--primary btn--l"
          onClick={() => onStartNewGame("player")}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </article>
  );
};

export default NewGame;
