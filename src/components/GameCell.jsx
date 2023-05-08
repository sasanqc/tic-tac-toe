import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ReactComponent as OIcon } from "../assets/icons/icon-o.svg";
import { ReactComponent as XIcon } from "../assets/icons/icon-x.svg";
import { ReactComponent as OHoverIcon } from "../assets/icons/icon-xval.svg";
import { ReactComponent as XHoverIcon } from "../assets/icons/icon-oval.svg";
const GameCell = ({ player, handleChangeCell, turn, via, p1 }, ref) => {
  const [icon, setIcon] = useState("");
  const handleHover = () => {
    if (player) {
      return;
    }

    setIcon(`${turn}-hover`);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        changeCell() {
          onChangeCell();
        },
      };
    },
    []
  );
  const handleLeave = () => {
    if (player) {
      return;
    }

    setIcon("");
  };

  const onClickCell = () => {
    if (via === "cpu" && p1 !== turn) {
      console.log("It's  turn: ", turn);
      return;
    }
    onChangeCell();
  };

  const onChangeCell = () => {
    if (icon === "x" || icon === "o") {
      return;
    }
    if (via === "cpu") {
      console.log("It's  turn: ", turn, p1);
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
      onClick={onClickCell}
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

export default forwardRef(GameCell);
