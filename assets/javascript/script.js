const questionEls = document.querySelectorAll(".questionElements");
const questionHeadingEl = document.querySelector(".questionHeading");
const answersEl = document.querySelector(".answersList");
const informResultEl = document.querySelector(".informResult");
const highScoreButtonEl = document.querySelector(".highScoreButton");
const startButtonEl = document.querySelector("#startButton");
const introPageEls = document.querySelectorAll(".introPage");
const finishPageEls = document.querySelectorAll(".finishPage");
const countdownEl = document.querySelector("#countdown");
const submitButtonEl = document.querySelector("#submitScore");
const initialsInputEl = document.querySelector("#initialsInput");
const highScorePageEls = document.querySelectorAll(".highScorePage");

let questionLibrary = [
  {
    question: "aggle flaggle klaggel0",
    answers: ["sdf0sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: "sdf0sd1",
  },
  {
    question: "aggle flaggle klaggel1",
    answers: ["sdf1sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: "sdfsdewwww2",
  },
  {
    question: "aggle flaggle klaggel2",
    answers: ["sdfs2d1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: "asdasdas3",
  },
  {
    question: "aggle flaggle klaggel3",
    answers: ["sdf3sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: "asdfggeeee4",
  },
  {
    question: "aggle flaggle klaggel4",
    answers: ["sdfs4d1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 0,
  },
  {
    question: "aggle flaggle klaggel5",
    answers: ["s5dfsd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 1,
  },
  {
    question: "aggle flaggle klaggel6",
    answers: ["sdf6sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 2,
  },
  {
    question: "aggle flaggle klaggel7",
    answers: ["sdf7sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 3,
  },
  {
    question: "aggle flaggle klaggel8",
    answers: ["sdfs8d1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 0,
  },
  {
    question: "aggle flaggle klaggel9",
    answers: ["sdf9sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 1,
  },
  {
    question: "aggle flaggle klaggel10",
    answers: ["sd10fsd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 2,
  },
  {
    question: "aggle flaggle klaggel11",
    answers: ["sdfs11d1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 3,
  },
  {
    question: "aggle flaggle klaggel12",
    answers: ["sdf12sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 0,
  },
  {
    question: "aggle flaggle klaggel13",
    answers: ["sdf13sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 1,
  },
  {
    question: "aggle flaggle klaggel14",
    answers: ["sdf14sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],

    answer: 2,
  },
];
let questionNumber;
let score = 0;
const highScoreString = localStorage.getItem(10);
const highScores = JSON.parse(highScoreString) ?? [];
let interval;

function quiz() {
  score = 0;
  questionNumber = 0;
  let timeLeft = 15;

  countdownEl.innerHTML = "Time: " + timeLeft;
  introPageEls.forEach((element) => {
    element.classList.remove("displayed");
  });
  questionEls.forEach((element) => {
    element.classList.add("displayed");
  });
  displayQuestion();
interval = setInterval(function () {
    timeLeft--;
    countdownEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      gameOver();
    }
  }, 1000);
}

function displayQuestion() {
  answersEl.innerHTML="";
  const tempQuestion = questionLibrary[questionNumber];
  questionHeadingEl.textContent = tempQuestion.question;
  tempQuestion.answers.forEach(function (answer) {
    let tempLi = document.createElement("li");
    tempLi.textContent = answer;
    answersEl.appendChild(tempLi);
  });
} 

function gameOver() {
  questionEls.forEach((element) => {
    element.classList.remove("displayed");
  });
  finishPageEls.forEach((element) => {
    element.classList.add("displayed");
  });
  checkHighScore(score);
}

function checkHighScore(score) {
  const currentHighScores = JSON.parse(localStorage.getItem(10)) ?? [];
  const lowestScore = currentHighScores[9]?.score ?? 0;

  if (score > lowestScore) {
    saveHighScore(score, currentHighScores);
    showHighScores();
  }
}

function saveHighScore(score, highScores) {
  const name = prompt("You got a highscore! Enter name:");
  const newScore = { score, name };

  // 1. Add to list
  highScores.push(newScore);

  // 2. Sort the list
  highScores.sort((a, b) => b.score - a.score);

  // 3. Select new list
  highScores.splice(10);

  // 4. Save to local storage
  localStorage.setItem(10, JSON.stringify(highScores));
}

function showHighScores() {
  const highScores = JSON.parse(localStorage.getItem(10)) ?? [];
  const highScoreList = document.getElementById("highScoreList");

  finishPageEls.forEach((element) => {
    element.classList.remove("displayed");
  });
  highScorePageEls.forEach((element) => {
    element.classList.add("displayed");
  });
  highScoreList.innerHTML = highScores.map(
    (score) => `<li>${score.score} :  ${score.name}`
  );
}

startButtonEl.addEventListener("click", quiz);
answersEl.addEventListener("click", function(event){
  event.stopPropagation;

  const target = event.target;
  if (target.innerHTML ===questionLibrary[questionNumber].answer){
  score++;
  }
  else{
    score--;
  }
    questionNumber++;
    if (questionLibrary.length===questionNumber){
      clearInterval(interval);
          countdownEl.textContent = "";
          gameOver();
    } 
  displayQuestion()
})
