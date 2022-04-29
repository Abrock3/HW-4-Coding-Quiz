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

// This is the object that stores the questions and answers to be pulled by the displayQuestion function
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
    question: "What's the largest living animal in the game?",
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
let timeout;
let interval;
let debugMode = false;
let questionNumber = 0;
let score = 0;
let timeLeft = 75;
// Creates a variable to store the high scores, pulling them from local storage if possible
//  The nullish operator is used in case there's no locally stored scores yet, in which case it will return an empty array
let highScores = JSON.parse(localStorage.getItem(10)) ?? [];

// This function is called by an eventlistener, and initiates the quiz, resetting the necessary variables and displaying the correct elements.
function quiz() {
  score = 0;
  questionNumber = 0;
  // included an easy mode to assist others in testing the site for bugs
  debugMode = window.confirm(
    "Would you like to turn on easy mode for this run? The correct answers will be highlighted to assist with testing/debugging."
  );
  timeLeft = 75;
  countdownEl.innerHTML = `Time: ${timeLeft}`;
  introPageEls.forEach((element) => {
    element.classList.remove("displayed");
  });
  questionEls.forEach((element) => {
    element.classList.add("displayed");
  });
  displayQuestion();
  // this will initiate the countdown timer
  interval = setInterval(function () {
    timeLeft--;
    countdownEl.textContent = `Time: ${timeLeft}`;
    if (timeLeft < 0) {
      clearInterval(interval);
      checkHighScore(score);
    }
  }, 1000);
}

// this is called by an event listener at the beginning of the quiz and every time an answer is selected,
//  resetting and repopulating the list element with the new answers and overwriting the question heading with the new question
function displayQuestion() {
  answersEl.innerHTML = "";
  questionHeadingEl.textContent = questionLibrary[questionNumber].question;
  questionLibrary[questionNumber].answers.forEach(function (answer) {
    let tempLi = document.createElement("li");
    tempLi.textContent = answer;
    tempLi.className = "liButtons";
    tempLi.setAttribute("data-answer", answer);
    // This if statement will added an arrow to the correct answer if the user selected easy mode
    if (
      answer ===
        questionLibrary[questionNumber].answers[
          questionLibrary[questionNumber].answer
        ] &&
      debugMode === true
    ) {
      tempLi.append("<--");
    }
    answersEl.appendChild(tempLi);
  });
}

// This will check local storage to see if the accumulated score is good enough to be in the top ten scores and above 0
// if those conditions are met, the function will display the high score input page. If not, it will inform the user that they're just a casual,
// and skip to the high scores page
function checkHighScore(score) {
  countdownEl.textContent = `Time: ${timeLeft}`;
  const currentHighScores = JSON.parse(localStorage.getItem(10)) ?? [];
  const lowestScore = currentHighScores[9]?.score ?? 0;
  questionEls.forEach((element) => element.classList.remove("displayed"));
  informResultEl.classList.remove("displayed");
  if (score > lowestScore) {
    initialsInputEl.value = "";
    document.querySelector(
      "#displayScore"
    ).innerText = `Your final score is ${score}!`;
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

// this will hide and show the proper elements to get to the high scores page; this function can get called by 3 different event listeners,
// one of which can be triggered from any page; this is why so many elements seem unnecessarily hidden
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
  // this will create an li for each high score and append it to the list
  highScores.forEach(function (score) {
    let tempLi = document.createElement("li");
    tempLi.innerHTML = `${score.name}: ${score.score}`;
    highScoreListEl.appendChild(tempLi);
  });
  if (highScores.length === 0) {
    highScoreListEl.innerHTML = "<li>There are no high scores yet!</li>";
  }
}

startButtonEl.addEventListener("click", quiz);

// This event listener determines whether the user clicked on the correct answer, reacts accordingly, and then displays the next question
answersEl.addEventListener("click", function (event) {
  const target = event.target;
  // when the answers are populated, the liButtons class is added to them; this checks to make sure the user is clicking on an answer,
  // not on the list element
  if (target.className === "liButtons") {
    clearTimeout(timeout);
    if (
      target.getAttribute("data-answer") ===
      questionLibrary[questionNumber].answers[
        questionLibrary[questionNumber].answer
      ]
    ) {
      score++;
      informResultEl.innerHTML = `Nice job! Score +1!
        <br>
        Total score: ${score}`;
      informResultEl.classList.add("displayed");
      timeout = setTimeout(function () {
        informResultEl.classList.remove("displayed");
      }, 3000);
    } else {
      score--;
      informResultEl.innerHTML = `Oof. The answer was ${
        questionLibrary[questionNumber].answers[
          questionLibrary[questionNumber].answer
        ]
      }.<br>
      Total score: ${score}`;
      informResultEl.classList.add("displayed");
      timeout = setTimeout(function () {
        informResultEl.classList.remove("displayed");
      }, 3000);
      if (timeLeft > 9) {
        timeLeft = timeLeft - 10;
      } else {
        timeLeft = 0;
      }
      countdownEl.textContent = `Time: ${timeLeft}`;
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

// This event listener will store the high score and initials provided upon clicking the submit button
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
// this event listener will "click" the submit button if the enter key is pressed in the input field
initialsInputEl.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    submitButtonEl.click();
  }
});

// this event listener will determine which state the "view high scores" button is in,
// and depending on that will toggle between the high scores page and the home page
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
// this event listener will clear all high scores on click
clearHighScoresEl.addEventListener("click", function () {
  highScores = [];
  localStorage.clear();
  highScoreListEl.innerHTML = "<li>There are no high scores yet!</li>";
});
// this function will select a random background for the page from 3 subnautica backgrounds; the function is called below
function randomWallpaper() {
  const backgroundArray = [
    "./assets/images/background.jpg",
    "./assets/images/background2.jpg",
    "./assets/images/background3.jpg",
  ];
  wallpaperNum = Math.floor(Math.random() * 3);
  document.body.style.background = `url('${backgroundArray[wallpaperNum]}') no-repeat center center fixed`;
  document.body.style.backgroundSize = "cover";
}
randomWallpaper();
