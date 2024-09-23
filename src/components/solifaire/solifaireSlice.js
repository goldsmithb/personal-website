import { createSlice, isActionCreator } from "@reduxjs/toolkit";
import { Deck as unshuffledDeck } from "../../constants.js";

export const solifaireSlice = createSlice({
  name: "solifaire",
  initialState: {
    deck: unshuffledDeck,
    playing: false,
    selected: null,
    field: null,
    stock: null,
    goal: null,
  },
  reducers: {
    shuffle: (state) => {
      let copy = state.deck;
      let N = state.deck.length;
      while (N > 0) {
        let randomI = Math.floor(Math.random() * N);
        let temp = copy[N - 1];
        copy[N - 1] = copy[randomI];
        copy[randomI] = temp;
        N -= 1;
      }
      state.deck = copy;
    },
    deal: (state) => {
      let stock = new Array(24);
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
      stock = front.map((card) => {
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
      if (action.payload.top) state.selected = action.payload;
    },
    deselectCard: (state) => {
      console.log("deselect");
      return {
        ...state,
        selected: null,
      };
    },
    moveCard: (state, action) => {
      // action.payload : target placement, will not be the currently selected card.
      // state.selectedCard : guaranteed not to be null and not to equal payload
      console.log(state.selected.value);
      console.log(state.selected.suite);
      console.log(state.selected.position);
      console.log(action.payload);
      if (action.payload.position === "stock") {
        console.log("bad placement");
        return { ...state };
      }
      if (action.payload.position === "field") {
        const valid = isValidFieldPlacement(state.selected, action.payload);
        console.log(valid ? "good placement" : "bad placement");
      }
      return state;
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
  // case: you can place aces (13) onto 2s
  if (card.value === 13 && target.value === 2) return true;
  // otherwise: card value must be 1 less than target
  if (card.value + 1 === target.value) return true;

  return false;
}

export const { shuffle, deal, selectCard, deselectCard, moveCard } =
  solifaireSlice.actions;

export default solifaireSlice.reducer;
