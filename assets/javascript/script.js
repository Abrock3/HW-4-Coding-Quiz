const highScoreButtonEl = document.querySelector("#highScoreButton");
const introPageEls = document.querySelectorAll(".introPage");
const countdownEl = document.querySelector("#countdown");
const startButtonEl = document.querySelector("#startButton");
const questionEls = document.querySelectorAll(".questionElements");
const questionHeadingEl = document.querySelector(".questionHeading");
const answersEl = document.querySelector(".answersList");
const informResultEl = document.querySelector(".informResult");
const finishPageEls = document.querySelectorAll(".finishPage");
const initialsInputEl = document.querySelector("#initialsInput");
const submitButtonEl = document.querySelector("#submitScore");
const highScorePageEls = document.querySelectorAll(".highScorePage");
const highScoreListEl = document.querySelector("#highScoreList");

const questionLibrary = [
  {
    question: "aggle flaggle klaggel0",
    answers: ["sdf0sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 0,
  },
  {
    question: "aggle flaggle klaggel1",
    answers: ["sdf1sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 1,
  },
  {
    question: "aggle flaggle klaggel2",
    answers: ["sdfs2d1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 2,
  },
  {
    question: "aggle flaggle klaggel3",
    answers: ["sdf3sd1", "sdfsdewwww2", "asdasdas3", "asdfggeeee4"],
    answer: 3,
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
let timeout;
let questionNumber = 0;
let score = 0;
let interval;
let timeLeft = 75;
const highScoreString = localStorage.getItem(10);
const highScores = JSON.parse(highScoreString) ?? [];

function quiz() {
  score = 0;
  questionNumber = 0;
  timeLeft = 75;

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
      countdownEl.textContent = "Time: " + timeLeft;
      clearInterval(interval);
      checkHighScore(score);
    }
  }, 1000);
}

function displayQuestion() {
  answersEl.innerHTML = "";
  const tempQuestion = questionLibrary[questionNumber];
  questionHeadingEl.textContent = tempQuestion.question;
  tempQuestion.answers.forEach(function (answer) {
    let tempLi = document.createElement("li");
    tempLi.textContent = answer;
    answersEl.appendChild(tempLi);
  });
}

function checkHighScore(score) {
  const currentHighScores = JSON.parse(localStorage.getItem(10)) ?? [];
  const lowestScore = currentHighScores[9]?.score ?? 0;
  questionEls.forEach((element) => element.classList.remove("displayed"));
  informResultEl.classList.remove("displayed");
  if (score > lowestScore) {
    initialsInputEl.value= "";
    finishPageEls.forEach((element) => element.classList.add("displayed"));
    window.alert("You got a high score! Enter your initials and submit!");
    return;
  } else {
    window.alert(
      "You didn't get a high score this time. Good luck on your next try!"
    );
    showHighScores();
    return;
  }
}

function showHighScores() {
  clearInterval(interval);
  clearTimeout(timeout);
  const highScores = JSON.parse(localStorage.getItem(10)) ?? [];
  countdownEl.innerText = "";
  document.querySelector("#displayScore").innerText =
    "Your final score is " + score + "!";
  highScoreButtonEl.innerText = "Back to home page";
  highScoreListEl.innerHTML = "";
  informResultEl.classList.remove("displayed");
  introPageEls.forEach((element) => {
    element.classList.remove("displayed");
  });
  finishPageEls.forEach((element) => {
    element.classList.remove("displayed");
  });
    questionEls.forEach((element) => {
      element.classList.remove("displayed");
    });
  highScorePageEls.forEach((element) => {
    element.classList.add("displayed");
  });
  console.log(highScores);
  highScores.forEach(function (score) {
    let tempLi = document.createElement("li");
    tempLi.innerHTML = score.name + ": " + score.score;
    highScoreListEl.appendChild(tempLi);
  });
}

startButtonEl.addEventListener("click", quiz);

answersEl.addEventListener("click", function (event) {
  const target = event.target;
  clearTimeout(timeout);
  if (
    target.innerHTML ===
    questionLibrary[questionNumber].answers[
      questionLibrary[questionNumber].answer
    ]
  ) {
    score++;
    informResultEl.innerHTML = "Nice job! Score +1! <br>  Total score: " + score;
    informResultEl.classList.add("displayed");
    timeout = setTimeout(function () {
      informResultEl.classList.remove("displayed");
    }, 3000);
  } else {
    score--;
    informResultEl.innerHTML =
      "Oof. The answer was " +
        questionLibrary[questionNumber].answers[
      questionLibrary[questionNumber].answer
    ] +
      ".<br> Total score: " + score;
    informResultEl.classList.add("displayed");
    timeout = setTimeout(function () {
      informResultEl.classList.remove("displayed");
    }, 3000);
    if (timeLeft > 9) {
      timeLeft = timeLeft - 10;
    } else {
      timeLeft = 0;
    }
    countdownEl.textContent = "Time: " + timeLeft;
  }
  questionNumber++;
  if (questionLibrary.length === questionNumber) {
    clearInterval(interval);
    checkHighScore(score);
    return;
  }
  displayQuestion();
});

submitButtonEl.addEventListener("click", function () {
  let name = initialsInputEl.value.toUpperCase();
  if (name.length > 1) {
    const newScore = { score, name };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem(10, JSON.stringify(highScores));
    showHighScores();
  } else {
    window.alert("You must type at least two characters in your initials.");
  }
});

highScoreButtonEl.addEventListener("click", function () {
  if (highScoreButtonEl.textContent === "View High Scores") {
    showHighScores();
  } else {
    highScoreButtonEl.innerText = "View High Scores";
    highScorePageEls.forEach((element) => {
      element.classList.remove("displayed");
    });
    introPageEls.forEach((element) => {
      element.classList.add("displayed");
    });
  }
});
function randomWallpaper(){
  const backgroundArray = [
  "./assets/images/background.jpg",
  "./assets/images/background2.jpg",
  "./assets/images/background3.jpg",
]; 
  wallpaperNum = Math.floor(Math.random() * 3);
  document.body.style.backgroundImage= "url('" +backgroundArray[wallpaperNum] +"')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
}
randomWallpaper();