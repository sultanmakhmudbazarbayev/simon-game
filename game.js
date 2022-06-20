
// available buttons
var buttonColours = ["red", "blue", "green", "yellow"];

// random-puttern of buttons
var gamePattern = [];

// user-pattern of buttons
var userClickedPattern = [];

// start of the game
var started = false;

// level for each game
var level = 1;

// pointer for animation
var userPointer = 0;

// turn of each button user clicked
var turn = 0;

// interval-animation for showing gamePattern
var intervalId;

// is answer of a user wrong or correct
var wrongAn = false;

// is animation going now or not
var animation=false;


// Game starts with any key pressed
$(document).keypress(function() {
    // We start the game if it wasn't started, randomly choose button and add it to gamePattern
    if(!started) {
        started = true;
        $("h1").text("Level " + level);

        var randomNumber = Math.floor(Math.random()*4);
        var randomColor = buttonColours[randomNumber];

        gamePattern.push(randomColor);
        
        $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomColor);       
    }
})


// Checking click of every button
$(".btn").click( function () {

    // if game is started and animation is going then we set variable animation to true and change h1 text, else animation is false
    if(started && userPointer > 0 && userPointer < gamePattern.length) {
        animation = true;
        $("h1").text("Level " + level + "..");
    } else {
        animation = false;
    }

    // if we have buttons in gamePattern and animation isn't going we count every click of every button until the order is correct
    if(!animation && gamePattern.length > 0) {

    // if game started user have to click until the order will match with buttons in gamePattern or untill user's answer won't be correct    
    if(started && turn < gamePattern.length) {
        var userChosenColour = $(this).attr("id");
        if(userChosenColour === gamePattern[turn]) {
            
           // animation part
            $("#" + gamePattern[turn]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[turn]);
            turn++;
            console.log(turn + "turn");
            wrongAn = false;
        } else {
            // if user clicked the wrong button game will be restarted with any key on the keyboard
            wrongAnswer();
            wrongAn = true;
            turn = 0;
            started = false;
            level=1;
            clearInterval(intervalId);
            gamePattern = [];
            userPointer=0;
        }
        
        
    }
    // iff user clicked every button on the correct order, new button will be pushed into gamePattern which will create a new level of the game
    if(turn === gamePattern.length) {
        if(!wrongAn){
            var randomNumber = Math.floor(Math.random()*4);
            var randomColor = buttonColours[randomNumber];

            gamePattern.push(randomColor);

            playPattern();
            level++;
            $("h1").text("Level " + level);
            turn=0;
        }
        else {
            level = 1;
        }
    }
    }

} );

// we use setInterval build in function to play buttons in the right pattern
function playPattern() {
    intervalId = setInterval(playButton, 800);
  }

// we use userPointer to 
function playButton() {
    if(userPointer < gamePattern.length) {
        $("h1").text("Level " + level + "..");

        $("#" + gamePattern[userPointer]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[userPointer]);

        userPointer++;
    } else {
        clearInterval(intervalId);
        $("h1").text("Level " + level);
        userPointer=0;
    }
}

// playing sound when clicking a button
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// animation for a wrong answer
function wrongAnswer() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
        $("body").removeClass("game-over", 500);
    })
}

