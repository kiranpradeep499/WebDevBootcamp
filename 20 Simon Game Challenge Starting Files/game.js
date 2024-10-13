var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function(){
    if(level === 0){
        $("#level-title").text("Level 0");
        nextSequence();
    }
});

$(".btn").click(function(event){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if(gamePattern.length === userClickedPattern.length){
        if(JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)){
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
        else{
            gameOver();
        }
    }
    else{
        if(userClickedPattern.length > gamePattern.length){
            gameOver();
        }
        else{
            for(var i=0; i < userClickedPattern.length; i++){
                if(gamePattern[i] !== userClickedPattern[i]){
                    gameOver();
                }
            }
        }
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}
function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}
function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}