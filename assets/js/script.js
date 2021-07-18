//this var represents the Take Quiz button
var takeQuizBtn = document.querySelector("#take-quiz");

var startQuiz = function() {
    console.log("Take Quiz was clicked!")
}

//when Take Quiz is clicked, Start Quiz
takeQuizBtn.addEventListener("click", startQuiz);

//We can make a prepare yourself countdown when quiz will start,
//and only then quiz starts and timer starts