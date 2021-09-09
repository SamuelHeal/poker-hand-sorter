function royalFlush(
  playerOneCardNumbers,
  playerOneSameSuite,
  playerTwoCardNumbers,
  playerTwoSameSuite,
  winner
) {
  let playerOneRFNumbers;
  let playerOneRF;
  // ticker to determine if the users highest card is an ace
  var ticker = 14;
  // loops through the users cards to determine if the user has an ace, king, queen, jack and 10 (cards are already in
  // descending order)
  for (let i = 0; i < playerOneCardNumbers.length; i++) {
    if (playerOneCardNumbers[i] === ticker) {
      playerOneRFNumbers = true;
      ticker -= 1;
    } else {
      playerOneRFNumbers = false;
      break;
    }
  }
  // if the player has both the right cards all of the same suite, they are devlared the winner and the round ends
  if (playerOneSameSuite && playerOneRFNumbers) {
    playerOneRF = true;
    winner = 'playerOne';
    roundContinue = false;
  } else {
    playerOneRF = false;
  }
  // above code repeats for player two
  let playerTwoRFNumbers;
  let playerTwoRF;

  var ticker = 14;

  for (let i = 0; i < playerTwoCardNumbers.length; i++) {
    if (playerTwoCardNumbers[i] === ticker) {
      playerTwoRFNumbers = true;
      ticker -= 1;
    } else {
      playerTwoRFNumbers = false;
      break;
    }
  }

  if (playerTwoSameSuite && playerTwoRFNumbers) {
    playerTwoRF = true;
    winner = 'playerTwo';
    roundContinue = false;
  } else {
    playerTwoRF = false;
  }
  return [winner, roundContinue];
}

module.exports = { royalFlush };
