export function findCard(field, target) {
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
}

const isBlack = (card) => card.suite === "clubs" || card.suite === "spades";

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
