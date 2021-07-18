//this var represents the highscores button
var viewHighScoresBtn = document.querySelector("#highscores");

//this var represents the Take Quiz button
var takeQuizBtn = document.querySelector("#take-quiz");

//function generateHighScores {
    //write function to generate highscores in the main.  
//}

//function startQuiz {
    //write function to start quiz in the main.
//}
  
//when view Highest Scores is clicked, show High scores
viewHighScoresBtn.addEventListener("click", generateHighScores);

//when Take Quiz is clicked, Start Quiz
viewHighScoresBtn.addEventListener("click", startQuiz);

//We can make a prepare yourself countdown when quiz will start,
//and only then quiz starts and timer starts