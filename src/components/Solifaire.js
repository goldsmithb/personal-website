import React, { useState } from "react";
import { Deck } from "../constants"; // [{suite: string, value: string},]
import styles from "../styles/Solifaire.module.css";

// card := {
//   suite: "clubs" | "hearts" | "spades" | "diamonds",
//   value: 2-13,
//   position: "stock" | "field" | "goal",
//   top: Boolean,
//   children: cards[] | undefined,
// }

function shuffle(deck) {
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
}

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
  const [deck, setDeck] = useState(Deck);
  // console.log(deck);
  const [hand, setHand] = useState([]);
  const [goal, setGoal] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(null);
  console.log(selected);
  function init() {
    const hand = {
      stock: new Array(24),
      field: new Map(),
    };
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

    const shuffled = shuffle(deck);
    const front = shuffled.slice(0, 24);
    hand.stock = front.map((card) => {
      return {
        ...card,
        position: "stock",
      };
    });
    let back = shuffled.slice(24);
    back = back.map((card) => {
      return {
        ...card,
        position: "field",
      };
    });
    let fieldIndex = 0; // 0 - 6
    while (back.length > 0) {
      let currentFieldArray = [];
      for (let i = 0; i < fieldIndex + 1; i++) {
        currentFieldArray.push(back.pop());
      }
      currentFieldArray[0] = {
        ...currentFieldArray[0],
        top: true,
      };
      hand.field.set(fieldIndex, currentFieldArray);
      fieldIndex++;
    }
    hand.stock[0] = {
      ...hand.stock[0],
      top: true,
    };
    console.log(hand.stock[0]);

    setDeck(shuffled);
    setHand(hand);
    setGoal(goal);
    setPlaying(true);
  }

  const handleStart = () => {
    init();
  };

  return (
    <div>
      {playing && (
        <div className={styles.game}>
          <div className={styles.top}>
            <Stock stock={hand.stock} setSelected={setSelected} />
            <div className={styles.goal}></div>
          </div>
          <div className={styles.bottom}>
            <Field hand={hand} setSelected={setSelected} />
          </div>
        </div>
      )}
      {!playing && <button onClick={() => handleStart()}>Play</button>}
    </div>
  );
};

const Field = ({ hand, setSelected }) => {
  function makeFieldPile(fieldIndex) {
    return (
      <div className={styles.fieldPile} id={fieldIndex}>
        {hand.field.get(fieldIndex).map((card, i) => {
          return (
            <Card card={card} i={i} setSelected={i === 0 && setSelected} />
          );
        })}
      </div>
    );
  }

  // console.log(hand.field.get(0).length);
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

const Stock = ({ stock, setSelected }) => {
  return (
    <div className={styles.stock}>
      {stock.map((card, i) => {
        return (
          <Card
            card={card}
            i={i}
            stock={true}
            setSelected={i === 0 && setSelected}
          />
        );
      })}
    </div>
  );
};

// card data
// index, 0 ==> first/"flipped"
// stock ==> true if card is in stock
// setSelected
const Card = ({ card, i, stock, setSelected }) => {
  const { suite, value } = card;
  let cardStyle = { zIndex: `${1000 - i}` };

  if (card.children !== undefined) {
    return <div></div>;
  }

  const handleClick = (e) => {
    setSelected(card);
    console.log(card);
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
      onClick={setSelected ? (e) => handleClick(e) : undefined}
    >
      {value}
      {card.position}
      {iconFromSuite(suite)}
    </div>
  );
};

export default Solifaire;
