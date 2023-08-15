var timerId;
var time = 10;
var startBtn = document.getElementById('start-game');
var timeEl = document.getElementById('time');
var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var currentQuestionIndex = 0;

function startGame() {
  timerId = setInterval(clockTick, 1000);
  timeEl.textContent = time;
  
  getQuestion();
}

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
    // Handle correct answer
  } else {
    // Handle incorrect answer
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    getQuestion();
  } else {
    gameEnd();
  }
}

function gameEnd() {
  clearInterval(timerId);
}

function clockTick() {
  time--;
  timeEl.textContent = time;

  if (time <= 0) {
    gameEnd();
  }
}

startBtn.onclick = startGame;