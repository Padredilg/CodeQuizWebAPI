//this var represents the Take Quiz button
var takeQuizBtn = document.querySelector("#take-quiz");
var buttonsEl = document.querySelector("#buttons");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var sectionTitleEl = document.querySelector("#section-title");

var playerName;
var finalScore = 0;
var timeRemaining = 0;

var startQuiz = function() {
    //remove takeQuiz button
    takeQuizBtn.remove();

    //call getPlayerName for player to input name
    playerName = getPlayerName();
    //remove input box

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

//make this function work!
var questions = function(){

    var numQuestions = 4;
    var choice1El;
    var choice2El;
    var choice3El;
    var choice4El;
    //loop through questions and collect answers for score;
    //maybe logic for score is to add an eventListener in each case and then use if statement to 
    //compare if clicked was the right choice, then inside the if include the image and add to score
    //eventually add logic to randomize question order and choices order
    for(var i=1; i<=numQuestions; i++){
        switch (i) {
            case 1:
                questionEl.textContent = "Sample Question 1";
                sectionTitleEl.textContent = "Q " + i + "/" + numQuestions;
                document.getElementById("brain").src="./assets/images/thinking-brain.png";

                //button 1                
                choice1El = document.createElement("button");
                choice1El.id = "tent-1";
                choice1El.className = "choice";
                choice1El.textContent = "Sample Button 1";
                choice1El.setAttribute("option", "correct");
                buttonsEl.appendChild(choice1El);
                
                //button 2               
                choice2El = document.createElement("button");
                choice2El.id = "tent-2";
                choice2El.className = "choice";
                choice2El.textContent = "Sample Button 2";
                choice2El.setAttribute("option", "incorrect");
                buttonsEl.appendChild(choice2El);

                //button 3          
                choice3El = document.createElement("button");
                choice3El.id = "tent-3";
                choice3El.className = "choice";
                choice3El.textContent = "Sample Button 3";
                choice3El.setAttribute("option", "incorrect");
                buttonsEl.appendChild(choice3El);

                //button 4
                choice4El = document.createElement("button");
                choice4El.id = "tent-4";
                choice4El.className = "choice";
                choice4El.textContent = "Sample Button 4";
                choice4El.setAttribute("option", "incorrect");
                buttonsEl.appendChild(choice4El);

                //how to trap user in case 1 until he clicks a choice?
                
                break;
            case 2:
                questionEl.textContent = "Sample Question 2";
                sectionTitleEl.textContent = "Q " + i + "/" + numQuestions;
                
                break;
            case 3:
                questionEl.textContent = "Sample Question 3";
                sectionTitleEl.textContent = "Q " + i + "/" + numQuestions;

                break;
            case 4:
                questionEl.textContent = "Sample Question 4";
                sectionTitleEl.textContent = "Q " + i + "/" + numQuestions;

                break;
          }
    }

    // questionEl.textContent = "Sample Question 1";

    // var choiceEl = document.createElement("button")
    // choiceEl.className = "choice";
    // choiceEl.textContent = "Sample Button";

    // buttonsEl.appendChild(choiceEl);
}

var startTimer = function(){
    timerEl.textContent = "Time Left: 60s";

    var timeLeft = 2;
    var interval = setInterval(function(){
        timeLeft --;
        if (timeLeft === 0) {
            clearInterval(interval);
            //remove timer
            timerEl.remove();
            //change question to time's up!
            questionEl.className = "ending-text";
            questionEl.textContent = "Oops! Time's Up!"
            //include logic to remove all buttons

            //call endQuiz function
            endQuiz();
        }
        else{
            timerEl.textContent = "Time Left: " + timeLeft + "s";
        }
    },1000);
}

var endQuiz = function(){
    var endingIn = 4;
    var interval = setInterval(function(){
        endingIn --;
        if (endingIn === 0) {
            clearInterval(interval);
            questionEl.textContent = "Thank you for playing " + playerName + "! Your final score was " + finalScore + "!";

            //call recordData
            //recordData(playerName, score);

            //call playAgain function
            playAgain();
        }
    },1000);
}

var getPlayerName = function(){

    var nameInputed = "JanPeasant";
    //name must be between 1 and 12 chars

    //create input box to collect name from user.

    return nameInputed;
};

//var recordData = function(){};

var playAgain = function(){
    var playAgainIn = 5;
    var interval = setInterval(function(){
        playAgainIn --;
        if (playAgainIn === 0) {
            clearInterval(interval);
            questionEl.textContent = "Would you like to play again " + playerName + "?";

            //create two buttons: Play Again and See Highest scores

        }
    },1000);
};

//when Take Quiz is clicked, Start Quiz
takeQuizBtn.addEventListener("click", startQuiz);

//We can make a prepare yourself countdown when quiz will start,
//and only then quiz starts and timer starts