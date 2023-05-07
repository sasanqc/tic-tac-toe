import React, { useState, useEffect } from "react";
import { ReactComponent as OIcon } from "../assets/icons/icon-o.svg";
import { ReactComponent as XIcon } from "../assets/icons/icon-x.svg";
import { ReactComponent as OHoverIcon } from "../assets/icons/icon-xval.svg";
import { ReactComponent as XHoverIcon } from "../assets/icons/icon-oval.svg";
const GameCell = ({ player, handleChangeCell, turn }) => {
  const [icon, setIcon] = useState("");

  const handleHover = () => {
    if (player) {
      return;
    }

    setIcon(`${turn}-hover`);
  };

  const handleLeave = () => {
    if (player) {
      return;
    }

    setIcon("");
  };

  const onChangeCell = () => {
    if (icon === "x" || icon === "o") {
      return;
    }

    setIcon(turn);
    handleChangeCell(turn);
  };

  useEffect(() => {
    setIcon(player);
    return () => {};
  }, [player]);

  return (
    <div
      className={`wrapper--${icon ? "l" : "empty"} wrapper--dark`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={onChangeCell}
    >
      {icon === "o" ? (
        <OIcon className="icon--l icon--secondary" />
      ) : icon === "x" ? (
        <XIcon className="icon--l icon--primary" />
      ) : icon === "x-hover" ? (
        <OHoverIcon className="icon--l icon--primary" />
      ) : icon === "o-hover" ? (
        <XHoverIcon className="icon--l icon--secondary" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default GameCell;
