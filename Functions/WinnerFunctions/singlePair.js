function singlePair(
  winner,
  roundContinue,
  playerOneSortedDuplicateCards,
  playerTwoSortedDuplicateCards
) {
  //   Declaring variables for player one having a single pair
  let playerOnePair;
  var playerOnePairCard = 0;
  var playerOneHighCards = [];

  // Determines whether a player has a single pair, pushing that pair card number to the playerOnePairCard variable.
  // It will then push each single card into the above array and sort it in order of highest to lowest
  if (playerOneSortedDuplicateCards.length === 4) {
    for (let i = 0; i < playerOneSortedDuplicateCards.length; i++) {
      if (playerOneSortedDuplicateCards[i][1] === 2) {
        playerOnePair = true;
        playerOnePairCard = parseInt(playerOneSortedDuplicateCards[i][0]);
      }
      if (playerOneSortedDuplicateCards[i][1] === 1) {
        playerOneHighCards.push(parseInt(playerOneSortedDuplicateCards[i][0]));
      }
    }
    playerOneHighCards.sort(function (a, b) {
      return b - a;
    });
  }

  // above is repeated for player two
  let playerTwoPair;
  var playerTwoPairCard = 0;
  var playerTwoHighCards = [];

  if (playerTwoSortedDuplicateCards.length === 4) {
    for (let i = 0; i < playerTwoSortedDuplicateCards.length; i++) {
      if (playerTwoSortedDuplicateCards[i][1] === 2) {
        playerTwoPair = true;
        playerTwoPairCard = parseInt(playerTwoSortedDuplicateCards[i][0]);
      }
      if (playerTwoSortedDuplicateCards[i][1] === 1) {
        playerTwoHighCards.push(parseInt(playerTwoSortedDuplicateCards[i][0]));
      }
    }
    playerTwoHighCards.sort(function (a, b) {
      return b - a;
    });
  }

  // Determining who wins with similar logic to previous functions.
  // Main different is the final aspect where a for loop is used to sort through the player...HighCards array
  // in the instance that both players pair is the same number. This will then loop through that array to determine
  // who has the highest card to win
  if (playerOnePair && !playerTwoPair) {
    winner = 'playerOne';
    roundContinue = false;
  } else if (!playerOnePair && playerTwoPair) {
    winner = 'playerTwo';
    roundContinue = false;
  } else if (playerOnePair && playerTwoPair) {
    if (playerOnePairCard > playerTwoPairCard) {
      winner = 'playerOne';
      roundContinue = false;
    } else if (playerOnePairCard < playerTwoPairCard) {
      winner = 'playerTwo';
      roundContinue = false;
    } else if (playerOnePairCard === playerTwoPairCard) {
      for (let i = 0; i < playerOneHighCards.length; i++) {
        if (playerOneHighCards[i] > playerTwoHighCards[i]) {
          winner = 'playerOne';
          roundContinue = false;
          break;
        } else if (playerOneHighCards[i] < playerTwoHighCards[i]) {
          winner = 'playerTwo';
          roundContinue = false;
          break;
        }
        if (i === 3) {
          if (roundContinue) {
            if (playerOneHighCards[i] === playerTwoHighCards[i]) {
              winner = 'Split Pot';
              roundContinue = false;
            }
          }
        }
      }
    }
  }
  return [winner, roundContinue];
}

module.exports = { singlePair };
