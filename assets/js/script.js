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

var totalTime = 60;
var startEl = $("#startQuiz");
var scoreEl = $("#score");
var submitBtnEl = $("#submit");
var highscoreBtnEl = $(".highscoreBtn");
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

  var input = $("#initials").val()
  var score = totalPoints + totalTime;
  highscore = JSON.parse(localStorage.getItem("Highscore")).highscore;
  var allScores = JSON.parse(localStorage.getItem("Highscore")).highscoreArr;

  if (score > highscore) {
    highscore = score;
  }
  allScores.push(input + score);
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
  endQuiz.hide()
  startOverScreen.show()
}

restartBtn.on("click", function () {
  totalTime = 60;
  count = 0;
  totalPoints = 0;
  lastQ = false;
  start.show()
  quiz.hide()
  startOverScreen.hide()
});

function endGame() {
  lastQ = true;
  quiz.hide();
  endQuiz.show()
  var score = totalPoints + totalTime;
  scoreEl.text(score)
}

function answeredRight() {
  totalPoints += 10;
  count++;
  if (totalTime <= 0 || count === questions.length) {
    endGame();
  } else {
    generateQuestions();
  }
}

function answeredWrong() {
  totalPoints -= 5;
  count++;
  totalTime -= 10;
  if (totalTime <= 0 || count === questions.length) {
    endGame();
  } else {
    generateQuestions();
  }
}

startEl.on("click", function () {
  start.hide();
  quiz.show();
  setTheInterval()
  generateQuestions();

});


function setTheInterval(){
    var interval = setInterval(function () {
  totalTime--;
  timerSpan.text('Time Left: ' + totalTime);
  if (lastQ) {
    clearInterval(interval);
  }
}, 1000);}



function generateQuestions() {
  let title = questions[count].title;
  let choices = questions[count].choices;
  let answer = questions[count].answer;
  let choiceEl = $("#choiceBtns");

  $("#quizQ").text(title);
  $("#choiceBtns").text("");

  $.each(choices, function (i, value) {
    let btn = document.createElement("button");
    $(btn).text(value);
    $(choiceEl).append($(btn));
    $(btn).addClass("btn btn-lg btn-block btn-outline-info");
    $(btn).on("click", function () {
      if ($(this).text === answer) {
        answeredRight();
      } else {answeredWrong();}
    });
  });
}
highscoreBtnEl.on("click",function(){
  quiz.hide()
  start.hide()
  startOverScreen.hide()
  endQuiz.hide()

scoresEl.show();
var highscoreArray = JSON.parse(localStorage.getItem('Highscore'))

for (let i = 0; i < highscoreArray.highscoreArr.length; i++) {
  var listScore = document.createElement('li') 
  listScore.textContent= (highscoreArray.highscoreArr[i])
  $('#highscoreDsp').append(listScore)
  
}})

var obj ={
  key:'value'
}