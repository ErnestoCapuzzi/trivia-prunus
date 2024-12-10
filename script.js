const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const shareButton = document.getElementById('share-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const resultContainer = document.getElementById('result-container');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 10;
let timerInterval;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
shareButton.addEventListener('click', shareScore);

function startGame() {
  score = 0;
  scoreElement.innerText = score;
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerInterval);
  timeLeft = 10;
  timerElement.innerText = timeLeft;
  nextButton.classList.add('hide');
  answerButtonsElement.innerHTML = '';
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      disableButtons();
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
      } else {
        endGame();
      }
    }
  }, 1000);
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  setStatusClass(selectedButton, correct);

  if (correct) {
    score++;
    scoreElement.innerText = score;
  }

  disableButtons();
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    endGame();
  }
}

function disableButtons() {
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
    const correct = button.dataset.correct === 'true';
    setStatusClass(button, correct);
  });
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
    element.classList.add('correct-animate'); // Nueva clase para animación
  } else {
    element.classList.add('wrong');
    element.classList.add('wrong-animate'); // Nueva clase para animación
  }
  setTimeout(() => {
    element.classList.remove('correct-animate', 'wrong-animate'); // Remover animación después
  }, 1000); // Duración de la animación
}


function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function endGame() {
  clearInterval(timerInterval);
  questionContainerElement.classList.add('hide');
  showFinalScore();
  shareButton.classList.remove('hide');
}

function showFinalScore() {
  const finalScoreMessage = document.getElementById('final-score-message');
  finalScoreMessage.innerText = `¡Tu puntaje fue de: ${score}!`;
  resultContainer.style.display = 'block';
}

function shareScore() {
  const canvas = document.createElement('canvas');
  canvas.width = 1080; // Tamaño para historia de IG
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  const background = new Image();
  background.src = 'DSC_1414.jpg'; // Fondo para la historia
  background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Texto del puntaje
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Trivia Deportiva - Prunus', canvas.width / 2, 200);

    ctx.fillStyle = '#2e8b57';
    ctx.font = 'bold 100px Arial';
    ctx.fillText(`¡Obtuve ${score} puntos!`, canvas.width / 2, canvas.height / 2);

    // Logo del Gym
    const logo = new Image();
    logo.src = 'PRUNUS FRASES STORIES (15).png';
    logo.onload = () => {
      const logoWidth = 300;  // Ajusta el ancho del logo
      const logoHeight = 500; // Ajusta el alto del logo

      ctx.drawImage(
        logo,
        canvas.width / 2 - logoWidth / 2,    // Centra el logo horizontalmente
        canvas.height - logoHeight - 100,   // Posición vertical, ajustada al alto
        logoWidth,                          // Ancho del logo
        logoHeight                          // Alto del logo
);


      // Descarga la imagen
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'puntaje_trivia.png';
      link.click();
    };
  };
}


const questions = [
  {
    question: '¿Cuántos profes tiene Prunus?',
    answers: [
      { text: '5', correct: false },
      { text: '3', correct: false },
      { text: '9', correct: true },
      { text: '7', correct: false }
    ]
  },
  {
    question: '¿Cuantos años cumplio Prunus?',
    answers: [
      { text: '2', correct: false },
      { text: '3', correct: false },
      { text: '4', correct: true },
      { text: '5', correct: false }
    ]
  },
  {
    question: '¿En que año abrio la sede de Bella Vista?',
    answers: [
      { text: '2021', correct: false },
      { text: '2022', correct: true },
      { text: '2023', correct: false },
      { text: 'ninguna es la correcta', correct: false }
    ]
  },
  {
    question: '¿Quien es la mascota de Prunus?',
    answers: [
      { text: 'Martin', correct: false },
      { text: 'Alex', correct: false },
      { text: 'Locky', correct: false },
      { text: 'Juan', correct: true }
    ]
  },
  {
    question: '¿Como se llama la/el profe de Yoga?',
    answers: [
      { text: 'Belu', correct: true },
      { text: 'Agus', correct: false },
      { text: 'Tomy', correct: false },
      { text: 'Seba', correct: false }
    ]
  },
  {
    question: '¿Quien da las clases de FIT BOX?',
    answers: [
      { text: 'Agus', correct: false },
      { text: 'Rafa', correct: false },
      { text: 'Nacho', correct: false },
      { text: 'Seba', correct: true }
    ]
  },
  {
    question: '¿Que dias hay FIT BOX en Muñiz?',
    answers: [
      { text: 'Lunes', correct: false },
      { text: 'Miercoles', correct: true },
      { text: 'Viernes', correct: false },
      { text: 'Martes', correct: false }
    ]
  }
];
