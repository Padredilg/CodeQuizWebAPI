var highestName = document.querySelector('#nameHS');
var highestScore = document.querySelector('#scoreHS');

function renderLastRegistered() {
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
  }

  renderLastRegistered();

  