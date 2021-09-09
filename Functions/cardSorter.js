const { royalFlush } = require('./WinnerFunctions/royalFlush');
const { straightFlush } = require('./WinnerFunctions/straightFlush');
const { fourOfAKind } = require('./WinnerFunctions/fourOfAKind');
const { fullHouse } = require('./WinnerFunctions/fullHouse');
const { flush } = require('./WinnerFunctions/flush');
const { straight } = require('./WinnerFunctions/straight');
const { threeOfAKind } = require('./WinnerFunctions/threeOfAKind');
const { twoPairs } = require('./WinnerFunctions/twoPairs');
const { singlePair } = require('./WinnerFunctions/singlePair');
const { highCard } = require('./WinnerFunctions/highCard');

function cardSorter(roundData) {
  var winner = '';
  roundContinue = true;

  // creating two empty arrays for each player's cards
  playerOneCards = [];
  playerTwoCards = [];

  // splitting the roundData and creating a new array for each card
  const stringSplit = roundData.split(' ');

  // placing the first 5 cards into playerOneCards and the last 5 into playerTwoCards
  for (let i = 0; i < stringSplit.length; i++) {
    if (i < 5) {
      playerOneCards.push(stringSplit[i]);
    } else {
      playerTwoCards.push(stringSplit[i]);
    }
  }

  // -----------------------------------------------------------------
  // Sorting the cards and arranging from highest to lowest (by number)
  const playerOneCardNumbers = [];
  const playerTwoCardNumbers = [];

  for (let i = 0; i < playerOneCards.length; i++) {
    const cardSeperator = playerOneCards[i].split('');
    var cardNumber = cardSeperator[0];
    if (cardNumber === 'A') {
      cardNumber = 14;
    } else if (cardNumber === 'K') {
      cardNumber = 13;
    } else if (cardNumber === 'Q') {
      cardNumber = 12;
    } else if (cardNumber === 'J') {
      cardNumber = 11;
    } else if (cardNumber === 'T') {
      cardNumber = 10;
    } else {
      cardNumber = parseInt(cardNumber);
    }
    playerOneCardNumbers.push(cardNumber);
  }
  playerOneCardNumbers.sort(function (a, b) {
    return b - a;
  });

  for (let i = 0; i < playerTwoCards.length; i++) {
    const cardSeperator = playerTwoCards[i].split('');
    var cardNumber = cardSeperator[0];
    if (cardNumber === 'A') {
      cardNumber = 14;
    } else if (cardNumber === 'K') {
      cardNumber = 13;
    } else if (cardNumber === 'Q') {
      cardNumber = 12;
    } else if (cardNumber === 'J') {
      cardNumber = 11;
    } else if (cardNumber === 'T') {
      cardNumber = 10;
    } else {
      cardNumber = parseInt(cardNumber);
    }
    playerTwoCardNumbers.push(cardNumber);
  }

  playerTwoCardNumbers.sort(function (a, b) {
    return b - a;
  });

  // sorting card suite in alphabetical order
  const playerOneCardSuites = [];
  const playerTwoCardSuites = [];

  for (let i = 0; i < playerOneCards.length; i++) {
    const cardSeperator = playerOneCards[i].split('');
    var cardSuite = cardSeperator[1];
    playerOneCardSuites.push(cardSuite);
  }
  playerOneCardSuites.sort();

  for (let i = 0; i < playerTwoCards.length; i++) {
    const cardSeperator = playerTwoCards[i].split('');
    var cardSuite = cardSeperator[1];

    playerTwoCardSuites.push(cardSuite);
  }
  playerTwoCardSuites.sort();

  // declaring same suite variables
  let playerOneSameSuite;
  let playerTwoSameSuite;

  // looping through playerOneCardSuites to determine if all the cards are the same suite
  for (let i = 0; i < playerOneCardSuites.length; i++) {
    if (i < 4) {
      if (playerOneCardSuites[i] === playerOneCardSuites[i + 1]) {
        playerOneSameSuite = true;
      } else {
        playerOneSameSuite = false;
        break;
      }
    } else {
      if (playerOneCardSuites[i] === playerOneCardSuites[i - 1]) {
        playerOneSameSuite = true;
      } else {
        playerOneSameSuite = false;
        break;
      }
    }
  }

  // repeats above for player two
  for (let i = 0; i < playerTwoCardSuites.length; i++) {
    if (i < 4) {
      if (playerTwoCardSuites[i] === playerTwoCardSuites[i + 1]) {
        playerTwoSameSuite = true;
      } else {
        playerTwoSameSuite = false;
        break;
      }
    } else {
      if (playerTwoCardSuites[i] === playerTwoCardSuites[i - 1]) {
        playerTwoSameSuite = true;
      } else {
        playerTwoSameSuite = false;
        break;
      }
    }
  }

  // creating a while loop to allow the code to break when a winner is decided
  while (roundContinue) {
    // ----------------------------------------------------------------
    // Utilising the royalFlush function to determine whether the data contains a royalFlush
    if (roundContinue) {
      winner = royalFlush(
        playerOneCardNumbers,
        playerOneSameSuite,
        playerTwoCardNumbers,
        playerTwoSameSuite,
        winner
      );
      [0];
      roundContinue = royalFlush(
        playerOneCardNumbers,
        playerOneSameSuite,
        playerTwoCardNumbers,
        playerTwoSameSuite,
        winner
      );
      [1];
    }

    //-------------------------------------------------------
    // Determining straight flush
    let playerOneStraight;
    let playerTwoStraight;

    // activating the straightFlush function to determine if there is a straight flush, only activates if their wasnt
    // a winner based on a royal flush
    if (roundContinue) {
      winner = straightFlush(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneStraight,
        playerOneSameSuite,
        playerTwoCardNumbers,
        playerTwoStraight,
        playerTwoSameSuite
      )[0];
      roundContinue = straightFlush(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneStraight,
        playerOneSameSuite,
        playerTwoCardNumbers,
        playerTwoStraight,
        playerTwoSameSuite
      )[1];
      playerOneStraight = straightFlush(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneStraight,
        playerOneSameSuite,
        playerTwoCardNumbers,
        playerTwoStraight,
        playerTwoSameSuite
      )[2];
      playerTwoStraight = straightFlush(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneStraight,
        playerOneSameSuite,
        playerTwoCardNumbers,
        playerTwoStraight,
        playerTwoSameSuite
      )[3];
    }

    // ------------------------------------------------------------------
    // Determining four of a kind
    let playerOneSortedDuplicateCards;
    let playerTwoSortedDuplicateCards;
    if (roundContinue) {
      winner = fourOfAKind(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneSortedDuplicateCards,
        playerTwoCardNumbers,
        playerTwoSortedDuplicateCards
      )[0];
      roundContinue = fourOfAKind(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneSortedDuplicateCards,
        playerTwoCardNumbers,
        playerTwoSortedDuplicateCards
      )[1];
      playerOneSortedDuplicateCards = fourOfAKind(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneSortedDuplicateCards,
        playerTwoCardNumbers,
        playerTwoSortedDuplicateCards
      )[2];
      playerTwoSortedDuplicateCards = fourOfAKind(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneSortedDuplicateCards,
        playerTwoCardNumbers,
        playerTwoSortedDuplicateCards
      )[3];
    }

    // -----------------------------------------------------------
    // determining full house
    if (roundContinue) {
      winner = fullHouse(
        winner,
        roundContinue,
        playerOneSortedDuplicateCards,
        playerTwoSortedDuplicateCards
      )[0];
      roundContinue = fullHouse(
        winner,
        roundContinue,
        playerOneSortedDuplicateCards,
        playerTwoSortedDuplicateCards
      )[1];
    }

    // ----------------------------------------------------------
    // Determining flush
    if (roundContinue) {
      winner = flush(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneSameSuite,
        playerTwoCardNumbers,
        playerTwoSameSuite
      )[0];
      roundContinue = flush(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneSameSuite,
        playerTwoCardNumbers,
        playerTwoSameSuite
      )[1];
    }

    // ----------------------------------------------------------
    // Determining straight
    if (roundContinue) {
      winner = straight(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneStraight,
        playerTwoCardNumbers,
        playerTwoStraight
      )[0];
      roundContinue = straight(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneStraight,
        playerTwoCardNumbers,
        playerTwoStraight
      )[1];
    }

    // ----------------------------------------------------------
    // Determining three of a kind
    var playerOneCards = {};
    var playerTwoCards = {};
    if (roundContinue) {
      winner = threeOfAKind(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneCards,
        playerOneSortedDuplicateCards,
        playerTwoCardNumbers,
        playerTwoCards,
        playerTwoSortedDuplicateCards
      )[0];
      roundContinue = threeOfAKind(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneCards,
        playerOneSortedDuplicateCards,
        playerTwoCardNumbers,
        playerTwoCards,
        playerTwoSortedDuplicateCards
      )[1];
      playerOneCards = threeOfAKind(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneCards,
        playerOneSortedDuplicateCards,
        playerTwoCardNumbers,
        playerTwoCards,
        playerTwoSortedDuplicateCards
      )[2];
      playerTwoCards = threeOfAKind(
        winner,
        roundContinue,
        playerOneCardNumbers,
        playerOneCards,
        playerOneSortedDuplicateCards,
        playerTwoCardNumbers,
        playerTwoCards,
        playerTwoSortedDuplicateCards
      )[3];
    }

    // ------------------------------------------------------------------------
    // Determining two pairs
    if (roundContinue) {
      winner = twoPairs(
        winner,
        roundContinue,
        playerOneSortedDuplicateCards,
        playerTwoSortedDuplicateCards
      )[0];
      roundContinue = twoPairs(
        winner,
        roundContinue,
        playerOneSortedDuplicateCards,
        playerTwoSortedDuplicateCards
      )[1];
    }

    // --------------------------------------------------------------------
    // Determining single pair
    if (roundContinue) {
      winner = singlePair(
        winner,
        roundContinue,
        playerOneSortedDuplicateCards,
        playerTwoSortedDuplicateCards
      )[0];
      roundContinue = singlePair(
        winner,
        roundContinue,
        playerOneSortedDuplicateCards,
        playerTwoSortedDuplicateCards
      )[1];
    }

    // ----------------------------------------------------------------------------
    // Determining winner based of high card
    if (roundContinue) {
      winner = highCard(playerOneCardNumbers, playerTwoCardNumbers)[0];
      roundContinue = highCard(playerOneCardNumbers, playerTwoCardNumbers)[1];
    }

    if (winner === '') {
      console.log(playerOneCardNumbers);
      console.log(playerTwoCardNumbers);
    }
    if (winner === undefined) {
      console.log(playerOneCardNumbers);
      console.log(playerTwoCardNumbers);
    }
  }
  return winner;
}

module.exports = { cardSorter };
