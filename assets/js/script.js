//this var represents the Take Quiz button
var takeQuizBtn = document.querySelector("#take-quiz");
var buttonsEl = document.querySelector("#buttons");

var startQuiz = function() {
    //remove takeQuiz button
    takeQuizBtn.remove();

    document.querySelector("#question").textContent = "Quiz will start in 10";

    var startingIn = 10;
    var interval = setInterval(function(){
        startingIn --;
        if (startingIn === 0) {
            clearInterval(interval);
            questions();
        }
        else{
            document.querySelector("#question").textContent = "Quiz will start in " + startingIn;
        }
    },1000);   
}

var questions = function(){
    document.querySelector("#question").textContent = "Sample Question 1";

    var choiceEl = document.createElement("button")
    choiceEl.className = "choice";
    choiceEl.textContent = "Sample Button";

    buttonsEl.appendChild(choiceEl);
}

//when Take Quiz is clicked, Start Quiz
takeQuizBtn.addEventListener("click", startQuiz);

//We can make a prepare yourself countdown when quiz will start,
//and only then quiz starts and timer starts