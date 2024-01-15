'use strict';


// Selecting elements - scores, dice
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // (faster) another way to get HTML id
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');


// initiallization of scores
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden'); // hide the dice initially


let score, currentscore, activePlayer, playing; //just declaring, values will be assigned from function initialization


const initialization = function () {
  score = [0, 0]; //position wise = player 1(0th element), Player 2 (1st element in array)
  currentscore = 0; //value to hold the score
  activePlayer = 0; //Player 1
  playing = true;


  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;


  diceEl.classList.add('hidden'); // hide the dice initially
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // will by default be the first player. hence no need to readd it.
  player1El.classList.remove('player--active');
};


initialization();


const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};


//Rolling the dice
buttonRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate a random number
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);


    // 2. display dice with Image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;


    // 3. check for 1, if true -> add scores
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
      // current0El.textContent = currentscore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});


buttonHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    score[activePlayer] += currentscore; //score [0]/ score[1]
    // score[1] = score[1] + currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];


    // 2. check score if atleast 100  - finish
    if (score[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');


      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // 3. switch to next player
      switchPlayer();
    }
  }
});


buttonNew.addEventListener('click', initialization);
console.log('clicked');
