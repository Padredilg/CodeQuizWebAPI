var highestName = document.querySelector('#nameHS');
var highestScore = document.querySelector('#scoreHS');
var clearHS = document.querySelector('#clear');

var renderLastRegistered = function(){
    // TODO: Retrieve the last name and score from localStorage
    var lastName = localStorage.getItem("name");
    if(lastName === null){
        return;
    }
  
    var lastScore = localStorage.getItem("score");
    if(lastScore === null){
        return;
    }

    highestName.textContent = "Name: " + lastName;
    highestScore.textContent = "Score: " + lastScore;
};

var clearScores = function(){
    var lastScore = localStorage.getItem("score");
    if(lastScore === null){
        return false;
    }

    var makeSure = confirm("This will reset the highscore. Are you sure you want to continue?");
    if(!makeSure){
        return false;
    }
    localStorage.clear();
};

  renderLastRegistered();
  clearHS.addEventListener("click", clearScores);