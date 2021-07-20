//element pointers
var takeQuizBtn = document.querySelector("#take-quiz");
var buttonsEl = document.querySelector("#buttons");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var sectionTitleEl = document.querySelector("#section-title");
var inputBoxEl = document.querySelector("#input-name");
var formEl = document.querySelector("#collect-name");
var brainEl = document.getElementById("brain");
var notifyEl = document.querySelector("#notifier");

//timer variables
var timeLeft = 60;
var stopNotificationIn = 1;//if change this time, update if statement in notifier();
var endingIn = 6;
var playAgainIn = 6;

//player info + questions variables
var playerName = "";
var finalScore = 0;
var questionsArr = [
    {//questionsArr[0]
        question: 'Commonly used data types do NOT include:',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correct: 'alerts'
    },
    {//questionsArr[1]
        question: 'The condition in an if/else statement is enclosed within _____.',
        answers: ['quotation marks', 'curly brackets', 'square brackets', 'parentheses'],
        correct: 'parentheses'
    },
    {//questionsArr[2]
        question: 'Arrays in JavaScript can be used to store _____.',
        answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correct: 'all of the above'
    },
    {//questionsArr[3]
        question: 'String values must be enclosed within _____ when being assigned to variables.',
        answers: ['commas', 'quotation marks', 'curly brackets', 'parentheses'],
        correct: 'quotation marks'
    },
    {//questionsArr[4]
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correct: 'console.log'
    },
]

//possible answers variables
var currQuestion = 0;
var choice1El;
var choice2El;
var choice3El;
var choice4El;

//reward or punishment variables
var numCorrects = 0;
var numIncorrects = 0;

//function declaration starts
var getPlayerName = function(event){
    event.preventDefault();//forces the page not to reload at the end of function
    playerName = document.querySelector("input[id='input-name']").value;

    //when takeQuizBtn is clicked, check to see if  the player name space is empty,
    if(!playerName){
        brainEl.src="./assets/images/angry-brain.png";
        questionEl.textContent = "You must choose a name!";
        return false;//this makes function stop
    }

    formEl.remove();
    startQuiz();
};

var startQuiz = function() {
    sectionTitleEl.textContent = "Good Luck " + playerName + "!";
    brainEl.src="./assets/images/happy-brain.png";
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
            fillButtons();//Buttons receive textContent from questionArr[currentQuestion].answers
            //Change brain image for the first time
            changeBrainImg();
            //calls function that waits for user to click a button
            choices();
        }
        else{
            questionEl.textContent = "Quiz starts in " + startingIn;
        }
    },1000);   
};

var startTimer = function(){
    timerEl.textContent = "Time Left: 60s";

    var interval = setInterval(function(){
        timeLeft --;
        if(currQuestion>=questionsArr.length){
            //stop timer
            clearInterval(interval);
            //remove timer
            timerEl.remove();
            //endQuiz is being called from fillButton()
        }
        else if (timeLeft <= 0) {
            //stop timer
            clearInterval(interval);
            //remove timer
            timerEl.remove();
            //call endQuiz function
            currQuestion = questionsArr.length;
            endQuiz();
        }
        else{
            timerEl.textContent = "Time Left: " + timeLeft + "s";
        }
    },1000);
};

var choices = function(){
    // Apparently this if statement is not needed since we have the one in the fill buttons function
    // if(currQuestion === questionsArr.length - 1){
    //     endQuiz();
    //     return;
    // }
    
    //How to distinguish between which button was clicked?
    choice1El.addEventListener("click", check1);
    choice2El.addEventListener("click", check2);
    choice3El.addEventListener("click", check3);
    choice4El.addEventListener("click", check4);
    //One way is assigning each one with a different function I guess...
};

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
};

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
};

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
    //reward
    finalScore += 20;
    numCorrects++;
    numIncorrects = 0;
    //notifier says under img whether the choice picked was correct or not
    notifier(true);

    changeBrainImg();
};

var incorrect = function(){
    //punishment
    timeLeft -= 10;
    numIncorrects++;//increase num of incorrects
    numCorrects = 0;
    //notifier says under img whether the choice picked was correct or not
    notifier(false);
    
    changeBrainImg();
};

var notifier = function(option){
    //logic to notify
    if(option){
        //say correct under image
        notifyEl.textContent = "Correct! Score +10";
    }
    else{
        //say wrong under image
        notifyEl.textContent = "Wrong! Time -10s";
    }

    //logic to keep var stopNotificationIn on top of file
    if(stopNotificationIn == 0){
        stopNotificationIn++;
    }

    var interval = setInterval(function(){
        stopNotificationIn --;//variable declared in top of file
        if (stopNotificationIn === 0) {
            clearInterval(interval);

            notifyEl.textContent = "";
            
        }
    },1000);
};

var changeBrainImg = function(){

    if(currQuestion == 5 && finalScore == 0){
        brainEl.src="./assets/images/tired-brain.png";
    }
    else if(currQuestion == 5){
        brainEl.src="./assets/images/super-brain.png";
    }
    else if(numCorrects - numIncorrects == 0){
        brainEl.src="./assets/images/thinking-brain.png";
    }
    else if(numCorrects - numIncorrects == 1){
        brainEl.src="./assets/images/happy-brain.png";
    }
    else if(numCorrects - numIncorrects == 2){
        brainEl.src="./assets/images/meditating-brain.png";
    }
    else if(numCorrects - numIncorrects >= 3){
        brainEl.src="./assets/images/strong-brain.png";
    }
    else if(numCorrects - numIncorrects == -1){
        brainEl.src="./assets/images/sad-brain.png";
    }
    else if(numCorrects - numIncorrects == -2){
        brainEl.src="./assets/images/angry-brain.png";
    }
    else if(numCorrects - numIncorrects <= -3){
        brainEl.src="./assets/images/sick-brain.png";
    }
};

var endQuiz = function(){
    recordData();//Save Highest score
    buttonsEl.remove();

    questionEl.className = "ending-text";

    //if finished before time was up
    if(timeLeft>0){
        sectionTitleEl.textContent = "All questions have been answered!";
        brainEl.src="./assets/images/meditating-brain.png";
        questionEl.textContent = "You finished the quiz! Let's see how many points you got..."
        
        var interval = setInterval(function(){
            endingIn --;//variable declared in top of file
            if (endingIn === 0) {
                clearInterval(interval);

                sectionTitleEl.textContent = "I hope you enjoyed my Code Quiz!";
                brainEl.src="./assets/images/thinking-brain.png";
                questionEl.textContent = "Calculating your score...";

                playAgain();
            }
        },1000);
    }
    //if time's up
    else{
        sectionTitleEl.textContent = "You ran out of time!";
        brainEl.src="./assets/images/sad-brain.png";
        questionEl.textContent = "Oops! Time's Up!"
        var interval = setInterval(function(){
            endingIn --;
            if (endingIn === 0) {
                clearInterval(interval);

                sectionTitleEl.textContent = "I hope you enjoyed my Code Quiz!";
                brainEl.src="./assets/images/thinking-brain.png";
                questionEl.textContent = "Calculating your score...";

                playAgain();
            }
        },1000);
    }
};

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
};

var playAgain = function(){
    var interval = setInterval(function(){
        playAgainIn --;//variable declared in top of file
        if (playAgainIn === 0) {
            clearInterval(interval);

            checkScore();//changes section title to score
            changeBrainImg();
            questionEl.textContent = "Play Again?"
            //create two buttons: Play Again and See Highest scores
            createLastButtons();
        }
    },1000);
};

var checkScore = function(){
    if(finalScore > 0){
        sectionTitleEl.textContent = "Congratulations "  + playerName +  "! Your final score is " + finalScore + "!";
    }
    else{
        sectionTitleEl.textContent =  playerName +  ", your final score is " + finalScore + "... You need more practice!";
    }
};

var createLastButtons = function(){
    //create two buttons: Play Again and See Highest scores

    //create a div for new buttons
    var newButtonsDiv = document.createElement("div");
    //give this new div an id and style it to be flex, so the two new buttons may be side by side
    newButtonsDiv.id = "last-buttons";
    //append to <div id="questions-wrapper">
    var questionsSectionWrapper = document.querySelector("#questions-wrapper");
    questionsSectionWrapper.appendChild(newButtonsDiv);

    //create two buttons with a tag and append to buttons div and give them class choice
    var playAgainButton = document.createElement("a");
    playAgainButton.className = "choice";
    playAgainButton.textContent = "Play Again";
    playAgainButton.href = "index.html"
    newButtonsDiv.appendChild(playAgainButton);

    var viewScoresButton = document.createElement("a");
    viewScoresButton.className = "choice";
    viewScoresButton.textContent = "View Highest Score";
    viewScoresButton.href = "scores.html"
    newButtonsDiv.appendChild(viewScoresButton);
    //link one to index.html and another to scores.html
};
//function declaration ends


formEl.addEventListener("submit", getPlayerName);

/*
To Do:
- Transform Highest Score Page in a list with highest scores 
    - Then create button to save score only if player wants
    - Create delete option for each recorded score, like in taskinator

- Create quiz instructions

- Include more questions
    - Then adjust time and reward/punishment for right/wrong choice picked
*/