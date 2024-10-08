import { createSlice } from "@reduxjs/toolkit";
import { getMessageDisplayValue } from "./utils";

export const solifaireSlice = createSlice({
  name: "solifaire",
  initialState: {
    deck: [],
    playing: false,
    won: false,
    selected: null,
    field: [],
    stock: [],
    goal: [],
    message: "",
  },
  reducers: {
    setDeck: (state, action) => {
      state.deck = action.payload;
    },
    deal: (state) => {
      let field = [];
      const goal = [
        {
          suite: "hearts",
          cards: [],
        },
        {
          suite: "clubs",
          cards: [],
        },
        {
          suite: "diamonds",
          cards: [],
        },
        {
          suite: "spades",
          cards: [],
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
        up: true,
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
          up: true,
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
      // console.log("select");
      const { suite, value } = action.payload;
      state.selected = action.payload;
      state.message = `${getMessageDisplayValue(value)} of ${suite}`;
    },
    deselectCard: (state) => {
      // console.log("deselect");
      state.selected = null;
      state.message = "";
    },
    removeCardFromField: (state, action) => {
      // console.log("remove card from field");
      const { i, j } = action.payload;
      state.field[i].splice(j, 1);
    },
    removeCardsFromField: (state, action) => {
      // console.log("remove cards from field - bottom to index");
      const { pile, count } = action.payload;
      state.field[pile].splice(0, count);
    },
    removeCardFromStock: (state, action) => {
      // console.log("remove card from stock");
      state.stock.splice(0, 1);
      if (state.stock.length > 0) state.stock[0].up = true;
    },
    removeCardFromGoal: (state, action) => {
      const pileIndex = action.payload;
      state.goal[pileIndex].cards.pop();
    },
    // move a card into the field at the specified index
    moveCardToField: (state, action) => {
      // console.log("move Card to field");
      const { pile, index, card } = action.payload;
      // Push selected card on top (in front) of target card
      state.field[pile].splice(index, 0, { ...card, position: "field" });
    },
    // Move the card onto the goal pile at specified index
    moveCardToGoal: (state, action) => {
      const pileIndex = action.payload;
      state.goal[pileIndex].cards.push({ ...state.selected, position: "goal" });
    },
    moveKingToEmpty: (state, action) => {
      const { index, selected } = action.payload;
      state.field[index].push({ ...selected, position: "field" });
    },
    // find the first card in the pile and flip it
    setCardUp: (state, action) => {
      const pileIndex = action.payload;
      if (state.field[pileIndex][0] !== undefined)
        state.field[pileIndex][0].up = true;
    },
    advanceStock: (state) => {
      const [first] = state.stock.splice(0, 1);
      state.stock[0].up = true;
      first.up = false;
      state.stock.push(first);
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    unsetMessage: (state) => {
      state.message = "";
    },
    winGame: (state) => {
      state.won = true;
      state.message = "YOU WIN !!!";
    },
  },
});

export const {
  setDeck,
  deal,
  selectCard,
  deselectCard,
  moveCardToField,
  removeCardFromField,
  removeCardsFromField,
  removeCardFromStock,
  removeCardFromGoal,
  moveCardToGoal,
  moveKingToEmpty,
  setCardUp,
  advanceStock,
  setMessage,
  unsetMessage,
  winGame,
} = solifaireSlice.actions;

// selectors
export const getDeck = (state) => {
  return state.deck;
};

export default solifaireSlice.reducer;
