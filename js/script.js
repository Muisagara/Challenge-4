var timerId;
var time = 50;
var startBtn = document.getElementById('start-game');
var timeEl = document.getElementById('time');
var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var currentQuestionIndex = 0;
var feedbackEl = document.getElementById('feedback');
var endScreenEl = document.getElementById('end-screen');
var boxId = document.getElementById('boxId');
var scoreEl = document.getElementById('score');
var scoreValueEl = document.getElementById('score-value');
var submitButton = document.getElementById('submit-button');
var playersNameEl = document.getElementById('player-name');
var restartButton = document.getElementById('restart-button');
var startScreenEl = document.getElementById('start-screen');
var viewScoresbtn = document.getElementById('view-button');
var viewScoresEl = document.getElementById('view-scores');
var clearScoresbtn = document.getElementById('clear-button');
var goBackbtn = document.getElementById('back-button');


function startGame() {
  timerId = setInterval(clockTick, 1000);
  timeEl.textContent = time;
  score = 0
  scoreValueEl.textContent = score
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class' , 'hide');
  questionsEl.removeAttribute('class');
  boxId.removeAttribute('class');

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
    title: 'What does "THIS" mean in as a global variable?' ,
    choices: ['Window' , 'Function' , 'Local Variable' , 'Object'],
    answer: 'Window',
  },
  {
    title: 'When calling a function what should be used at the end ' ,
    choices: ['();' , '{};', '[];' , '</>;'],
    answer: '();',
  },

];

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
    time-=15;
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

function gameEnd() {
  clearInterval(timerId);
  endScreenEl.removeAttribute('class');
  questionsEl.setAttribute('class' , 'hide');
  feedbackEl.setAttribute('class' , 'hide');
  boxId.setAttribute('class', 'hide');
  viewScoresbtn.removeAttribute('class');
  viewScoresEl.removeAttribute('class');

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
  getQuestion();
}
function viewScores(){
  startScreenEl.setAttribute('class' , 'hide');
  endScreenEl.removeAttribute('class');
  viewScoresEl.removeAttribute('class');
  

};

function clearScores(){
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
  
  document.getElementById('clear-button').onclick = clearScores;
goBackbtn.addEventListener('click', clearScores)
viewScoresbtn.addEventListener('click' , viewScores);
restartButton.addEventListener('click', restartGame);
startBtn.onclick = startGame;
console.log(viewScoresbtn);