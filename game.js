//Variables and array
var buttonColors = ["red", "blue", "green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var begin = false;

var level = 0;

//Events
setTimeout(() => {
    $("#level-title").text("Press Any Key to Start");
}, (2000));

//To begin the game by pressing any key
$(document).keypress(function(){
    $("#level-title").text("Level " + level);

    nextSequence();
    begin = true;
});

//To detect which button is clicked and adding event listener to it
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    flash(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//Functions

//To start over the game when failed
function startOver(){
    level = 0;
    begin = false;
    gamePattern = [];
}

//To check if user has pressed the buttons in right  order
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        playSound("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

//To increase the level
function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenNumber = buttonColors[randomNumber];
    gamePattern.push(randomChosenNumber);

    flash(randomChosenNumber);
    playSound(randomChosenNumber);
}

//To apply flash effect 
function flash(name){
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
}

//To add pressed class to element
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

//To play the particular sound as per the event
function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}
