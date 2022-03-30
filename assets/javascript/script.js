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
const clearHighScoresEl = document.querySelector("#clearHighScoresBtn");

const questionLibrary = [
  {
    question: "What's the name of the biome the main character spawns in?",
    answers: ["Floating Island", "Safe Shallows", "Dunes", "Crash Zone"],
    answer: 1,
  },
  {
    question:
      "Which of the following leviathan-class life forms cannot be harmed?",
    answers: ["Ghost", "Reaper", "Reefback", "Chelicerate"],
    answer: 2,
  },
  {
    question: "What's the name of the mega-corporation Ryley works for?",
    answers: ["Torgal", "Aperture Science", "Joja Corp", "Alterra"],
    answer: 3,
  },
  {
    question:
      "True or False: The unfortunately named gel sack material is only used in one crafting recipe.",
    answers: ["True", "False"],
    answer: 0,
  },
  {
    question:
      "True or False: at the end of the game, Ryley is not the only survivor of the Aurora crash.",
    answers: ["True", "False"],
    answer: 1,
  },
  {
    question: "How does Subnautica keep players from exiting its map borders?",
    answers: [
      "Slow health drain",
      "Forcibly turns player",
      "Invisible wall",
      "Hunts you with monsters",
    ],
    answer: 3,
  },
  {
    question: "What's the lengthiest extant animal in the game?",
    answers: [
      "Reefback Leviathan",
      "Sea Dragon Leviathan",
      "Sea Emperor Leviathan",
      "Reaper Leviathan",
    ],
    answer: 2,
  },
  {
    question:
      "What's the geological structure or landform that houses the entire game map?",
    answers: ["Trench", "Atoll", "Valley", "Crater"],
    answer: 3,
  },
  {
    question:
      "What's the name of the bacterial infection that is being quarantined?",
    answers: ["Shokuna", "Kharaa", "Holcomb", "Quarnica"],
    answer: 1,
  },
  {
    question: "What's the name of the #1 most adorable animal in the game?",
    answers: ["Peeper", "Mesmer", "Cuddlefish", "Sand Shark"],
    answer: 2,
  },
  {
    question:
      "How many characters are actually met in person across both subnautica games?",
    answers: ["0", "2", "5", "6"],
    answer: 1,
  },
];
let debugMode = false;
let timeout;
let questionNumber = 0;
let score = 0;
let interval;
let timeLeft = 75;
let highScores = JSON.parse(localStorage.getItem(10)) ?? [];

function quiz() {
  score = 0;
  questionNumber = 0;
  debugMode = window.confirm(
    "Would you like to turn on debug mode for this run? The correct answers will be highlighted."
  );
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
    if (timeLeft < 0) {
      clearInterval(interval);
      checkHighScore(score);
    }
  }, 1000);
}

function displayQuestion() {
  answersEl.innerHTML = "";
  questionHeadingEl.textContent = questionLibrary[questionNumber].question;
  questionLibrary[questionNumber].answers.forEach(function (answer) {
    let tempLi = document.createElement("li");
    tempLi.textContent = answer;
    tempLi.className = "liButtons";
       tempLi.setAttribute("data-answer", answer);
    if (
      answer ===
        questionLibrary[questionNumber].answers[
          questionLibrary[questionNumber].answer
        ] &&
      debugMode === true
    ){
      tempLi.append("<--")
    }
      answersEl.appendChild(tempLi);
  });
}

function checkHighScore(score) {
  countdownEl.textContent = "Time: " + timeLeft;
  const currentHighScores = JSON.parse(localStorage.getItem(10)) ?? [];
  const lowestScore = currentHighScores[9]?.score ?? 0;
  questionEls.forEach((element) => element.classList.remove("displayed"));
  informResultEl.classList.remove("displayed");
  if (score > lowestScore) {
    initialsInputEl.value = "";
    document.querySelector("#displayScore").innerText =
      "Your final score is " + score + "!";
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
  if (highScores.length === 0) {
    highScoreListEl.innerHTML = "<li>There are no high scores yet!</li>";
  }
}

startButtonEl.addEventListener("click", quiz);

answersEl.addEventListener("click", function (event) {
  const target = event.target;
  if (target.className === "liButtons") {
    clearTimeout(timeout);
    if (
      target.getAttribute("data-answer") ===
      questionLibrary[questionNumber].answers[
        questionLibrary[questionNumber].answer
      ]
    ) {
      score++;
      informResultEl.innerHTML =
        "Nice job! Score +1! <br>  Total score: " + score;
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
        ".<br> Total score: " +
        score;
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
  }
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
initialsInputEl.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    submitButtonEl.click();
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
clearHighScoresEl.addEventListener("click", function () {
  highScores = [];
  localStorage.clear();
  highScoreListEl.innerHTML = "<li>There are no high scores yet!</li>";
});
function randomWallpaper() {
  const backgroundArray = [
    "./assets/images/background.jpg",
    "./assets/images/background2.jpg",
    "./assets/images/background3.jpg",
  ];
  wallpaperNum = Math.floor(Math.random() * 3);
  document.body.style.background =
    "url('" + backgroundArray[wallpaperNum] + "') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
}
randomWallpaper();
