function flush(
  winner,
  roundContinue,
  playerOneCardNumbers,
  playerOneSameSuite,
  playerTwoCardNumbers,
  playerTwoSameSuite
) {
  // uses the already created variables, playerOneSameSuite and playerTwoSameSuite, to determine who wins on a flush
  // uses pretty much the same functionality as above code to determine the winner.
  // if one player has a flush while the other doesn't, the play with a flush wins.
  // if both players have a flush, the player with the highest card wins
  if (playerOneSameSuite && !playerTwoSameSuite) {
    winner = 'playerOne';
    roundContinue = false;
  } else if (!playerOneSameSuite && playerTwoSameSuite) {
    winner = 'playerTwo';
    roundContinue = false;
  } else if (playerOneSameSuite && playerTwoSameSuite) {
    if (playerOneCardNumbers[0] > playerTwoCardNumbers[0]) {
      winner = 'playerOne';
      roundContinue = false;
    } else if (playerOneCardNumbers[0] < playerTwoCardNumbers[0]) {
      winner = 'playerTwo';
      roundContinue = false;
    }
  }
  return [winner, roundContinue];
}

module.exports = { flush };
