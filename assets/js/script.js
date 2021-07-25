// creates an object that holds arrays of questions for the quiz
var questionKey = [
  {
    question: "What is css",
    answer: ["A javascript software", " a framework to describe how an HTML should look", " a node command that starts a test", " central science services"],
    correctAns: 1

  },
  {
    question: "Which of the following should be found in the package.json in order for node to start",
    answer: ["test", " start", "author", "name"],
    correctAns: 1

  },
  {
    question: "What is a command line",
    answer: ["A person who stands in line and gives commands", "a type of line", "a way to control people", "A way to tell your computer to do things"],
    correctAns:4

  },
  {
    question: "What does API stand for?",
    answer: ["Application proccessing Interface", "Artifical Progamming Interface", "Application Programming Interface", "Apple produce industry"],
    correctAns:3

  },
  {
    question: "What does HTML stand for",
    answer: ["Horizontal Textile Making Langauge", "Handling Text Markup Langauge", "Hyper Technical Markup Langauge", "Hypertext Markup Language"],
    correctAns:3

  },
  {
    question: "How many hours should you be studying per week",
    answer: ["0-1 hours", "16-20 hours", "21-30 hours", "0 hours"],
    correctAns:1

  },
  {
    question: "How do you link a javascript in an HTML",
    answer: ["<link src=javascript><link>", "<script src='assets/js/script.js'></script>", "<body>javascript</body>", "<header>javascript</header>"],
    correctAns:1

  },
  {
    question: "What is semantic markup",
    answer:["A simplification of code", "a way to mark things that you've completed in javascript", "Organized and readable code", "Unorganized code"],
    correctAns:2

  },
  {
    question: "What is a for loop",
    answer: ["a timer that repeats function continuosly in css", "a timer that repeats function continuosly in javascript ", "a timer that repeats function continuosly in html", "a timer that repeats function continuosly in linux"],
    correctAns:2

  },
  {
    question: "What is express ",
    answer: ["A javascript that runs in the front-end", "a way to request api from a database", "A primitive data type", "a node runtime application"],
    correctAns:3

  },
  {
    question: "What is a server",
    answer: ["a virtual or invisble machine", "a real person", "a virtual or physical machine", "a way to survive"],
    correctAns:2

  },
  {
    question: "Where is the best place to find an answer you don't know when coding",
    answer: ["the dictionary", "Google it", "Go on twitter", "go on social-media"],
    correctAns:1

  },
  {
    question: "Where is node running",
    answer: ["in the back end of javascript", "in the DOM", "In the front end", "in the brower's console"],
    correctAns:0

  },
  {
    question: "How do we inspect existing code in the browser",
    answer: ["Select all copy and paste it into our code", "control alt", "right-click then inspect", "Close window"],
    correctAns:2

  },
  {
    question: "What term is associated with black box",
    answer: ["server", "DOM", "browser", "terminal"],
    correctAns:0

  },
]


// elements used as variables 
var beginningEl = document.getElementById("beginPage");
var questionCardEl = document.getElementById("questionCard");
var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answerCard");
var timerEl = document.getElementById("timer");

// buttons for quiz as variables
var startBtn = document.getElementById("startBtn");
var signBtn = document.querySelector("#sign");
var theBackButton = document.querySelector("#backBtn");
var deleteScoreBtn = document.querySelector("#deleteScoreBtn");

// event listeners listening for clicks 
startBtn.addEventListener("click", beginQuiz);
answersEl.addEventListener("click", questionNext);
signBtn.addEventListener("click", signResult);
theBackButton.addEventListener("click", backButton);
deleteScoreBtn.addEventListener("click", deleteScore);

var interval;
var allowTime = 110; // total time 110 sec
var onQuestion = 0; // start question at 0

// begin quiz function and clicks to begin
function beginQuiz() {
  hiddenToDisplay();
  countTime();
  questionNext();

}

// a function that countsdown time by 1 sec
function countTime() {
  interval = setInterval(countDown, 1000);

  // function that tells time remaining as time counts down
  function countDown() {
    allowTime--;
    timerEl.innerHTML = "Time Remaining: " + allowTime + " s";
  }
}

// hides from display for questionCard and pages
function hiddenToDisplay() {
  console.log(onQuestion);

  beginningEl.setAttribute("class", "hidden");
  document.getElementById("questionCard").classList.remove("hidden");
  displayQuestion();
}
// displays and appends question card also creats buttons as element
function displayQuestion() {
  questionsEl.textContent = questionKey[onQuestion].question;
  for (var i = 0; i < questionKey[onQuestion].answer.length; i++) {
    var li = document.createElement("button");
    li.setAttribute("class", "answer");
    li.setAttribute("data-answer", i);
    li.innerHTML = questionKey[onQuestion].answer[i];
    answersEl.append(li);

  }
  }

// function that checks the answer and displays the result
function answerChecker(answerVal) {
  var revealAns = document.getElementById("revealAnswer");

  if (answerVal === questionKey[onQuestion].correctAns) {
    revealAns.textContent = "Great"
  }
  else {
    revealAns.textContent = "Oop"
    allowTime = allowTime - 10;
  }
}
// clearing question function
function clearQuestion() {
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild)
  }
}

// function to go to the next question using a target to find the button
function questionNext(event) {
  var focusTarget = event.target;

  if (focusTarget.matches("button")) {
    event.preventDefault;
    var answerVal = parseInt(focusTarget.getAttribute("data-answer"))
    answerChecker(answerVal);
    clearQuestion();
    onQuestion++;
    submit(onQuestion);
    
  }
}
// submit final results and asks user to enter initials 
function submit(onQuestion) {
  if (onQuestion <= 14) {
    displayQuestion();
  }
  else {

    questionCardEl.setAttribute("class", "hidden");
    document.getElementById("nameEntry").classList.remove("hidden");
    var keepScore = document.getElementById("results");
    keepScore.innerHTML = "Current Score: " + allowTime;
    stopTime();
  }
}
// function to stop timer
function stopTime() {
  clearInterval(interval);
}
// enter initals with result and stores as localStorage
function signResult() {
  var initalName =  document.getElementById("your-Initials").asset;
  localStorage.setItem(initalName, allowTime);
  finalQuizResults();
}

// show score list and end quiz
function finalQuizResults() {
  document.getElementById("nameEntry").classList.add("hidden");
  document.getElementById("endQuiz").classList.remove("hidden");

  var listScore = document.getElementById("scoreHistory");
  for (var i = 0, len = localStorage.length; i < len; i++) {
    var key = localStorage.key(i);
    var asset = localStorage.getItem(localStorage.key(i));
    let li = document.createElement("li")
    li.textContent =  key + ": " + asset;
    scoreHistory.append(li);
    console.log(li);

  }
}
// go back just reloads the quiz to start over
  function backButton() {
    location.reload();
}
// delete score function clears score from localStorage
function deleteScore() {
  for (i = 0; i < localStorage.length; i++) {
    scoreHistory.remove();
    localStorage.clear();
  }
}