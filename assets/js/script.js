//this var represents the Take Quiz button
var takeQuizBtn = document.querySelector("#take-quiz");
var buttonsEl = document.querySelector("#buttons");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var sectionTitleEl = document.querySelector("#section-title");
var inputBoxEl = document.querySelector("#input-name");
var formEl = document.querySelector("#collect-name");
var brainEl = document.getElementById("brain");

var playerName = "";
var finalScore = 0;
var timeLeft = 60;
var questionsArr = [
    {//questionsArr[0]
        question: 'Commonly used data types do NOT include:',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correct: 'alerts'
    },
    {//questionsArr[1]
        question: 'The condition in an if/else statement is enclosed within _____.',
        answers: ['quotation marks', 'curly brackets', 'parenthesis', 'square brackets'],
        correct: 'parenthesis'
    },
    {//questionsArr[2]
        question: 'Arrays in JavaScript can be used to store _____.',
        answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correct: 'all of the above'
    },
    {//questionsArr[3]
        question: 'String values must be enclosed within _____ when being assigned to variables.',
        answers: ['commas', 'curly brackets', 'quotation marks', 'parenthesis'],
        correct: 'quotation marks'
    },
    {//questionsArr[4]
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correct: 'console.log'
    },
]
var currQuestion = 0;
var choice1El;
var choice2El;
var choice3El;
var choice4El;


var getPlayerName = function(event){
    event.preventDefault();//forces the page not to reload at the end of function
    playerName = document.querySelector("input[id='input-name']").value;

    //when takeQuizBtn is clicked, check to see if  the player name space is empty,
    if(!playerName){
        questionEl.textContent = "You must choose a name!";
        return false;//this makes function stop
    }

    formEl.remove();
    startQuiz();
};

var startQuiz = function() {
    questionEl.textContent = "Quiz starts in 3";

    var startingIn = 3;
    var interval = setInterval(function(){
        startingIn --;
        if (startingIn === 0) {
            //stop preparation countdown
            clearInterval(interval);
            //start timer
            startTimer();
            //create Buttons
            createButtons();//Buttons are created and appended to #buttons div
            //fill buttons with first set of answers and calls fillQuestions inside of it
            fillButtons();//Buttons receive textContent that matches the questtionArr[currentQuestion].answers
            //Change brain image for the first time
            brainEl.src="./assets/images/thinking-brain.png";
            //fill question title and question
            questions();
        }
        else{
            questionEl.textContent = "Quiz starts in " + startingIn;
        }
    },1000);   
}

var startTimer = function(){
    timerEl.textContent = "Time Left: 60s";

    var interval = setInterval(function(){
        timeLeft --;
        if (timeLeft === 0) {
            clearInterval(interval);
            //remove timer
            timerEl.remove();
            //call endQuiz function
            endQuiz();
        }
        else if(currQuestion>=questionsArr.length){
            clearInterval(interval);
            timerEl.remove();
        }
        else{
            timerEl.textContent = "Time Left: " + timeLeft + "s";
        }
    },1000);
}

var questions = function(){

    //check if we are on last question already
    if(currQuestion === questionsArr.length - 1){
        endQuiz();
        return;
    }
    
    //How to distinguish between which button was clicked?
    choice1El.addEventListener("click", check1);
    choice2El.addEventListener("click", check2);
    choice3El.addEventListener("click", check3);
    choice4El.addEventListener("click", check4);
    //One way is assigning each one with a different function I guess...
}

var createButtons = function(){
    //button 1                
    choice1El = document.createElement("button");
    choice1El.className = "choice";
    buttonsEl.appendChild(choice1El);
                
    //button 2               
    choice2El = document.createElement("button");
    choice2El.className = "choice";
    buttonsEl.appendChild(choice2El);

    //button 3          
    choice3El = document.createElement("button");
    choice3El.className = "choice";
    buttonsEl.appendChild(choice3El);

    //button 4
    choice4El = document.createElement("button");
    choice4El.className = "choice";
    buttonsEl.appendChild(choice4El);
}

var fillButtons = function(){

    if(currQuestion === questionsArr.length){
        endQuiz();
        return;
    }

    choice1El.textContent = questionsArr[currQuestion].answers[0];

    choice2El.textContent = questionsArr[currQuestion].answers[1];

    choice3El.textContent = questionsArr[currQuestion].answers[2];

    choice4El.textContent = questionsArr[currQuestion].answers[3];

    fillQuestions();
}

var fillQuestions = function(){
    sectionTitleEl.textContent = "Q " + (currQuestion + 1) + "/" + questionsArr.length;
    questionEl.textContent = questionsArr[currQuestion].question;
};

var check1 = function(){

    if(choice1El.textContent == questionsArr[currQuestion].correct){
        correct();
    }
    else{
        incorrect();
    }

    currQuestion++;
    fillButtons();
};

var check2 = function(){

    if(choice2El.textContent == questionsArr[currQuestion].correct){
        correct();
    }
    else{
        incorrect();
    }

    currQuestion++;
    fillButtons();
};

var check3 = function(){

    if(choice3El.textContent == questionsArr[currQuestion].correct){
        correct();
    }
    else{
        incorrect();
    }

    currQuestion++;
    fillButtons();
};

var check4 = function(){

    if(choice4El.textContent == questionsArr[currQuestion].correct){
        correct();
    }
    else{
        incorrect();
    }

    currQuestion++;
    fillButtons();
};

var correct = function(){
    finalScore += 20;
    //say right under the buttons div
}

var incorrect = function(){
    timeLeft -= 10;
    //say wrong under the buttons div
}

var endQuiz = function(){

    buttonsEl.remove();

    var endingIn = 3;
    questionEl.className = "ending-text";

    //call recordData
    recordData();

    if(timeLeft>0){
        questionEl.textContent = "Congratulations for finishing the quiz!"
        var interval = setInterval(function(){
            endingIn --;
            if (endingIn === 0) {
                clearInterval(interval);
                questionEl.textContent = "Thank you for taking the quiz " + playerName + "! Your final score was " + finalScore + "!";

                //call playAgain function
                playAgain();
            }
        },1000);
    }
    else{
        questionEl.textContent = "Oops! Time's Up!"
        var interval = setInterval(function(){
            endingIn --;
            if (endingIn === 0) {
                clearInterval(interval);
                questionEl.textContent = "Thank you for taking the quiz " + playerName + "! Your final score was " + finalScore + "!";

                //call playAgain function
                playAgain();
            }
        },1000);
    }

    
}

var recordData = function(){
    var lastScore = localStorage.getItem("score");

    if(lastScore === null){
        localStorage.setItem("name", playerName);
        localStorage.setItem("score", finalScore);
    }
    else if(finalScore > lastScore){
        localStorage.setItem("name", playerName);
        localStorage.setItem("score", finalScore);
    }
}

var playAgain = function(){
    var playAgainIn = 5;
    var interval = setInterval(function(){
        playAgainIn --;
        if (playAgainIn === 0) {
            clearInterval(interval);
            questionEl.textContent = "Would you like to take the quiz again " + playerName + "?";

            //create two buttons: Play Again and See Highest scores

        }
    },1000);
};

//when Take Quiz is clicked, Start Quiz
formEl.addEventListener("submit", getPlayerName);




//must fix questions
/* 

At each question, the buttons will contain the current index - possible answers. only one matches the correct
At each turn, if correct is clicked, add score + change image
if incorrect is clicked, decrease time + change image

if run out of questions, remove buttons and call endQuiz.
*/

//must add buttons to play again
/* 
create 2 buttons - 'Play Again' and 'View Highest Score'
Play Again reloads index.html page
View Highest Score loads scores.html page
*/

//Stop the timer when all questions are asked
