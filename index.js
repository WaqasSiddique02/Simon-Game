var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickPattern=[];
var level=0;
var started=false;

$("body").on("keypress",function(event){
    console.log(event.key);
    if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
   }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickPattern.length-1);
});

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickPattern=[];
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
        console.log("success");

        if(userClickPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNo =Math.floor(Math.random()*4);
    var randomChoosenColour=buttonColours[randomNo];
    gamePattern.push(randomChoosenColour);

    $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}