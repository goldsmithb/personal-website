import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isValidFieldPlacement,
  isValidGoalPlacement,
  iconFromSuite,
  shuffle,
  findCard,
  findPileIndex,
} from "./utils.js";
import { Deck as unshuffledDeck } from "../../constants.js";
import {
  deal,
  selectCard,
  deselectCard,
  removeCardFromStock,
  removeCardFromField,
  removeCardsFromField,
  removeCardFromGoal,
  moveCardToField,
  moveCardToGoal,
  moveKingToEmpty,
  setDeck,
  setCardTop,
} from "./solifaireSlice";
import styles from "../../styles/Solifaire.module.css";

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
  useEffect(() => {
    flipTopCardsField(state, dispatch);
  });
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
              <Goal />
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

const Goal = () => {
  const state = useSelector((state) => state.solifaire);
  const dispatch = useDispatch();

  const handleClickEmptyPile = (e, pile) => {
    e.stopPropagation();
    const selected = state.selected;
    if (selected === null) return;
    if (selected.value !== 1) return;
    // If a pile already exists for this suite, don't start a new one
    // (this should be impossible? maybe just need first condition)
    let alreadyExists = false;
    state.goal.forEach((pile) => {
      if (pile.suite === selected.suite && pile.cards.length > 0) {
        alreadyExists = true;
      }
    });
    if (alreadyExists) {
      dispatch(deselectCard());
      return;
    }
    const i = findPileIndex(state, selected);
    dispatch(moveCardToGoal(i));
    removeCard(selected, state, dispatch);
    dispatch(deselectCard());
    // side effects --> go in useEffect when I can!
    // flipTopCardsField(state, dispatch);
  };

  return (
    <div className={styles.goal}>
      {state.goal.map((pile, i) => {
        return (
          <div
            id={`${i}-goal-${pile.suite}`}
            className={styles.goalPile}
            onClick={(e, i) => handleClickEmptyPile(e, pile)}
          >
            {pile.cards.length === 0 && <div>Empty</div>}
            {pile.cards.map((card, i, arr) => {
              if (i === arr.length - 1) return <Card card={card} i={8} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
const attemptMoveToEmptyFieldPile = (targetIndex, state, dispatch) => {
  const { field, selected } = state;
  if (field[targetIndex].length === 0 && selected?.value === 11) {
    console.log(state.field[targetIndex]);
    dispatch(moveKingToEmpty({ index: targetIndex, selected }));
    removeCard(selected, state, dispatch);
  }
};

const Field = () => {
  const state = useSelector((state) => state.solifaire);
  const dispatch = useDispatch();
  const { field, selected } = state;

  const handleClick = (e, index) => {
    e.stopPropagation();
    console.log("clicked on empty field pile " + index);
    // move kings (11s) into empty pile
    attemptMoveToEmptyFieldPile(index, state, dispatch);
    dispatch(deselectCard());
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
    if (card.position === "field") attemptMoveToField(card, state, dispatch);
    if (card.position === "goal") attemptMoveToGoal(card, state, dispatch);
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

export default Solifaire;

// remove target card from the state
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
      const pileIndex = findPileIndex(state, target);
      console.log(pileIndex);
      dispatch(removeCardFromGoal(pileIndex));
      break;
  }
};

// remove a slice of cards from the field state,
// for when you are moving a face up card with children below
const removeCards = (cards, state, dispatch) => {
  if (cards.length === 1) {
    removeCard(cards[0], state, dispatch);
    return;
  }
  let [pile, topY] = findCard(state.field, cards[0]);
  let [botX, botY] = findCard(state.field, cards[cards.length - 1]);
  if (pile !== botX) console.log("removeCards(): DANGER! bad cards array");
  let count = cards.length;
  dispatch(removeCardsFromField({ pile, count }));
};

const validateMove = (selected, target) => {
  if (target.position === "stock") {
    return false;
  } else if (target.position === "goal") {
    return isValidGoalPlacement(selected, target);
  } else if (target.position === "field") {
    return isValidFieldPlacement(selected, target);
  }
};

const attemptMoveToGoal = (target, state, dispatch) => {
  const selected = state.selected;
  if (isValidGoalPlacement(selected, target)) return;
  const i = state.goal.findIndex((pile) => {
    return pile.suite === selected.suite;
  });
  dispatch(moveCardToGoal(i));
  removeCard(selected, state, dispatch);
  dispatch(deselectCard());
};

// target: card to place selected (state value) on top of
const attemptMoveToField = (target, state, dispatch) => {
  const selected = state.selected;
  const valid = true; //validateMove(selected, target);
  if (!valid) {
    console.log("invalid move!");
    dispatch(deselectCard(selected));
    return;
  }

  let cards = [];
  // todo: clean up these conditionals
  if (selected.position === "field") {
    // If we are moving a card that is not in the front of a field pile
    // we are also moving all the cards below it
    let [pileIndex, cardIndex] = findCard(state.field, selected);
    if (cardIndex !== 0) {
      // slice up to the selected card (inclusive)
      cards = state.field[pileIndex].slice(0, cardIndex + 1);
    } else {
      cards.push(selected);
    }
  } else {
    // Card is in stock or goal (has no children)
    cards.push(selected);
  }

  // First, remove the card(s) to be moved
  removeCards(cards, state, dispatch);

  // Then move the card(s), one by one, inserting at the front
  let [pile, index] = findCard(state.field, target);
  cards.reverse(); // the cards slice is in reverse insertion order !!
  cards.forEach((card) => {
    dispatch(moveCardToField({ pile, index: 0, card }));
  });

  dispatch(deselectCard());
  return;
};

// Check the top card of each field, and flip any that aren't flipped yet
const flipTopCardsField = (state, dispatch) => {
  if (state.playing === false) return;
  console.log("bb");
  for (let pile = 0; pile < 7; pile++) {
    const topCard = state.field[pile][0];
    if (topCard === undefined) continue;
    if (topCard.top === true) continue;
    console.log("flip card in pile", pile);
    dispatch(setCardTop(pile));
  }
};
