function twoPairs(
  winner,
  roundContinue,
  playerOneSortedDuplicateCards,
  playerTwoSortedDuplicateCards
) {
  let playerOneTwoPair;
  const playerOneTwoOfKindCards = [];
  var playerOneSingleCard = 0;

  // this determines whether the player has any 2 sets of cards that appears 2 times
  if (playerOneSortedDuplicateCards.length === 3) {
    for (let i = 0; i < playerOneSortedDuplicateCards.length; i++) {
      if (playerOneSortedDuplicateCards[i][1] === 2) {
        playerOneTwoPair = true;
        playerOneTwoOfKindCards.push(
          parseInt(playerOneSortedDuplicateCards[i][0])
        );
      } else if (playerOneSortedDuplicateCards[i][1] === 1) {
        playerOneSingleCard = parseInt(playerOneSortedDuplicateCards[i][0]);
      }
    }
  }

  // repeats the above for player 2
  let playerTwoTwoPair;
  const playerTwoTwoOfKindCards = [];
  var playerTwoSingleCard = 0;

  if (playerTwoSortedDuplicateCards.length === 3) {
    for (let i = 0; i < playerTwoSortedDuplicateCards.length; i++) {
      if (playerTwoSortedDuplicateCards[i][1] === 2) {
        playerTwoTwoPair = true;
        playerTwoTwoOfKindCards.push(
          parseInt(playerTwoSortedDuplicateCards[i][0])
        );
      } else if (playerTwoSortedDuplicateCards[i][1] === 1) {
        playerTwoSingleCard = parseInt(playerTwoSortedDuplicateCards[i][0]);
      }
    }
  }

  // Sorts the players 2 pairs from highest to lowest
  playerOneTwoOfKindCards.sort(function (a, b) {
    return b - a;
  });
  playerTwoTwoOfKindCards.sort(function (a, b) {
    return b - a;
  });

  // Similar to previous functions, if one player has 2 pairs and the other doesnt, that player wins.
  // If both players have 2 pairs, the player with the highest two pair wins
  // If both players have the same 2 pair, the player with the highest 5th card wins
  if (playerOneTwoPair && !playerTwoTwoPair) {
    winner = 'playerOne';
    roundContinue = false;
  } else if (!playerOneTwoPair && playerTwoTwoPair) {
    winner = 'playerTwo';
    roundContinue = false;
  } else if (playerOneTwoPair && playerTwoTwoPair) {
    if (playerOneTwoOfKindCards[0] > playerTwoTwoOfKindCards[0]) {
      winner = 'playerOne';
      roundContinue = false;
    } else if (playerOneTwoOfKindCards[0] < playerTwoTwoOfKindCards[0]) {
      winner = 'playerTwo';
      roundContinue = false;
    } else if (playerOneTwoOfKindCards[0] === playerTwoTwoOfKindCards[0]) {
      if (playerOneTwoOfKindCards[1] > playerTwoTwoOfKindCards[1]) {
        winner = 'playerOne';
        roundContinue = false;
      } else if (playerOneTwoOfKindCards[1] < playerTwoTwoOfKindCards[1]) {
        winner = 'playerTwo';
        roundContinue = false;
      } else if (playerOneTwoOfKindCards[1] === playerTwoTwoOfKindCards[1]) {
        if (playerOneSingleCard > playerTwoSingleCard) {
          winner = 'playerOne';
          roundContinue = false;
        } else if (playerOneSingleCard < playerTwoSingleCard) {
          winner = 'playerTwo';
          roundContinue = false;
        } else if (playerOneSingleCard === playerTwoSingleCard) {
          winner = 'Split Pot';
          roundContinue = false;
        }
      }
    }
  }
  return [winner, roundContinue];
}

module.exports = { twoPairs };
