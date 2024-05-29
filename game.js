// here created an array which has colors of button
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = []; //created an empty array to store the computer pattern of choosing colors
let userClickedPattern = []; //created an empty array to store the user pattern of opting colors
let level = 0; //creating a variable with default as 0
//  created a function which will give animation of computer selected color and play sounds
const nextSequence = () => {
  let randomNumber = Math.floor(Math.random() * 4); //returns 0 - 3 numbers
  let randomChosenColor = buttonColors[randomNumber]; //based on random number cosider it and take color form buttoncolours
  gamePattern.push(randomChosenColor);
  // $(`#${randomChosenColor}`).animate({opacity:0.5})
  playSound(randomChosenColor);
  playAnimations(randomChosenColor);
  level = level + 1;
  $("#level-title").text(`Level ${level}`);
};
//created an event when user clicks the button and then button get animations and play specific sound of button
$(".btn").click(function () {
  userChosenColor = this.id;
  // or
  // userChosenColor = $(this).attr("id")
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColor);
  // playAnimations(userChosenColor)
  animationPressed(userChosenColor);
});
//creating the function which play sound with parameter name
const playSound = (name) => {
  let sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
};
//creating a function for animations when elment computer choses the color
const playAnimations = (currentColor) => {
  $(`#${currentColor}`).fadeOut("fast").fadeIn("fast");
};
//created a function for animation when user click the button or element then add a class and remove it with delay
const animationPressed = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};
//creating variable to check the game is started
let started = false;
//creating to detect the key is pressed
$(document).on("keydown", function (event) {
  if(started!= true){
    started = true;
    nextSequence();
    level = 0;
    $("#level-title").text(`Level ${level}`);
  }
});

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    // console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();  
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any key to Restart");
    startOver()
  }
};

const startOver = () => {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
};
if (level==5){
    alert("you made this far congratulations")
}