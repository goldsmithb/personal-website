import React, { useEffect, useState } from "react";
import { Deck } from "../../constants"; // [{suite: string, value: string},]
import styles from "../../styles/Solifaire.module.css";
import {
  shuffle,
  deal,
  selectCard,
  deselectCard,
  moveCard,
} from "./solifaireSlice";
import { useSelector, useDispatch } from "react-redux";
import { UNSAFE_DataRouterContext } from "react-router-dom";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(shuffle());
  }, []);

  const handleStart = () => {
    dispatch(deal());
  };

  const handleDeselect = () => {
    if (state.selected !== null) dispatch(deselectCard());
  };

  return (
    <div onClick={() => handleDeselect()}>
      {state.playing && (
        <div className={styles.game}>
          <div className={styles.top}>
            <Stock />
            <div className={styles.goal}></div>
          </div>
          <div className={styles.bottom}>
            <Field />
          </div>
        </div>
      )}
      {!state.playing && <button onClick={() => handleStart()}>Play</button>}
    </div>
  );
};

const Field = () => {
  const field = useSelector((state) => state.solifaire.field);
  function makeFieldPile(fieldIndex) {
    return (
      <div className={styles.fieldPile} id={fieldIndex}>
        {field[fieldIndex].map((card, i) => {
          return <Card card={card} i={i} />;
        })}
      </div>
    );
  }

  let fieldIndex = 0;
  return (
    <div className={styles.field}>
      {makeFieldPile(fieldIndex++)}
      {makeFieldPile(fieldIndex++)}
      {makeFieldPile(fieldIndex++)}
      {makeFieldPile(fieldIndex++)}
      {makeFieldPile(fieldIndex++)}
      {makeFieldPile(fieldIndex++)}
      {makeFieldPile(fieldIndex++)}
    </div>
  );
};

const Stock = () => {
  const stock = useSelector((state) => state.solifaire.stock);
  if (stock === null) return <div>hi</div>;
  return (
    <div className={styles.stock}>
      {stock.map((card, i) => {
        return <Card card={card} i={i} stock={true} />;
      })}
    </div>
  );
};

// card data
// index, 0 ==> first/"flipped"
// stock ==> true if card is in stock
const Card = ({ card, i, stock }) => {
  const currentSelection = useSelector((state) => state.solifaire.selected);
  const dispatch = useDispatch();
  const { suite, value, children } = card;
  const isSelected =
    currentSelection !== null &&
    currentSelection.suite === suite &&
    currentSelection.value === value;
  let cardStyle = { zIndex: `${1000 - i}` };

  if (children !== undefined) {
    return <div></div>; // cards
  }

  const handleClick = (e) => {
    console.log("handleclick");
    if (currentSelection === null) {
      console.log("selectcard");
      dispatch(selectCard(card));
      return;
    }
    if (isSelected) {
      console.log("deselect cartd");
      dispatch(deselectCard());
      return;
    }
    console.log("try to move card");
    dispatch(moveCard(card));
  };

  return (
    <div
      className={`${styles.card} ${styleFromSuite(suite)} ${
        card.top ? styles.top : ""
      } ${i === 0 ? styles.first : ""}`}
      style={
        stock
          ? { ...cardStyle, left: `${i * 50}px` }
          : { ...cardStyle, top: `-${i * 22}px` }
      }
      onClick={(e) => handleClick(e)}
    >
      {value}
      {card.position}
      {iconFromSuite(suite)}
    </div>
  );
};

export default Solifaire;
