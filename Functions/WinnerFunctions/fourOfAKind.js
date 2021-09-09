function fourOfAKind(
  winner,
  roundContinue,
  playerOneCardNumbers,
  playerOneSortedDuplicateCards,
  playerTwoCardNumbers,
  playerTwoSortedDuplicateCards
) {
  const playerOneCards = {};
  let playerOneFourOfAKind;
  var playerOneFourOfKindCard = 0;

  // goes through player ones cards and sorts it into what card numbers they have, and how many they have, into an object
  // object will look like this {'1': 4, '5', 1} as an example, with the string being the card number, and the int
  // being the number of times that card is in the hand
  playerOneCardNumbers.forEach(function (duplicates) {
    playerOneCards[duplicates] = (playerOneCards[duplicates] || 0) + 1;
  });

  // this sorts the above object into an array, with each item being in its on array within the array
  playerOneSortedDuplicateCards = Object.entries(playerOneCards);

  // this determines whether the player has any card that appears four times
  if (playerOneSortedDuplicateCards.length === 2) {
    for (let i = 0; i < playerOneSortedDuplicateCards.length; i++) {
      if (playerOneSortedDuplicateCards[i][1] === 4) {
        playerOneFourOfAKind = true;
        playerOneFourOfKindCard = parseInt(playerOneSortedDuplicateCards[i][0]);
      }
    }
  }

  // above code repeats for player two
  const playerTwoCards = {};
  let playerTwoFourOfAKind;
  var playerTwoFourOfKindCard = 0;

  playerTwoCardNumbers.forEach(function (duplicates) {
    playerTwoCards[duplicates] = (playerTwoCards[duplicates] || 0) + 1;
  });

  playerTwoSortedDuplicateCards = Object.entries(playerTwoCards);

  if (playerTwoSortedDuplicateCards.length === 2) {
    for (let i = 0; i < playerTwoSortedDuplicateCards.length; i++) {
      if (playerTwoSortedDuplicateCards[i][1] === 4) {
        playerTwoFourOfAKind = true;
        playerTwoFourOfKindCard = parseInt(playerTwoSortedDuplicateCards[i][0]);
      }
    }
  }

  // determines who wins based on who has a four of a kind
  // if both players have one, the highest four of a kind wins
  // if no four of a kind, the round will continue
  if (playerOneFourOfAKind && !playerTwoFourOfAKind) {
    winner = 'playerOne';
    roundContinue = false;
  } else if (!playerOneFourOfAKind && playerTwoFourOfAKind) {
    winner = 'playerTwo';
    roundContinue = false;
  } else if (playerOneFourOfAKind && playerTwoFourOfAKind) {
    if (playerOneFourOfKindCard > playerTwoFourOfKindCard) {
      winner = 'playerOne';
      roundContinue = false;
    } else if (playerOneFourOfKindCard < playerTwoFourOfKindCard) {
      winner = 'playerTwo';
      roundContinue = false;
    }
  }
  return [
    winner,
    roundContinue,
    playerOneSortedDuplicateCards,
    playerTwoSortedDuplicateCards,
  ];
}

module.exports = { fourOfAKind };
