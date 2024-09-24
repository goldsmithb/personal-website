import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
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
      state.field[i].splice(j, 1);
    },
    removeCardFromStock: (state, action) => {
      console.log("remove card from stock");
      state.stock.splice(0, 1);
      if (state.stock.length > 0) state.stock[0].top = true;
    },
    // move a card into the field
    moveCardToField: (state, action) => {
      console.log("move Card");
      const { row, col, selected } = action.payload;

      // Push selected card on TOP of target card
      state.field[row].splice(col, 0, selected);
    },
    // Move the card onto the goal pile at specified index
    moveCardToGoal: (state, action) => {
      const pileIndex = action.payload;
      console.log(pileIndex);
      state.goal[pileIndex].cards.push(state.selected);
    },
    moveKingToEmpty: (state, action) => {
      const { index, selected } = action.payload;
      state.field[index].push(selected);
      if (selected.position === "stock") {
      }
    },
    // find the first card in the pile and flip it
    setCardTop: (state, action) => {
      const pileIndex = action.payload;
      state.field[pileIndex][0].top = true;
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
  removeCardFromStock,
  moveCardToGoal,
  moveKingToEmpty,
  setCardTop,
} = solifaireSlice.actions;

// selectors
export const getDeck = (state) => {
  return state.deck;
};

export default solifaireSlice.reducer;
