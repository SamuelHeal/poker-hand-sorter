const fs = require('fs');

// requiring readline in order to use stdin and stdout
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// creating an empty array
const pokerRounds = [];

// using readline to ask the user for the file path to the file they wish to sort
readline.question(
  'What is the path to the poker hand file you wish to sort? ',
  (filePath) => {
    // using fs to read the file
    const allHands = fs.readFileSync(filePath, 'utf-8');
    // pusing the data to the pokerRounds array, splitting them at each new line to distinguish between the rounds
    pokerRounds.push(allHands.split('\n'));
    for (let i = 0; i < pokerRounds[0].length; i++) {
      roundWinner(pokerRounds[0][i]);
    }
    console.log('-------Total Hands Won------');
    console.log('Player 1:', playerOneWins);
    console.log('Player 2:', playerTwoWins);

    readline.close();
  }
);

var roundContinue = true;
var playerOneWins = 0;
var playerTwoWins = 0;
var splitPotTotal = 0;

// Function to determine the winner of each round
function roundWinner(roundData) {
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
    // Determining Royal Flush Winner
    // declaring variables for royal flush
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

    if (winner !== '') {
      roundContinue = false;
    }

    //-------------------------------------------------------
    // Determining straight flush
    let playerOneStraight;
    let playerTwoStraight;
    if (roundContinue) {
      var playerOneSF = false;

      // determining if player one has a straight
      for (let i = 0; i < playerOneCardNumbers.length; i++) {
        if (i < 4) {
          if (playerOneCardNumbers[i] === playerOneCardNumbers[i + 1] + 1) {
            playerOneStraight = true;
          } else {
            playerOneStraight = false;
            break;
          }
        }
      }

      // determining if player one has a straight flush by seeing if they have both a straight and all cards of the same suit
      if (playerOneStraight && playerOneSameSuite) {
        playerOneSF = true;
      } else {
        playerOneSF = false;
      }

      // repeats above for player two

      var playerTwoSF = false;

      for (let i = 0; i < playerTwoCardNumbers.length; i++) {
        if (i < 4) {
          if (playerTwoCardNumbers[i] === playerTwoCardNumbers[i + 1] + 1) {
            playerTwoStraight = true;
          } else {
            playerTwoStraight = false;
            break;
          }
        }
      }

      if (playerTwoStraight && playerTwoSameSuite) {
        playerTwoSF = true;
      } else {
        playerTwoSF = false;
      }

      // If one player has a SF and the other doesnt, the one with it wins
      if (playerOneSF && !playerTwoSF) {
        winner = 'playerOne';
        roundContinue = false;
      }

      if (!playerOneSF && playerTwoSF) {
        winner = 'playerTwo';
        roundContinue = false;
      }

      // if both players have a SF, the player with the highest SF wins
      if (playerOneSF && playerTwoSF) {
        if (playerOneCardNumbers > playerTwoCardNumbers) {
          winner = 'playerOne';
          roundContinue = false;
        } else if (playerOneCardNumbers < playerTwoCardNumbers) {
          winner = 'playerTwo';
          roundContinue = false;
        }
      }

      if (winner !== '') {
        roundContinue = false;
      }
    }

    // ------------------------------------------------------------------
    // Determining four of a kind
    let playerOneSortedDuplicateCards;
    let playerTwoSortedDuplicateCards;
    if (roundContinue) {
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
            playerOneFourOfKindCard = parseInt(
              playerOneSortedDuplicateCards[i][0]
            );
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
            playerTwoFourOfKindCard = parseInt(
              playerTwoSortedDuplicateCards[i][0]
            );
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
    }

    // -----------------------------------------------------------
    // determining full house
    if (roundContinue) {
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
    }

    // ----------------------------------------------------------
    // Determining flush
    if (roundContinue) {
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
    }

    // ----------------------------------------------------------
    // Determining straight
    if (roundContinue) {
      if (playerOneStraight && !playerTwoStraight) {
        winner = 'playerOne';
        roundContinue = false;
      } else if (!playerOneStraight && playerTwoStraight) {
        winner = 'playerTwo';
        roundContinue = false;
      } else if (playerOneStraight && playerTwoStraight) {
        if (playerOneCardNumbers[0] > playerTwoCardNumbers[0]) {
          winner = 'playerOne';
          roundContinue = false;
        } else if (playerOneCardNumbers[0] < playerTwoCardNumbers[0]) {
          winner = 'playerTwo';
          roundContinue = false;
        }
      }
    }

    // ----------------------------------------------------------
    // Determining three of a kind
    const playerOneCards = {};
    const playerTwoCards = {};
    if (roundContinue) {
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
    }

    // ------------------------------------------------------------------------
    // Determining two pairs
    if (roundContinue) {
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
          } else if (
            playerOneTwoOfKindCards[1] === playerTwoTwoOfKindCards[1]
          ) {
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

      // --------------------------------------------------------------------
      // Determining single pair
      if (roundContinue) {
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
              playerOneHighCards.push(
                parseInt(playerOneSortedDuplicateCards[i][0])
              );
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
              playerTwoHighCards.push(
                parseInt(playerTwoSortedDuplicateCards[i][0])
              );
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
      }

      // ----------------------------------------------------------------------------
      // Determining winner based of high card
      if (roundContinue) {
        for (let i = 0; i < playerOneCardNumbers.length; i++) {
          if (playerOneCardNumbers[i] > playerTwoCardNumbers[i]) {
            winner = 'playerOne';
            roundContinue = false;
          } else if (playerOneCardNumbers[i] < playerTwoCardNumbers[i]) {
            winner = 'playerTwo';
            roundContinue = false;
          }
          if (i === 4) {
            if (roundContinue) {
              if (playerOneCardNumbers[i] === playerTwoCardNumbers[i]) {
                winner = 'Split Pot';
                roundContinue = false;
              }
            }
          }
        }
      }
    }
    roundContinue = false;
    if (winner === 'playerOne') {
      playerOneWins++;
    } else if (winner === 'playerTwo') {
      playerTwoWins++;
    } else if (winner === 'Split Pot') {
      splitPotTotal++;
    }
  }
}
