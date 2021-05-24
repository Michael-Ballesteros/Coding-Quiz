const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");
let thisQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let possibleQuesions = [];
const progress = document.getElementById("progress");
const progressEnd = document.getElementById("progressEnd");

// each question will be an object, with a question field, with 4 answers,

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "a",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

// const Correct = 1;
const MAX_QUESTIONS = 5;

startGame=() => {
    questionCounter = 0;
    score = 0;
    possibleQuestions = [...questions];
    console.log(possibleQuestions);
    getNextQuestion();
};

getNextQuestion=()=> {
    if(possibleQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("RecentScore", score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progress.innerText = 'Question ${questionCounter}/${MAX_QUESTIONS}';
    progressEnd.style.width = '${(questionCounter)/ MAX_QUESTIONS) * 100}%';

    const questionIndex = Math.floor(Math.random() * possibleQuestions.length);
    thisQuestion = possibleQuestions[questionIndex];
    question.innerText = thisQuestion.question;

    choices.forEach(choice=> {
        const number= choice.dataset["number"];
        choice.innerText= thisQuestion["choice" + number];
    });

    possibleQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classtoApply = 
            selectedAnswer == thisQuestion.answer ? "correct" : "incorrect";
        if(classtoApply ==="correct") {
            incrementScore(Correct);
        }
    
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        getNextQuestion();
    }, 1000);
  });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();