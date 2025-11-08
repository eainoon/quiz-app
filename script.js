const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used for links?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  }
];

const quizBox = document.getElementById('quiz-box');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  quizBox.classList.add('active');
  resultBox.classList.remove('active');
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.classList.add('option-btn');
    button.textContent = option;
    button.addEventListener('click', () => selectOption(button, currentQuestion.answer));
    optionsContainer.appendChild(button);
  });

  nextBtn.style.display = "none";
}

function selectOption(button, correctAnswer) {
  const allButtons = document.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  if (button.textContent === correctAnswer) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
    // Highlight correct option
    allButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add('correct');
      }
    });
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.remove('active');
  resultBox.classList.add('active');
  scoreDisplay.textContent = `${score} / ${questions.length}`;
}

restartBtn.addEventListener('click', startQuiz);

// Start the quiz on page load
startQuiz();
