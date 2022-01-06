var questions = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<scripting>", "<script>", "<javascript>"],
    answer: "<script>",
  },
  {
    title: "Where is the correct place to insert a JavaScript?",
    choices: [
      "The <body> section ",
      "Both the <head> section and the <body> section are correct  ",
      "The <head> section",
      "You do not need to 'insert' Javascript",
    ],
    answer: "Both the <head> section and the <body> section are correct  ",
  },
  {
    title:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choices: [
      "<script src='xxx.js'>",
      "<script name='xxx.js'>",
      "<script href='xxx.js'>",
    ],
    answer: "<script src='xxx.js'>",
  },
  {
    title: "The external JavaScript file must contain the <script> tag.",
    choices: ["True", "False"],
    answer: "False",
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: [
      "function:myFunction()",
      "function = myFunction()",
      "function myFunction()",
      "Funducation",
    ],
    answer: "function myFunction()",
  },
  {
    title: "How to write an IF statement in JavaScript?",
    choices: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"],
    answer: "if (i == 5)",
  },
  {
    title: "How does a FOR loop start?",
    choices: [
      "for i = 1 to 5",
      "for (i = 0; i <= 5)",
      "for (i = 0; i <= 5; i++)",
      "for (i <= 5; i++)",
    ],
    answer: "for (i = 0; i <= 5; i++)",
  },
  {
    title: "How can you add a comment in a JavaScript?",
    choices: [
      "*This is a comment*",
      "'This is a comment",
      "<!--This is a comment-->",
      "//This is a comment",
    ],
    answer: "//This is a comment",
  },
  {
    title: "What is the correct way to write a JavaScript array?",
    choices: [
      "var colors = 'red', 'green', 'blue'",
      "var colors = ['red', 'green', 'blue']",
      "var colors = (1:'red', 2:'green', 3:'blue')",
      "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
    ],
    answer: "var colors = ['red', 'green', 'blue']",
  },
  {
    title: "JavaScript is the same as Java.",
    choices: ["True", "False"],
    answer: "False",
  },
];

var timeLeft = 60;
var startEl = $("#startQuiz");
var scoreEl = $("#score");
var submitBtnEl = $("#submit");
var highscoreBtnEl = $("#highscore");
var scoresEl = $("#scores");
var highscore;
var totalPoints = 0;
var lastQ = false;
var count = 0;
var startOverScreen = $("#startOver");
var restartBtn = $("#restartBtn");
var timerSpan = $("#timer");
var start = $("#start");
var quiz = $("#quiz");
var endQuiz = $("#end");

submitBtnEl.on("click", function () {
  if (localStorage.getItem("Highscore") === null) {
    localStorage.setItem(
      "Highscore",
      JSON.stringify({
        highscore: 0,
        highscoreArr: [],
      })
    );
  }

  var input = $("#initials").value;
  var score = totalPoints + totalTime;
  highscore = JSON.parse(localStorage.getItem("Highscore")).highscore;
  var allScores = JSON.parse(localStorage.getItem("Highscore")).highscoreArr;

  if (score > highscore) {
    highscore = score;
  }
  allscores.push(input + score);
  localStorage.setItem(
    "Highscore",
    JSON.stringify({
      highscore,
      highscoreArr: allScores,
    })
  );

  startAgain();
});

function startAgain() {
  endQuiz.style.display = "none";
  startOverScreen.style.display = "flex";
}

restartBtn.on("click", function () {
  totalTime = 60;
  count = 0;
  totalPoints = 0;
  lastQ = false;
  start.style.display = "block";
  quiz.style.display = "none";
  startOverScreen.style.display = "none";
});

function endGame() {
  lastQ = true;
  quiz.style.display = "none";
  end.style.display = "block";
  var score = totalPoints + totalTime;
  scoreEl.textContent = score;
}

function answeredRight() {
  totalPoints + 10;
  count++;
  if (count === questions.length) {
    endGame();
  } else {
    generateQuestions();
  }
}

function answeredWrong() {
  totalPoints -= 5;
  count++;
  totalTime - 10;
  if (count === questions.length) {
    endGame();
  } else {
    generateQuestions();
  }
}

startEl.on("click", function () {
  start.hide()
  quiz.show()
  generateQuestions();

  var interval = setInterval(function () {
    totalTime--;
    timerSpan.innerHTML = totalLeft;
    if (totalTime === 0 || lastQ) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
});
