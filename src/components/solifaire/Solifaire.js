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
    dispatch(shuffle());
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
  const state = useSelector((state) => state.solifaire);
  const field = state.field;

  return (
    <div className={styles.field}>
      {field.map((pile, index) => {
        return (
          <div className={styles.fieldPile} id={index}>
            {pile.map((card, j) => {
              return <Card card={card} i={j} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

//     // now add the selected card to the children array of the payload
//     // locate payload in field:
//     let newField = state.field;
//     newField = newField.map((pile) => {
//       if (pile[0].id === state.selected.id) {
//         pile[0] = action.payload;
//       }
//     });
//     return {
//       ...state,
//       field: newField,
//     };
//   }
//   console.log("not yet");
//   return state;
// };

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
  const currentSelection = useSelector((state) => state.solifaire.selected);
  const dispatch = useDispatch();
  const { suite, value, children } = card;
  const isSelected = currentSelection && currentSelection.id === card.id;
  let cardStyle = { zIndex: `${1000 - i}` };

  if (children.length !== 0) {
    return <div>OHH</div>; // cards
  }

  const handleClick = (e) => {
    e.stopPropagation();
    console.log("handleclick");
    console.log(currentSelection);
    console.log(card);
    // If we haven't selected a card, try to select the clicked card
    if (currentSelection === null) {
      console.log("selectcard");
      dispatch(selectCard(card));
      return;
    }
    // If we clicked on ourself, deselect the card
    if (isSelected) {
      dispatch(deselectCard());
      return;
    }
    // If we clicked on another card while another is selected, attempt to move it
    console.log("try to move card");
    attemptMove(currentSelection, card, dispatch);
    // dispatch(moveCard({ target: card, selected: currentSelection }));
  };

  return (
    <div
      className={`${styles.card} ${styleFromSuite(suite)} ${
        card.top ? styles.top : ""
      } ${i === 0 ? styles.first : ""}`}
      style={
        card.position === "stock"
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

const attemptMove = (selected, target, dispatch) => {
  if (target.position === "stock") {
    console.log("bad placement");
    return;
  }
  if (target.position === "field") {
    console.log(
      isValidFieldPlacement(selected, target)
        ? "good placement"
        : "bad placement"
    );
    if (!isValidFieldPlacement(selected, target)) return;
    dispatch(moveCard({ target, selected }));
  }
};

const isBlack = (card) => card.suite === "clubs" || card.suite === "spades";

// card, target: card objs with value and suite fields
// true if you can place card onto target
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
