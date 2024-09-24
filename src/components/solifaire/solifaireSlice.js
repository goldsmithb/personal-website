import { createSlice } from "@reduxjs/toolkit";
// import { findCard } from "./utils.js";

export const solifaireSlice = createSlice({
  name: "solifaire",
  initialState: {
    deck: [],
    playing: false,
    selected: null,
    field: [],
    stock: [],
    goal: [],
  },
  reducers: {
    setDeck: (state, action) => {
      state.deck = action.payload;
    },
    deal: (state) => {
      let field = [];
      const goal = [
        {
          suite: "clubs",
          pile: new Array(13),
        },
        {
          suite: "hearts",
          pile: new Array(13),
        },
        {
          suite: "spades",
          pile: new Array(13),
        },
        {
          suite: "diamonds",
          pile: new Array(13),
        },
      ];

      // deal the first 24 cards into the stock
      const front = state.deck.slice(0, 24);
      let stock = front.map((card) => {
        return {
          ...card,
          position: "stock",
        };
      });
      stock[0] = {
        ...stock[0],
        top: true,
      };

      // deal the last 28 cards into the field
      let back = state.deck.slice(24);
      back = back.map((card) => {
        return {
          ...card,
          position: "field",
        };
      });
      let fieldPileIndex = 0;
      while (back.length > 0) {
        let currentFieldArray = [];
        for (let i = 0; i < fieldPileIndex + 1; i++) {
          currentFieldArray.push(back.pop());
        }
        currentFieldArray[0] = {
          ...currentFieldArray[0],
          top: true,
        };
        field[fieldPileIndex] = currentFieldArray;
        fieldPileIndex++;
      }
      return {
        ...state,
        stock,
        field,
        goal,
        playing: true,
      };
    },
    selectCard: (state, action) => {
      console.log("select");
      state.selected = action.payload;
    },
    deselectCard: (state) => {
      console.log("deselect");
      state.selected = null;
    },
    removeCardFromField: (state, action) => {
      const { i, j } = action.payload;
      console.log(i, j);
      // console.log("remove card from field", selected.id);
      // const [row, col] = findCard(state.field, action.payload);
      state.field[i].splice(j, 1);
    },
    removeCardFromStock: (state, action) => {
      console.log("remove card from stock");
      state.stock.splice(0, 1);
      if (state.stock.length > 0) state.stock[0].top = true;
    },
    moveCard: (state, action) => {
      console.log("move Card");
      // action.payload : target placement, will not be the currently selected card.
      // state.selectedCard : guaranteed not to be null and not to equal payload
      const { row, col, selected } = action.payload;
      // let row, col;
      // for (let i = 0; i < 7; i++) {
      //   for (let j = 0; j < field[i].length; j++) {
      //     if (field[i][j].id === target.id) {
      //       // console.log("found", i, j);
      //       row = i;
      //       col = j;
      //     }
      //   }
      // }
      // let topCard = target.parent;
      // while (topCard !== null) {
      //   topCard = findCard(state.field, topCard);
      // }

      // Push selected card on TOP of target card
      state.field[row].splice(col, 0, selected);
      // if (selected.position === "field") {
      //   const [removeX, removeY] = findCard(state.field, selected);
      //   state.field[removeX].splice(removeY, 1);
      //   if (state.field[removeX].length !== 0)
      //     state.field[removeX][0].top = true;

      //   state.selected = null;
      // } else if (selected.position === "stock") {
      //   console.log("pop stock");
      //   state.stock.splice(0, 1);
      //   if (state.stock.length > 0) state.stock[0].top = true;
      // } else if (selected.position === "goal") {
      // }
    },
    moveKingToEmpty: (state, action) => {
      const { index, selected } = action.payload;
      state.field[index].push(selected);
      if (selected.position === "stock") {
      }
    },
  },
});

const isBlack = (card) => card.suite === "clubs" || card.suite === "spades";

// card, target: card objs with value and suite fields
function isValidFieldPlacement(card, target) {
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
}

export const {
  setDeck,
  deal,
  selectCard,
  deselectCard,
  moveCard,
  removeCardFromField,
  removeCardFromStock,
  moveKingToEmpty,
} = solifaireSlice.actions;

// selectors
export const getDeck = (state) => {
  return state.deck;
};

export default solifaireSlice.reducer;
