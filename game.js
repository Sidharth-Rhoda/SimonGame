
var userClickedPattern = [];   //pattern to capture user clicked pattern when user click on any button

var gamePattern = [];  //Game pattern randomly generated

var buttonsColors = ["red","blue","green","yellow"];

var level = 0;
var started = false;   //to keep track of the game

function nextSequence(){
  userClickedPattern = [];   //  reseting the suer pattern to start again
  level++;  // level increasing every time when nextSequence function is called
  $("#level-title").html("level " + level);  // updating inner text of h1 tag to level 1 when nextSequence function is called
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonsColors[randomNumber];   //to choose a random color to make game pattern
  gamePattern.push(randomChosenColor);  //pushing color to the end of the game pattern
  $("#" + randomChosenColor).fadeOut().fadeIn();  // to give flash effect to the buttons
  playSound(randomChosenColor);
}

$(".btn").on("click", function(){   //function to detect which button is clicked
    var userChosenColor =  $(this).attr("id");  //to store the id of button clicked
    userClickedPattern.push(userChosenColor);  // adding id of button clicked to the user pattern
    playSound(userChosenColor);
    animatePress(userChosenColor);  // providing animation to the button got clicked
    checkAnswer(userClickedPattern.length-1);  //  providing the index length of the user pattern
});

function playSound(name){  // function to play sound for the button selected and name is the parameter which is used to play sound corresponds to color
      var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
  }

function animatePress(currentColor){  //function to give css effecte to the button got clicked and currentColor is the parameter used to take color value
  $("." + currentColor).addClass("pressed");  //adding css class (pressed) to the button

  setTimeout(function(){
    $("." + currentColor).removeClass("pressed");  // removing css class (pressed) to the button
  },100);
}

$(document).on("keydown", function(){   //function to detect keyboard key pressed and also prevent nextSequence function from triggering again and again
  if(!started){
    $("#level-title").html("level " + level);  // updating inner text of h1 tag to level 0 when game starts for the first time
    nextSequence();
    started = true;
  }
  });

// function to check user clicked answer with the game pattern and currentLevel is teh parameter used to get the index of last answer
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){   //to check the answers whether they are same or not
    if(userClickedPattern.length === gamePattern.length){  //to check the sequence
      setTimeout(function(){   // calling nextSequence function after 1000 miliseconds if the sequence is correct
        nextSequence();
      }, 1000);
    }
  }
  else{
  $("#level-title").html("Game Over, Press Any Key To Restart");   // updating hi tag inner text
    $("body").addClass("game-over"); // adding css class to the whole body
    setTimeout(function(){
      $("body").removeClass("game-over");  // removing css class after 200 miliseconds
    },200);
    playSound("wrong");
    startOver();
  }
}

//   function to start over again by resetting all
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
