"use strict";

// Element Selectors
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, isGameover;

// Starting State
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameover = false;

  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

// Switch the active players
const switchPlayers = function () {
  // Switch active players
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer ? 0 : 1;

  // Change the display of the active player
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling The Dice
rollBtn.addEventListener("click", function () {
  if (isGameover) return;
  // Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // Display the dice value
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  // Check if the dice rolled a 1
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayers();
  }
});

holdBtn.addEventListener("click", function () {
  if (isGameover) return;
  // Add current score to the player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // Check if the player's score is >=100
  if (scores[activePlayer] >= 100) {
    // Finish the game
    isGameover = true;
    diceEl.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayers();
  }
});

newBtn.addEventListener("click", init);
