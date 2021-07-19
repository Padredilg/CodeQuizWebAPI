//this var represents the Take Quiz button
var takeQuizBtn = document.querySelector("#take-quiz");
var buttonsEl = document.querySelector("#buttons");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var sectionTitleEl = document.querySelector("#section-title");
var inputBoxEl = document.querySelector("#input-name");
var formEl = document.querySelector("#collect-name");

var playerName = "";
var finalScore = 0;
//var currentQuestion = -1;
var timeLeft = 2;
var questionsArr = [
    {//questionsArr[0]
        question: 'Commonly used data types do NOT include:',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correct: 'alerts'
    },
    {//questionsArr[1]
        question: 'The condition in an if/else statement is enclosed within _____.',
        answers: ['quotation marks', 'curly brackets', 'parenthesis', 'square brackets'],
        correct: 'parentheses'
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
            //call questions
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
        else{
            timerEl.textContent = "Time Left: " + timeLeft + "s";
        }
    },1000);
}

var questions = function(){
    //create buttons and append to buttonsEl
}
// var questions = function(){

//     var numQuestions = 4;
//     var choice1El;
//     var choice2El;
//     var choice3El;
//     var choice4El;
//     //maybe logic for score is to add an eventListener in each case and then use if statement to 
//     //compare if clicked was the right choice, then inside the if include the image and add to score
//     //eventually add logic to randomize question order and choices order
//     for(var i=1; i<=numQuestions; i++){
//         switch (i) {
//             case 1:
//                 questionEl.textContent = "Sample Question 1";
//                 sectionTitleEl.textContent = "Q " + i + "/" + numQuestions;
//                 document.getElementById("brain").src="./assets/images/thinking-brain.png";

//                 //button 1                
//                 choice1El = document.createElement("button");
//                 choice1El.id = "tent-1";
//                 choice1El.className = "choice";
//                 choice1El.textContent = "Sample Button 1";
//                 choice1El.setAttribute("option", "correct");
//                 buttonsEl.appendChild(choice1El);
                
//                 //button 2               
//                 choice2El = document.createElement("button");
//                 choice2El.id = "tent-2";
//                 choice2El.className = "choice";
//                 choice2El.textContent = "Sample Button 2";
//                 choice2El.setAttribute("option", "incorrect");
//                 buttonsEl.appendChild(choice2El);

//                 //button 3          
//                 choice3El = document.createElement("button");
//                 choice3El.id = "tent-3";
//                 choice3El.className = "choice";
//                 choice3El.textContent = "Sample Button 3";
//                 choice3El.setAttribute("option", "incorrect");
//                 buttonsEl.appendChild(choice3El);

//                 //button 4
//                 choice4El = document.createElement("button");
//                 choice4El.id = "tent-4";
//                 choice4El.className = "choice";
//                 choice4El.textContent = "Sample Button 4";
//                 choice4El.setAttribute("option", "incorrect");
//                 buttonsEl.appendChild(choice4El);

//                 //how to trap user in case 1 until he clicks a choice?
                
//                 break;
//             case 2:
//                 questionEl.textContent = "Sample Question 2";
//                 sectionTitleEl.textContent = "Q " + i + "/" + numQuestions;
                
//                 break;
//             case 3:
//                 questionEl.textContent = "Sample Question 3";
//                 sectionTitleEl.textContent = "Q " + i + "/" + numQuestions;

//                 break;
//             case 4:
//                 questionEl.textContent = "Sample Question 4";
//                 sectionTitleEl.textContent = "Q " + i + "/" + numQuestions;

//                 break;
//           }
//     }

//     // questionEl.textContent = "Sample Question 1";

//     // var choiceEl = document.createElement("button")
//     // choiceEl.className = "choice";
//     // choiceEl.textContent = "Sample Button";

//     // buttonsEl.appendChild(choiceEl);
// }

var endQuiz = function(){
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
Questions need to create 4 buttons
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