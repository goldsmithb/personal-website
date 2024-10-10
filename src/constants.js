export const posts = ["firstPost", "secondPost", "thirdPost"];

export const mysteriousSymbols = [
  "\u2580",
  "\u2581",
  "\u2582",
  "\u2583",
  "\u2584",
  "\u2585",
  "\u2586",
  "\u2587",
  "\u2588",
  "\u2589",
  "\u258A",
  "\u258B",
  "\u258C",
  "\u258D",
  "\u258E",
  "\u258F",
  "\u2590",
  "\u2591",
  "\u2592",
  "\u2593",
  "\u2594",
  "\u2595",
  "\u2596",
  "\u2597",
  "\u2598",
  "\u2599",
  "\u259A",
  "\u259B",
  "\u259C",
  "\u259D",
  "\u259E",
  "\u259F",
];

// d : deck
// 52 Card Objects
// Card : {
//  suite : "clubs" | "hearts" | "spades" | "diamonds",
//  value : 1-13
//    1 : Ace
//    11 : Jack
//    12 : Queen
//    13 : King
//  id : string, e.g. "12hearts", "4spades"
//  up : boolean, true if card is flipped up
//}
let d = [];
for (let i = 0; i < 52; i++) {
  if (i >= 0 && i < 13) {
    d.push({
      suite: "clubs",
      value: i + 1,
      id: `${i + 1}clubs`,
    });
  }
  if (i >= 13 && i < 26) {
    d.push({
      suite: "hearts",
      value: i + 1 - 13,
      id: `${i + 1 - 13}hearts`,
    });
  }
  if (i >= 26 && i < 39) {
    d.push({
      suite: "spades",
      value: i + 1 - 26,
      id: `${i + 1 - 26}spades`,
    });
  }
  if (i >= 39 && i < 52) {
    d.push({
      suite: "diamonds",
      value: i + 1 - 39,
      id: `${i + 1 - 39}diamonds`,
    });
  }
}
export const Deck = d;

export const invalidMoveMessage = "Invalid Move :(";
