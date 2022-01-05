// keeping track of the quiz state
var currentQuestionIndex = 0;
var time = question.length * 15;
var timerId;

// DOM Elements
var startBtn = document.querySelector("#start");
var questionElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");

//function for starting off the quiz
function startQuiz() {
    var starScreen = document.querySelector("#start-screen");
    startScreen.setAttribute("class", "hide");
    // unhide the questions
    questionsElement.removeAttribute("class");

    getCurrentQuestion();
}

// Get current question and choices
function getCurrentQuestion() {
    var currentQuestionIndex = questions[currentQuestionIndex];
    var titleElement = document.querySelector("#question-title");
    timerElement.textContent = currentQuestion.title;

    questionChoices.textContent = "",

// Alternate using "for loop" instead of "forEach" //
for (var i = 0; i < currentQuestion.choice.lenght; i++) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", currentQuestion.choice[i]);

        choiceNode.textContent = i + 1 + "." + currentQuestion.choice[i];

        questionChoices.appendChild(choiceNode);
    }


}

startBtn.addEventListener("click", startQuiz);