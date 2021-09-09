function fullHouse(
  winner,
  roundContinue,
  playerOneSortedDuplicateCards,
  playerTwoSortedDuplicateCards
) {
  // declaring full house variables ofr player one
  let playerOneFullHouse;
  var playerOneFullHouseHighCard = 0;
  var playerOneFullHouseCardTwo = 0;

  // Similar to the four of a kind function, if the player only has 2 different numbers in their hand
  // and one of the numbers appears 3 times, the player is declared to have a full house
  if (playerOneSortedDuplicateCards.length === 2) {
    for (let i = 0; i < playerOneSortedDuplicateCards.length; i++) {
      if (playerOneSortedDuplicateCards[i][1] === 3) {
        playerOneFullHouse = true;
        playerOneFullHouseHighCard = parseInt(
          playerOneSortedDuplicateCards[i][0]
        );
      } else if (playerOneSortedDuplicateCards[i][1] === 2) {
        playerOneFullHouseCardTwo = parseInt(
          playerOneSortedDuplicateCards[i][0]
        );
      }
    }
  }

  // repeats the above for player 2
  let playerTwoFullHouse;
  var playerTwoFullHouseHighCard = 0;
  var playerTwoFullHouseCardTwo = 0;

  if (playerTwoSortedDuplicateCards.length === 2) {
    for (let i = 0; i < playerTwoSortedDuplicateCards.length; i++) {
      if (playerTwoSortedDuplicateCards[i][1] === 3) {
        playerTwoFullHouse = true;
        playerTwoFullHouseHighCard = parseInt(
          playerTwoSortedDuplicateCards[i][0]
        );
      } else if (playerTwoSortedDuplicateCards[i][1] === 2) {
        playerTwoFullHouseCardTwo = parseInt(
          playerTwoSortedDuplicateCards[i][0]
        );
      }
    }
  }

  // code similar to previous, used to determine if a victor is decided upon using full houses
  if (playerOneFullHouse && !playerTwoFullHouse) {
    winner = 'playerOne';
    roundContinue = false;
  } else if (!playerOneFullHouse && playerTwoFullHouse) {
    winner = 'playerTwo';
    roundContinue = false;
  } else if (playerOneFullHouse && playerTwoFullHouse) {
    if (playerOneFullHouseHighCard > playerTwoFullHouseHighCard) {
      winner = 'playerOne';
      roundContinue = false;
    } else if (playerOneFullHouseHighCard < playerTwoFullHouseHighCard) {
      winner = 'playerTwo';
      roundContinue = false;
    }
  }
  return [winner, roundContinue];
}

module.exports = { fullHouse };
