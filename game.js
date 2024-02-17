//extracting all the query from game.html using DOM.
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

//array of object - questions
let questions =[
    {
        question : 'Who wrote the play Romeo and Juliet?',
        choice1: 'Charles Dickens',
        choice2: 'William Shakespeare',
        choice3: 'Jane Austen',
        choice4: 'Mark Twain',
        answer: '2',
    },
    {
        question : ' What is the chemical symbol for gold?',
        choice1: 'Ag',
        choice2: 'Fe',
        choice3: 'Au',
        choice4: 'hg',
        answer: '3',
    },
    {
        question : 'Which planet is known as the Red Planet?',
        choice1: 'Venus',
        choice2: 'Mars',
        choice3: 'Jupiter',
        choice4: 'Saturn',
        answer: '2',
    },
    {
        question : 'What is the capital of France?',
        choice1: 'Paris',
        choice2: 'Berlin',
        choice3: 'Rome',
        choice4: 'Madrid',
        answer: '1',
    },
    {
        question : 'Who is regarded as the Father of the Indian Constitution?',
        choice1: 'Jawaharlal Nehru',
        choice2: 'Mahatma Gandhi',
        choice3: 'Subhash Chandra Bose',
        choice4: 'B.R Ambedkar',
        answer: '4',
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
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

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()