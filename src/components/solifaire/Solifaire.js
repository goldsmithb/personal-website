import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isValidFieldPlacement } from "./utils.js";
import { Deck as unshuffledDeck } from "../../constants.js";
import {
  deal,
  selectCard,
  deselectCard,
  removeCardFromStock,
  removeCardFromField,
  moveCard,
  moveKingToEmpty,
  setDeck,
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

function iconFromSuite(suite) {
  switch (suite) {
    case "clubs":
      return "\u2660";
    case "hearts":
      return "\u2661";
    case "spades":
      return "\u2663";
    case "diamonds":
      return "\u2662";
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
      // console.log("selectcard");
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

const shuffle = (deck) => {
  let copy = deck;
  let N = deck.length;
  while (N > 0) {
    let randomI = Math.floor(Math.random() * N);
    let temp = copy[N - 1];
    copy[N - 1] = copy[randomI];
    copy[randomI] = temp;
    N -= 1;
  }
  return copy;
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

const attemptMove = (selected, target, dispatch, state) => {
  if (selected.position === "field") {
    let [i, j] = findCard(state.field, selected);
    dispatch(removeCardFromField({ i, j }));
  }
  if (selected.position === "stock") dispatch(removeCardFromStock(selected));
  let [row, col] = findCard(state.field, target);
  dispatch(moveCard({ row, col, selected }));
  dispatch(deselectCard());
  // dispatch(removeCard(selected));
  return;
  if (target.position === "stock") {
    // todo, change position to field when adding child!
    // console.log("bad placement");
    return;
  }
  if (target.position === "field") {
    // console.log(
    //   isValidFieldPlacement(selected, target)
    //     ? "good placement"
    //     : "bad placement"
    // );
    // if (!isValidFieldPlacement(selected, target)) return;
    // dispatch(addChild({ target, selected }));
    // dispatch(removeCard(selected));
  }
};
