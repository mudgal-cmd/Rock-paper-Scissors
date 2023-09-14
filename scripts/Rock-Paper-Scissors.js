// Fetching the values from local storage.
let score = JSON.parse(localStorage.getItem('Rock-Paper-Scores'));

// Checking if the localStorage doesn't have the item, then setting up a default value.
if (score === null)
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }

let compChoice = '';
let userChoice = '';
updateScoreElement();
let result = '';
function getCompChoice() {

  let randomNumber = 0;
  randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < (1 / 3))
    compChoice = 'rock';

  else if (randomNumber > (1 / 3) && randomNumber < (2 / 3))
    compChoice = 'paper';

  else
    compChoice = 'scissors';
  return compChoice;

}

function getResult(userChoice, compChoice = getCompChoice()) {

  if (userChoice === 'scissors') {
    if (compChoice === 'rock') {
      result = 'You lose.';
      score.losses++;
    }

    else if (compChoice === 'paper') {
      result = ' You win.';
      score.wins++;
    }

    else {
      result = 'Tie.';
      score.ties++;
    }
  }

  else if (userChoice === 'paper') {

    if (compChoice == 'scissors') {
      result = 'You lose.';
      score.losses++;
    }

    else if (compChoice == 'rock') {
      result = 'You win.';
      score.wins++;
    }

    else {
      result = 'Tie.';
      score.ties++;
    }

  }

  else {

    if (compChoice == 'paper') {
      result = 'You lose.';
      score.losses++;
    }


    else if (compChoice == 'scissors') {
      result = 'You win.';
      score.wins++;
    }

    else {
      result = 'Tie.';
      score.ties++;
    }

  }
  localStorage.setItem('Rock-Paper-Scores', JSON.stringify(score));
  updateScoreElement();
  document.querySelector('.js-game-result').innerHTML = result;
  document.querySelector('.js-game-moves').innerHTML = `You
<img src="images/${userChoice}-emoji.png" class="move-image">
<img src="images/${compChoice}-emoji.png" class="move-image">
Computer`;
}

// Event listener functions to pass on the user choice to the getResult function.
document.querySelector('.js-rock-btn').addEventListener('click', ()=>{
  getResult('rock');
});

// triggering actions when a key is pressed.

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    console.log('Chose rock');
    getResult('rock');
  }
  else if(event.key === 'p')
    getResult('paper');

  else if(event.key === 's')
    getResult('scissors');
  
  else if(event.key === 'a')
    autoPlay();

  else if(event.key === 'Backspace')
    resetScore();
});


document.querySelector('.js-scissors-btn').addEventListener('click', () => {
  getResult('scissors');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
  getResult('paper');
});

function updateScoreElement() {
  console.log(score.wins);
  document.querySelector('.js-game-scores').
    innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {

  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('Rock-Paper-Scores');
  updateScoreElement();
  document.querySelector('.js-game-moves').innerHTML = '';
  document.querySelector('.js-game-result').innerHTML = '';

}

const resetScoreBtn = document.querySelector('.reset-score-btn');
const resetScoreConfirmationElement = document.createElement('p');
document.body.appendChild(resetScoreConfirmationElement);

resetScoreBtn.addEventListener('click', ()=>{

  resetScoreConfirmationElement.innerHTML = `Are you sure you want to reset the score? <button class = "js-reset-yes-btn reset-yes-btn">Yes</button><button class = "js-reset-no-btn reset-no-btn">No</button>`;

  console.log(document.querySelector('.js-reset-yes-btn'));

  document.querySelector('.js-reset-yes-btn').addEventListener('click', ()=>{
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('Rock-Paper-Scores');
  updateScoreElement();
  document.querySelector('.js-game-moves').innerHTML = '';
  document.querySelector('.js-game-result').innerHTML = '';
  resetScoreConfirmationElement.innerHTML = '';
  });
  
  document.querySelector('.js-reset-no-btn').addEventListener('click', ()=>{
    resetScoreConfirmationElement.innerHTML = '';
  });
  
});


let intervalId;
let autoPlaying = false; 
let autoPlayBtn = document.querySelector('.js-auto-play-btn');
function autoPlay(){
  console.log('Autoplay called');
  resetScoreConfirmationElement.innerHTML = '';
  if(autoPlaying===false){
    intervalId = setInterval(() => {
      {
        autoPlayBtn.textContent = 'Stop Play';
        let autoFirstChoice = getCompChoice();
        let autoSecondChoice = getCompChoice();
        getResult(autoFirstChoice, autoSecondChoice);
        console.log('getResult called');
        updateScoreElement();
        console.log('update score called');
      }
    },1000);
    autoPlaying = true;
    console.log(`Autoplaying is set to ${autoPlaying}`);
  }
  else{
    autoPlayBtn.textContent = 'Auto Play';
    clearInterval(intervalId);
    autoPlaying=false;
  }
}

autoPlayBtn.addEventListener('click', autoPlay);
