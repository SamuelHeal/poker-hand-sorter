function threeOfAKind(
  winner,
  roundContinue,
  playerOneCardNumbers,
  playerOneCards,
  playerOneSortedDuplicateCards,
  playerTwoCardNumbers,
  playerTwoCards,
  playerTwoSortedDuplicateCards
) {
  let playerOneThreeOfAKind;
  var playerOneThreeOfKindCard = 0;

  playerOneCardNumbers.forEach(function (duplicates) {
    playerOneCards[duplicates] = (playerOneCards[duplicates] || 0) + 1;
  });

  // this determines whether the player has any card that appears three times
  if (playerOneSortedDuplicateCards.length === 3) {
    for (let i = 0; i < playerOneSortedDuplicateCards.length; i++) {
      if (playerOneSortedDuplicateCards[i][1] === 3) {
        playerOneThreeOfAKind = true;
        playerOneThreeOfKindCard = parseInt(
          playerOneSortedDuplicateCards[i][0]
        );
      }
    }
  }

  // above code repeats for player two

  let playerTwoThreeOfAKind;
  var playerTwoThreeOfKindCard = 0;

  playerTwoCardNumbers.forEach(function (duplicates) {
    playerTwoCards[duplicates] = (playerTwoCards[duplicates] || 0) + 1;
  });

  if (playerTwoSortedDuplicateCards.length === 3) {
    for (let i = 0; i < playerTwoSortedDuplicateCards.length; i++) {
      if (playerTwoSortedDuplicateCards[i][1] === 3) {
        playerTwoThreeOfAKind = true;
        playerTwoThreeOfKindCard = parseInt(
          playerTwoSortedDuplicateCards[i][0]
        );
      }
    }
  }

  // determines who wins based on who has a three of a kind
  // if both players have one, the highest three of a kind wins
  // if no three of a kind, the round will continue
  if (playerOneThreeOfAKind && !playerTwoThreeOfAKind) {
    winner = 'playerOne';
    roundContinue = false;
  } else if (!playerOneThreeOfAKind && playerTwoThreeOfAKind) {
    winner = 'playerTwo';
    roundContinue = false;
  } else if (playerOneThreeOfAKind && playerTwoThreeOfAKind) {
    if (playerOneThreeOfKindCard > playerTwoThreeOfKindCard) {
      winner = 'playerOne';
      roundContinue = false;
    } else if (playerOneThreeOfKindCard < playerTwoThreeOfKindCard) {
      winner = 'playerTwo';
      roundContinue = false;
    }
  }

  return [winner, roundContinue, playerOneCards, playerTwoCards];
}

module.exports = { threeOfAKind };
