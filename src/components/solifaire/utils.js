// finds the target card in the field
export const findCard = (field, target) => {
  // console.log(field);
  // console.log(target);
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j].id === target.id) {
        // console.log("found", i, j);
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

export const findPileIndex = (state, target) => {
  return state.goal.findIndex((pile) => pile.suite === target.suite);
};

const isBlack = (card) => card.suite === "clubs" || card.suite === "spades";

// 1 = ace
// 2 = 2
//...
// 11 = jack
// 12 = king
export const isValidGoalPlacement = (card, target) => {
  if (card.suite !== target.suite) return false;
  if (card.value - 1 !== target.value) return false;
  return true;
};

// card, target: card objs with value and suite fields
// true if you can place card onto target
export const isValidFieldPlacement = (card, target) => {
  // You can only place cards on other exposed cards
  if (!target.top) return false;
  // Only place cards on opposite color
  if (
    (isBlack(card) && isBlack(target)) || // both black
    (!isBlack(card) && !isBlack(target)) // both red
  )
    return false;
  // case: you can place aces (12s) onto 2s (1s)
  if (card.value === 12 && target.value === 1) return true;
  // otherwise: card value must be 1 less than target
  if (card.value + 1 === target.value) return true;

  return false;
};

export const iconFromSuite = (suite) => {
  switch (suite) {
    case "clubs":
      return "\u2663";
    case "hearts":
      return "\u2661";
    case "spades":
      return "\u2660";
    case "diamonds":
      return "\u2662";
  }
};

export const getDisplayValue = (value) => {
  if (value < 2 || value > 10) {
    switch (value) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
    }
  }
  return value;
};

export const shuffle = (deck) => {
  let copy = [...deck];
  let N = deck.length;
  while (N > 0) {
    console.log(N);
    console.log(deck);
    let randomI = Math.floor(Math.random() * N);
    let temp = copy[N - 1];
    copy[N - 1] = copy[randomI];
    copy[randomI] = temp;
    N -= 1;
  }
  return copy;
};
