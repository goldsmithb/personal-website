import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isValidFieldPlacement, iconFromSuite, shuffle } from "./utils.js";
import { Deck as unshuffledDeck } from "../../constants.js";
import {
  deal,
  selectCard,
  deselectCard,
  removeCardFromStock,
  removeCardFromField,
  moveCardToField,
  moveKingToEmpty,
  setDeck,
  setCardTop,
} from "./solifaireSlice";
import styles from "../../styles/Solifaire.module.css";

// card := {
//   suite: "clubs" | "hearts" | "spades" | "diamonds",
//   value: 2-13,
//   position: "stock" | "field" | "goal",
//   top: Boolean,
//   children: cards[] | undefined,
// }
function styleFromSuite(suite) {
  switch (suite) {
    case "clubs":
      return styles.clubs;
    case "hearts":
      return styles.hearts;
    case "spades":
      return styles.spades;
    case "diamonds":
      return styles.diamonds;
  }
}

const Solifaire = () => {
  const state = useSelector((state) => state.solifaire);
  console.log(state);
  const dispatch = useDispatch();

  const handleStart = () => {
    const shuffledDeck = shuffle(unshuffledDeck);
    dispatch(setDeck(shuffledDeck));
    dispatch(deal());
  };

  const handleDeselect = () => {
    if (state.selected !== null) dispatch(deselectCard());
  };

  return (
    <div onClick={() => handleDeselect()}>
      <div className={styles.game}>
        {state.playing && (
          <>
            <div className={styles.top}>
              <Stock />
              <div className={styles.goal}></div>
            </div>
            <div className={styles.bottom}>
              <Field />
            </div>
          </>
        )}
        <button onClick={() => handleStart()}>
          {state.playing ? "Restart" : "Play"}
        </button>
      </div>
    </div>
  );
};

const Field = () => {
  const state = useSelector((state) => state.solifaire);
  const dispatch = useDispatch();
  const { field, selected } = state;

  const handleClick = (e, index) => {
    e.stopPropagation();
    // console.log("clicked on pile " + index);
    if (field[index].length === 0 && selected?.value === 11) {
      // move kings (11s) into empty pile
      dispatch(moveKingToEmpty({ index, selected }));
      // dispatch(removeCard(selected));
      // dispatch(moveCard({ target: null, selected: state.selected }));
    }
  };

  return (
    <div className={styles.field}>
      {field.map((pile, index) => {
        return (
          <div
            className={styles.fieldPile}
            id={index}
            onClick={(e) => handleClick(e, index)}
          >
            {pile.map((card, j) => {
              return <Card card={card} i={j} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

const Stock = () => {
  const stock = useSelector((state) => state.solifaire.stock);
  if (stock.length === 0) return <div>hi, stock is empty</div>;
  return (
    <div className={styles.stock}>
      {stock.map((card, i) => {
        return <Card card={card} i={i} />;
      })}
    </div>
  );
};

// card data
// index, 0 ==> first/"flipped"
// stock ==> true if card is in stock
const Card = ({ card, i }) => {
  const state = useSelector((state) => state.solifaire);
  const currentSelection = state.selected;
  const dispatch = useDispatch();
  const { suite, value, child } = card;
  const isSelected = currentSelection && currentSelection.id === card.id;

  const handleClick = (e) => {
    e.stopPropagation();
    // console.log("handleclick");
    // If we haven't selected a card, try to select the clicked card
    if (currentSelection === null) {
      if (card.top) dispatch(selectCard(card));
      return;
    }
    // If we clicked on ourself, deselect the card
    if (isSelected) {
      dispatch(deselectCard());
      return;
    }
    // If we clicked on another card while another is selected, attempt to move it
    // console.log("try to move card");
    attemptMove(currentSelection, card, dispatch, state);
  };

  return (
    <>
      {child && <Card card={child} i={i + 1} />}
      <div
        className={`${styles.card} ${styleFromSuite(suite)} ${
          card.top ? styles.top : ""
        } ${i === 0 ? styles.first : ""}`}
        onClick={(e) => handleClick(e)}
      >
        {value}
        {card.position}
        {iconFromSuite(suite)}
      </div>
    </>
  );
};

const findCard = (field, target) => {
  console.log("finding", target);
  // console.log(field);
  // console.log(target);
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j].id === target.id) {
        console.log("!", i, j);
        return [i, j];
      }
    }
  }
};

export default Solifaire;

const removeCard = (target, state, dispatch) => {
  switch (target.position) {
    case "field":
      let [i, j] = findCard(state.field, target);
      dispatch(removeCardFromField({ i, j }));
      break;
    case "stock":
      dispatch(removeCardFromStock(target));
      break;
    case "goal":
      console.log("remove card from goal (not implemented)");
      break;
  }
};

const validateMove = (selected, target) => {
  if (target.position === "stock") {
    return false;
  } else if (target.position === "goal") {
    return false; // todo
  } else if (target.position === "field") {
    return isValidFieldPlacement(selected, target);
  }
};

// selected: card to be moved
// target: card to place selected on top of
const attemptMove = (selected, target, dispatch, state) => {
  const valid = validateMove(selected, target);
  if (!valid) {
    console.log("invalid move!");
    dispatch(deselectCard(selected));
    return;
  }

  // First, remove the card to be moved
  removeCard(selected, state, dispatch);

  // Move the card
  let [row, col] = findCard(state.field, target);
  dispatch(moveCardToField({ row, col, selected }));
  dispatch(deselectCard());

  // Compute side effects
  if (selected.position === "field") {
    // If a field pile no longer has any 'flipped' cards,
    // flip the top card
    for (let pile = 0; pile < 7; pile++) {
      let setTop = false;
      for (let card = 0; card < state.field[card].length; card++) {
        console.log(pile, card);
        if (state.field[pile][card]?.top) setTop = true;
        break;
      }
      if (setTop) dispatch(setCardTop(pile));
    }
  }
  // dispatch(removeCard(selected));
  return;
};
