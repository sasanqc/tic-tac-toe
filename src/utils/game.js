export const checkWinner = (game) => {
  //check cols
  for (let i = 0; i < 3; i++) {
    let col = game[0 + i] + game[3 + i] + game[6 + i];
    if (col === "xxx") {
      return "x";
    }
    if (col === "ooo") {
      return "o";
    }
  }

  //check rows
  for (let i = 0; i < 9; i = i + 3) {
    let row = game[0 + i] + game[1 + i] + game[2 + i];
    if (row === "xxx") {
      return "x";
    }
    if (row === "ooo") {
      return "o";
    }
  }
  //check cross
  let cross = game[0] + game[4] + game[8];
  if (cross === "xxx") {
    return "x";
  }
  if (cross === "ooo") {
    return "o";
  }
  cross = game[2] + game[4] + game[6];
  if (cross === "xxx") {
    return "x";
  }
  if (cross === "ooo") {
    return "o";
  }
  return "";
};
