const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var timerEl = document.querySelector('#timer');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let timeLeft = 20;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
    {
        question: 'Commonly used data types do not include:',
        choice1: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'letters',
        answer: 3,
    },
    {
        question: 'The condition in an if / else statement is enclosed with ______.',
        choice1: 'quotes',
        choice2: 'curly brackets',
        choice3: 'parenthesis',
        choice4: 'square brackets',
        answer: 3,
    },
    {
        question: 'Arrays in JavaScript can be used to store ______.',
        choice1: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer: 4,
    },
    {
        question: 'String values must be enclosed within _____ when being assigned to variables.',
        choice1: 'commas',
        choice2: 'curly brackets',
        choice3: 'quotes',
        choice4: 'parenthesis',
        answer: 3,
    }
]

const DECREMENT_TIME = (-5)
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    countdown()
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

function countdown() {
    var timeInterval = setInterval(function () {
        console.log("TIMELEFT: ", timeLeft)
        timerEl.textContent = timeLeft  + ' seconds remaining';
        timeLeft--;
    if (timeLeft <= 0) {
            timerEl.textContent = 0 
            clearInterval(timeInterval);
            return window.location.assign('./end.html');
        } 
    }, 1000);
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        console.log("TARGET: ", selectedChoice)
        console.log("DATASET: ", selectedAnswer)
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === 'incorrect') {
            decrementTime(DECREMENT_TIME)
        }
        
        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            
        }, 1000)
    })
})

function decrementTime (num) {
    timeLeft += num
    console.log("TIMELEFT: ",timeLeft)
    timerEl.innerText = timeLeft  + ' second remaining';
}

function incrementScore (num) {
    score +=num
    scoreText.innerText = score
}

startGame()