import { confetti } from "./confetti-js/dist/index.min.js"
'use strict';
console.log("js working");



const questionDiv = document.querySelector("#question");
const answerButtons = document.querySelector("#answerButtons");
const allButtons = document.querySelectorAll("button");
const startBtn = document.querySelector("#startBtn");
const nextBtn = document.querySelector("#nextBtn");
const resultsBtn = document.querySelector("#resultsBtn");
const questionsContainer = document.querySelector("#questionContainer");
const resultsPage = document.querySelector("#resultsPage");
const footer = document.querySelector("#footer");
let shuffledQuestions, shuffledAnswers, questionIndex, score;

/* On click of start button starts quiz,
on click of next button increases the question index and diplays the next question*/
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    questionIndex += 1;
    setUpNextQ();
});
resultsBtn.addEventListener("click", showResults);

 /* Hide the start button, 
 sort the questions in a random order and display them (remove the hidden class), 
 start the index pos and score,
 setup question */
function startQuiz(){
    startBtn.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    questionIndex = 0;
    score = 0;
    questionsContainer.classList.remove("hide");
    footer.classList.remove("hide");
    resultsPage.classList.add("hide");
    resultsPage.innerHTML = "";
    
    setUpNextQ();
}

/* Hide the next button,
remove the answer buttons,
display question */
function setUpNextQ(){
    nextBtn.classList.add("hide");
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    showQuestion(shuffledQuestions[questionIndex]);
}

/* Grab the question div and replace the text w/ the actual question,
create buttons for each answer choice and add the button styles,
add when clicked, do stuff,
display the question tracker*/
function showQuestion(question){
    questionDiv.innerHTML = question.question;
    shuffledAnswers = question.answers.sort(() => Math.random() - .5);
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    })
    footer.innerHTML = `Question: ${questionIndex + 1}/5`;
}


/* Get the selected answer,
if it's the last question, show the restart button,
else, show the next button,
if the selected answer is correct, button turns green (add correct class) and add 1 to the score,
else, button turns red (add incorrect class),
disable ability to click on other buttons*/
function selectAnswer(e){
    const selectedButton = e.currentTarget;
    const correct = selectedButton.dataset.correct;
    const indivBtn = document.querySelectorAll("#answerButtons > button")
    indivBtn.forEach(elem => elem.removeEventListener("click", selectAnswer));
    
    if (shuffledQuestions.length > questionIndex + 1){
        nextBtn.classList.remove("hide");
    }
    else{
        resultsBtn.classList.remove("hide");
        
    }
    if(correct){
        selectedButton.classList.add("correct");
        score += 1;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
}

function showResults(){
    confetti.render();
 
    resultsPage.innerHTML = `<h1>Your Score:</h1>
    <br/>
    <p>${score}/5<p>`;
    resultsPage.classList.remove("hide");
    questionsContainer.classList.add("hide");
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
    resultsBtn.classList.add("hide");
    footer.classList.add("hide");
    
}


const questions = [
    {
        question: "How many miles are between the Earth and the Moon?",
        answers: [
            { text: "120,000 mi", correct: false },
            { text: "470,000 mi", correct: false },
            { text: "240,000 mi", correct: true },
            { text: "350,000 mi", correct: false }
        ]
    },
    {
        question: "What are IU's colors?",
        answers: [
            { text: "Black and Yellow", correct: false },
            { text: "Gold and Blue", correct: false },
            { text: "Orange and Blue", correct: false },
            { text: "Crimson and Cream", correct: true }
        ]
    },
    {
        question: "Which of the following is a hex color code?",
        answers: [
            { text: "rgb(10, 5, 20)", correct: false },
            { text: "#eb4034", correct: true },
            { text: "4°, 82%, 56%", correct: false },
            { text: "rgba(253, 64, 51)", correct: false }
        ]
    },
    {
        question: "Are dogs cute?",
        answers: [
            { text: "yes", correct: true },
            { text: "yes", correct: true }
        ]
    },
    {
        question: "Will classes be online again during Spring semester?",
        answers: [
            { text: "Probably", correct: true },
            { text: "Hopefully", correct: false },
            { text: "Hopefully not", correct: false },
            { text: "Who cares..", correct: false }
        ]
    }
    ]