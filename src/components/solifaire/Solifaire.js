import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isValidFieldPlacement,
  iconFromSuite,
  shuffle,
  findCard,
} from "./utils.js";
import { Deck as unshuffledDeck } from "../../constants.js";
import {
  deal,
  selectCard,
  deselectCard,
  removeCardFromStock,
  removeCardFromField,
  removeCardsFromField,
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
    if (selected.value !== 13) return;
    // does pile already exist for this suite?
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
    const i = state.goal.findIndex((pile) => {
      return pile.suite === selected.suite;
    });
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

const Field = () => {
  const state = useSelector((state) => state.solifaire);
  const dispatch = useDispatch();
  const { field, selected } = state;

  const handleClick = (e, index) => {
    e.stopPropagation();
    // console.log("clicked on pile " + index);
    if (field[index].length === 0 && selected?.value === 11) {
      // todo:
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
    attemptMoveToField(card, state, dispatch);
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

// remove card from the state
const removeCard = (target, state, dispatch) => {
  console.log("remove card", target);
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

// remove a slice of cards from the field state,
// for when you are moving a face up card with children below
const removeCards = (cards, state, dispatch) => {
  if (cards.length === 1) {
    removeCard(cards[0], state, dispatch);
    return;
  }
  let [pile, topY] = findCard(state.field, cards[0]);
  console.log("a", cards[cards.length - 1]);
  let [botX, botY] = findCard(state.field, cards[cards.length - 1]);
  if (pile !== botX) console.log("removeCards(): DANGER! bad cards array");
  let count = cards.length;
  dispatch(removeCardsFromField({ pile, bot: 0, count }));
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

// target: card to place selected (state value) on top of
const attemptMoveToField = (target, state, dispatch) => {
  const selected = state.selected;
  const valid = true; //validateMove(selected, target);
  if (!valid) {
    console.log("invalid move!");
    dispatch(deselectCard(selected));
    return;
  }

  // does the card have children that must be moved with it?
  let cards = [];
  if (selected.position === "field") {
    let [pileIndex, cardIndex] = findCard(state.field, selected);
    // If we are moving a card that is not in the front of a field pile
    // we are also moving all the cards below it
    if (cardIndex !== 0) {
      // slice up to the selected card, because it is already in the array
      cards = state.field[pileIndex].slice(0, cardIndex + 1);
    } else {
      cards.push(selected);
    }
  } else {
    cards.push(selected);
    console.log("card is in stock or goal and has no children");
  }
  // cards.push(selected);
  // console.log(selected, cards);
  console.log("------------===================------");
  console.log(cards);
  // cards.reverse();

  // First, remove the card(s) to be moved
  removeCards(cards, state, dispatch);

  // Move the card(s)
  let [pile, index] = findCard(state.field, target);
  cards.forEach((card) => {
    // todo: is this working?
    dispatch(moveCardToField({ pile, index, card }));
    index++;
  });

  dispatch(deselectCard());

  // Compute side effects
  // ("has the old state?")
  console.log("has the old state?");
  console.log(state);

  // if (selected.position === "field") {
  //   // If a field pile no longer has any 'flipped' cards,
  //   // flip the top card
  //   flipTopCardsField(state, dispatch);
  // }
  // dispatch(removeCard(selected));
  return;
};

// Check the top card of each field, and flip any that aren't flipped yet
const flipTopCardsField = (state, dispatch) => {
  if (state.playing === false) return;
  console.log("bb");
  for (let pile = 0; pile < 7; pile++) {
    const topCard = state.field[pile][0];
    console.log(topCard);
    if (topCard === undefined) continue;
    if (topCard.top === true) continue;
    console.log("flip card in pile", pile);
    dispatch(setCardTop(pile));
  }
};
