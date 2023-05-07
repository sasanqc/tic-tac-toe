import React, { Fragment } from "react";

const RestarGame = ({ onCancel, onRestart }) => {
  return (
    <Fragment>
      <h1 className="heading--l  restartGame__title">restart game?</h1>
      <div className="restartGame__btns">
        <button className="btn--s btn--light" onClick={onCancel}>
          no, cancel
        </button>
        <button className="btn--s btn--secondary" onClick={onRestart}>
          yes, restart
        </button>
      </div>
    </Fragment>
  );
};

export default RestarGame;
