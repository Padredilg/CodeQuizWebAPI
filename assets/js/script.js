//this var represents the Take Quiz button
var takeQuizBtn = document.querySelector("#take-quiz");
var buttonsEl = document.querySelector("#buttons");

var startQuiz = function() {
    //remove takeQuiz button
    takeQuizBtn.remove();

    document.querySelector("#question").textContent = "Quiz will start in 10";

    var startingIn = 1;
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
                document.querySelector("#question").textContent = "Sample Question 1";

                //button 1                
                choice1El = document.createElement("button")
                choice1El.className = "choice";
                choice1El.textContent = "Sample Button 1";
                buttonsEl.appendChild(choice1El);

                //button 2               
                choice2El = document.createElement("button")
                choice2El.className = "choice";
                choice2El.textContent = "Sample Button 2";
                buttonsEl.appendChild(choice2El);

                //button 3          
                choice3El = document.createElement("button")
                choice3El.className = "choice";
                choice3El.textContent = "Sample Button 3";
                buttonsEl.appendChild(choice3El);

                //button 4
                choice4El = document.createElement("button")
                choice4El.className = "choice";
                choice4El.textContent = "Sample Button 4";
                buttonsEl.appendChild(choice4El);

                break;
            case 2:
                document.querySelector("#question").textContent = "Sample Question 2";
                
                break;
            case 3:
                document.querySelector("#question").textContent = "Sample Question 3";

                break;
            case 4:
                document.querySelector("#question").textContent = "Sample Question 4";

                break;
          }
    }

    // document.querySelector("#question").textContent = "Sample Question 1";

    // var choiceEl = document.createElement("button")
    // choiceEl.className = "choice";
    // choiceEl.textContent = "Sample Button";

    // buttonsEl.appendChild(choiceEl);
}

//when Take Quiz is clicked, Start Quiz
takeQuizBtn.addEventListener("click", startQuiz);

//We can make a prepare yourself countdown when quiz will start,
//and only then quiz starts and timer starts