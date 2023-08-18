var timerId;
var time = 50;
var currentQuestionIndex = 0;

// all of my other variables 
var timeEl = document.getElementById('time');
var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var feedbackEl = document.getElementById('feedback');
var boxId = document.getElementById('boxId');
var scoreEl = document.getElementById('score');
var scoreValueEl = document.getElementById('score-value');
var playersNameEl = document.getElementById('player-name');

// the Start screens and end screens
var startScreenEl = document.getElementById('start-screen');
var endScreenEl = document.getElementById('end-screen');
var viewScoresEl= document.getElementById('view-scores')
// all the buttons for the HTML
var clearScoresbtn = document.getElementById('clear-button');
var goBackbtn = document.getElementById('back-button');
var submitButton = document.getElementById('submit-button');
var restartButton = document.getElementById('restart-button');
var viewScoresbtn = document.getElementById('view-button');
var startBtn = document.getElementById('start-game');



// When the start button is pressed this function will run and hide the startScreenEl.
function startGame() {
  timerId = setInterval(clockTick, 1000);
  timeEl.textContent = time;
  score = 0
  scoreValueEl.textContent = score
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class' , 'hide');
  questionsEl.removeAttribute('class');
  boxId.removeAttribute('class');
  feedbackEl.removeAttribute('class' , 'hide');


  getQuestion();
}

var questions = [ 
  {
    title: 'True or False. JavaScript is a style sheet?' ,
    choices: ['True' , 'False'],
    answer: 'False',
  },
  {
    title: 'What does event.preventDefault(); do in JavaScript?' ,
    choices: ['Allows the browser to run normal functions.' , 'Will prevent normal action from the browser.', 'Will run a function.', 'Links the browser to your Javascript. '],
    answer: 'Will prevent normal action from the browser.',
  },
  {
    title: 'What does "THIS" mean in a global variable?' ,
    choices: ['Window' , 'Function' , 'Local Variable' , 'Object'],
    answer: 'Window',
  },
  {
    title: 'When calling a function what should be used at the end ' ,
    choices: ['();' , '{};', '[];' , '</>;'],
    answer: '();',
  },

];
// grabbing questions from the arrays that were made
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionsEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = '';

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = document.createElement('button');
    choice.textContent = currentQuestion.choices[i];
    choice.setAttribute('data-answer', currentQuestion.choices[i]);
    choice.onclick = checkAnswer;
    choicesEl.appendChild(choice);
  }
}

function checkAnswer(event) {
  var selectedAnswer = event.target.getAttribute('data-answer');
  var currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!!!";
    currentQuestionIndex++;
    score += 1;
  
  } else {
    feedbackEl.textContent = "Wrong!!!";
    time-=5;
    currentQuestionIndex++;
    feedbackEl.removeAttribute('class')
  }

  scoreValueEl.textContent = score;

  if (currentQuestionIndex < questions.length) {
    getQuestion();
  } else {
    gameEnd();
  }
}
// Starts the End screen 
function gameEnd() {
  clearInterval(timerId);
  endScreenEl.removeAttribute('class');
  questionsEl.setAttribute('class' , 'hide');
  feedbackEl.setAttribute('class' , 'hide');
  boxId.setAttribute('class', 'hide');
  viewScoresbtn.removeAttribute('class');
  viewScoresEl.removeAttribute('class','hide');
  goBackbtn.setAttribute('class', 'hide');
  scoreEl.removeAttribute('class');


}

function clockTick() {
  time--;
  timeEl.textContent = time;

  if (time <= 0) {
    gameEnd();
  }
}
function saveScore() {
  var playersName = playersNameEl.value.trim();

  if (playersName === '') {
    alert("Please enter a name.");
    return;
  }

  // Save player's name and high score to local storage
  var playerData = { name: playersName, score: score };
  localStorage.setItem('playerData', JSON.stringify(playerData));

  updatesaveScores(playersName, score);
  displaySavedScores(); 

  playersNameEl.value = ''; // Clear the input field
}
function updatesaveScores(playerName, playerScore) {
  var savedHighScores = localStorage.getItem('highScores');
  var highScores = savedHighScores ? JSON.parse(savedHighScores) : [];

  highScores.push({ name: playerName, score: playerScore });

  highScores.sort((a, b) => b.score - a.score);

  localStorage.setItem('highScores', JSON.stringify(highScores));
}
function displaySavedScores() {
  var savedHighScores = localStorage.getItem('highScores');
  var highScores = savedHighScores ? JSON.parse(savedHighScores) : [];

  var highScoresList = document.getElementById('high-scores-list');
  highScoresList.innerHTML = '';

  highScores.forEach(function(scoreData) {
    var listItem = document.createElement('li');
    listItem.textContent = scoreData.name + ': ' + scoreData.score;
    highScoresList.appendChild(listItem);
  });
}

displaySavedScores();

submitButton.addEventListener('click', saveScore);
function enterbutton(event){
  if(event.key ==='Enter'){
    saveScore();
    displayPlayerData()
  }

}
// restarts the game when the button is pressed 
function restartGame() {
  clearInterval(timerId); 
  time = 50; 
  score = 0;
  currentQuestionIndex = 0;
  feedbackEl.textContent = ''; 
  timeEl.textContent = time; 
  scoreValueEl.textContent = score; 
  endScreenEl.setAttribute('class', 'hide'); 
  startScreenEl.setAttribute('class' , 'box-starter'); 
  viewScoresbtn.setAttribute('class', 'view-button');
  viewScoresEl.setAttribute('class', 'hide');
  feedbackEl.removeAttribute('class', 'hide');
  getQuestion();
}
function viewScores(){
  startScreenEl.setAttribute('class' , 'hide');
  endScreenEl.removeAttribute('class');
  viewScoresEl.removeAttribute('class');
  submitButton.setAttribute('class' , ' hide');
  restartButton.setAttribute('class' , 'hide');
  playersNameEl.setAttribute('class', ' hide');
  scoreEl.setAttribute('class', ' hide');
  goBackbtn.removeAttribute('class' , 'hide');
};

function clearScores(){
    window.localStorage.removeItem('highScores', 'playerData');
    window.location.reload();
  }
  
// the function the recalls the Startscreen to its default
function restartStartScreen() {
  startScreenEl.classList.remove('hide');
  endScreenEl.setAttribute('class', 'hide');
  viewScoresEl.setAttribute('class', 'hide');
  submitButton.removeAttribute('class' , ' hide');
  restartButton.removeAttribute('class' , 'hide');
  playersNameEl.removeAttribute('class' , 'hide');
startScreenEl.setAttribute('class', 'box-starter');
  feedbackEl.textContent = ''; 
  time = 50;
  timeEl.textContent = time;
  score = 0;
  scoreValueEl.textContent = score;
  currentQuestionIndex = 0;
}

function goBack() {
  restartStartScreen();
}

goBackbtn.addEventListener('click', goBack);
document.getElementById('clear-button').onclick = clearScores;
viewScoresbtn.addEventListener('click' , viewScores);
restartButton.addEventListener('click', restartGame);
startBtn.onclick = startGame;
