import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import {
  isValidFieldPlacement,
  isValidGoalPlacement,
  iconFromSuite,
  shuffle,
  findCard,
  findPileIndex,
  getDisplayValue,
} from "./utils.js";
import shuffleSound from "./assets/shuffle.mp3";
import { Deck as unshuffledDeck, invalidMoveMessage } from "../../constants.js";
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
  setCardUp,
  advanceStock,
  setMessage,
  unsetMessage,
  winGame,
} from "./solifaireSlice";
import styles from "./assets/Solifaire.module.css";
import VariableContext from "../../context/VariableProvider";

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
    default:
      return "";
  }
}

const mobileErrorStyleObj = {
  padding: "40px 15px",
  color: "black",
  fontSize: "2em",
  textAlign: "center",
  margin: "0 10px",
  borderRadius: "25px",
  backgroundColor: "#f04e3250",
};

const Solifaire = () => {
  const { isMobile } = useContext(VariableContext);
  console.log(isMobile);
  const state = useSelector((state) => state.solifaire);
  const [firstDeal, setFirstDeal] = useState(true);
  const [play] = useSound(shuffleSound);
  const dispatch = useDispatch();
  useEffect(() => {
    flipTopCardsField(state, dispatch);
    if (checkWinCondition(state)) {
      dispatch(winGame());
    }
  });
  const handleStart = () => {
    play();
    dispatch(unsetMessage());
    const shuffledDeck = shuffle(unshuffledDeck);
    dispatch(setDeck(shuffledDeck));
    dispatch(deal());
    if (firstDeal) setFirstDeal(false);
  };

  const handleDeselect = () => {
    if (state.selected !== null) {
      dispatch(deselectCard());
    }
  };

  const calculateClassName = (card) => {
    if (card?.position === "goal") return styles.gold;
    if (card?.suite === "hearts" || card?.suite === "diamonds")
      return styles.red;
    return styles.black;
  };

  if (isMobile) {
    return (
      <div style={mobileErrorStyleObj}>
        <span>Oh no! Solifaire isn't working for mobile screens just yet.</span>
      </div>
    );
  }

  return (
    <div onClick={() => handleDeselect()}>
      <div
        className={styles.game}
        style={firstDeal ? { alignItems: "center" } : undefined}
      >
        {state.playing && (
          <>
            <div className={styles.top}>
              <Stock />
              <Goal />
            </div>
            <div
              className={`${styles.currentSelection} ${calculateClassName(
                state.selected
              )}`}
            >
              {state.message !== "" && state.message}
            </div>
            <div className={styles.bottom}>
              <Field />
            </div>
          </>
        )}
        {firstDeal && (
          <div className={styles.titleCard}>
            <h1>Solifaire</h1>
            <div>
              <p>
                Solifaire: classic Klondike solitaire (1 card draw) but with
                X-Ray vision! Look at all the cards and plan your moves ahead of
                time.
                <br /> <br /> <br /> <br />{" "}
                <span style={{ color: "gray" }}>
                  <em>Hey, maybe it should be called soli-unfaire?</em>
                </span>
              </p>
            </div>
          </div>
        )}
        <button className={styles.dealButton} onClick={() => handleStart()}>
          {state.playing ? "New Deal" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default Solifaire;

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
      // dispatch(unsetMessage());
      return;
    }
    const i = findPileIndex(state, selected);
    dispatch(moveCardToGoal(i));
    removeCard(selected, state, dispatch);
    dispatch(deselectCard());
    // dispatch(unsetMessage());
    // side effects --> go in useEffect when I can!
    // flipTopCardsField(state, dispatch);
  };

  return (
    <div className={styles.goal}>
      {state.goal.map((pile, i) => {
        const isEmpty = pile.cards.length === 0;
        return (
          <div
            id={`${i}-goal-${pile.suite}`}
            className={`${styles.goalPile} ${isEmpty ? styles.empty : ""}`}
            onClick={(e, i) => handleClickEmptyPile(e, pile)}
          >
            {isEmpty && iconFromSuite(pile.suite)}
            {pile.cards.map((card, i, arr) => {
              return i === arr.length - 1 ? (
                <Card card={card} i={8} />
              ) : undefined;
            })}
          </div>
        );
      })}
    </div>
  );
};

const calculateExcessCards = (field) => {
  let biggest = { i: 0, size: 0 };
  field.forEach((pile, i) => {
    if (pile.length > biggest.size) biggest = { i, size: pile.length };
  });
  return biggest.size - 7;
};

const Field = () => {
  const state = useSelector((state) => state.solifaire);
  const dispatch = useDispatch();
  const { field } = state;

  const handleClick = (e, index) => {
    e.stopPropagation();
    // move kings (11s) into empty pile
    attemptMoveToEmptyFieldPile(index, state, dispatch);
    dispatch(deselectCard());
  };

  const excess = calculateExcessCards(state.field);

  const styleObj = {
    height: `${300 + excess * 35}px`,
  };

  return (
    <div className={styles.field} style={styleObj}>
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
  const { stock, selected } = useSelector((state) => state.solifaire);
  const [showHelpMsg, setShowHelpMsg] = useState(3);
  const dispatch = useDispatch();

  if (stock.length === 0) return <div>hi, stock is empty</div>;
  // stock <= 10 : advance button disabled
  // stock > 10 : only show next 10 cards in stock, advance with button
  // stock == 0 : just show disabled advance button
  // advance stock: pop the stock, push it to the back
  const handleClick = (e) => {
    // advance stock
    e.stopPropagation();
    if (selected !== null) {
      dispatch(deselectCard());
      return;
    }
    if (showHelpMsg > 0) setShowHelpMsg(showHelpMsg - 1);
    dispatch(advanceStock());
  };
  return (
    <div className={`${styles.stock}`} onClick={(e) => handleClick(e)}>
      {stock.map((card, i) => {
        return i > 9 ? undefined : <Card card={card} position={stock} i={i} />;
      })}
      {showHelpMsg > 0 && (
        <span class={styles.stockHelpMessage}>
          <em>
            <strong>Click</strong> me to draw the next card
          </em>
        </span>
        // <div className={styles.stockHelpMessage}>
        //   Click me to draw the next card in the pile!
        // </div>
      )}
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

  const { suite, value } = card;
  const isSelected = currentSelection && currentSelection.id === card.id;
  const styleObj = {};

  const handleClick = (e) => {
    e.stopPropagation();
    // If we haven't selected a card, try to select the clicked card
    if (currentSelection === null) {
      if (card.up) dispatch(selectCard(card));
      else {
        // If we clicked on a down card that is in the stock, treat it the
        // same as clicking on the stock to advance it
        if (card.position === "stock") dispatch(advanceStock());
      }
      return;
    }
    // If we clicked on ourself, deselect the card
    if (isSelected) {
      dispatch(deselectCard());
      // dispatch(unsetMessage());
      return;
    }
    // If we clicked on another card while another is selected, attempt to move it
    if (card.position === "field") attemptMoveToField(card, state, dispatch);
    if (card.position === "goal") attemptMoveToGoal(card, state, dispatch);
  };

  return (
    <>
      <div
        style={styleObj}
        className={`${styles.card} ${styleFromSuite(suite)} ${
          card.up ? styles.up : ""
        } `}
        onClick={(e) => handleClick(e)}
      >
        {getDisplayValue(value)}
        {card.position === "stock" && "\n"}
        {iconFromSuite(suite)}
      </div>
    </>
  );
};

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
      dispatch(removeCardFromGoal(pileIndex));
      break;
    default:
      return;
  }
};

// remove a slice of cards from the field state,
// for when you are moving a face up card with children below
const removeCards = (cards, state, dispatch) => {
  if (cards.length === 1) {
    removeCard(cards[0], state, dispatch);
    return;
  }
  let pile = findCard(state.field, cards[0])[0];
  let botX = findCard(state.field, cards[cards.length - 1])[0];
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
  if (!isValidGoalPlacement(selected, target)) {
    dispatch(deselectCard());
    dispatch(setMessage(invalidMoveMessage));
    return;
  }
  const i = state.goal.findIndex((pile) => {
    return pile.suite === selected.suite;
  });
  dispatch(moveCardToGoal(i));
  removeCard(selected, state, dispatch);
  dispatch(deselectCard());
};

const attemptMoveToEmptyFieldPile = (targetIndex, state, dispatch) => {
  const { field, selected } = state;
  if (field[targetIndex].length === 0 && state.selected?.value === 13) {
    if (selected.position === "field") {
      let cards = [];
      let [pileIndex, cardIndex] = findCard(field, selected);

      if (cardIndex !== 0) {
        // slice up to the selected king
        cards = state.field[pileIndex].slice(0, cardIndex + 1);

        // move the king, then move the rest
        removeCard(selected, state, dispatch);
        dispatch(moveKingToEmpty({ index: targetIndex, selected }));

        console.log(cards);
        // remove king from end
        cards.pop();
        console.log("goodbye, ", cards);
        removeCards(cards, state, dispatch);

        cards.reverse(); // the cards slice is in reverse insertion order !!
        cards.forEach((card) => {
          console.log("hello", card);
          dispatch(moveCardToField({ pile: targetIndex, index: 0, card }));
        });

        dispatch(deselectCard());
      } else {
        removeCard(selected, state, dispatch);
        dispatch(moveKingToEmpty({ index: targetIndex, selected }));
        dispatch(deselectCard());
      }
    } else if (selected.position === "stock" || selected.position === "goal") {
      console.log("helllo");
      dispatch(moveKingToEmpty({ index: targetIndex, selected }));
      removeCard(selected, state, dispatch);
      dispatch(deselectCard());
    }
  }
};

// target: card to place selected (state value) on top of
const attemptMoveToField = (target, state, dispatch) => {
  const selected = state.selected;
  const valid = validateMove(selected, target);
  if (!valid) {
    dispatch(deselectCard(selected));
    dispatch(setMessage(invalidMoveMessage));
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
  let pile = findCard(state.field, target)[0];
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
  for (let pile = 0; pile < 7; pile++) {
    const topCard = state.field[pile][0];
    if (topCard === undefined) continue;
    if (topCard.up === true) continue;
    dispatch(setCardUp(pile));
  }
};

const checkWinCondition = (state) => {
  const { goal } = state;
  if (goal.length !== 4) return false;
  for (let i = 0; i < 4; i++) {
    if (goal[i].length !== 13) return false;
  }
  return true;
};
