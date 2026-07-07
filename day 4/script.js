let secretNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 10;

function checkGuess(){

let guess = Number(document.getElementById("guess").value);

let message = document.getElementById("message");

if(guess==="" || guess<1 || guess>100){

message.innerHTML="⚠ Enter a number between 1 and 100";

return;

}

attempts--;

document.getElementById("attempts").innerHTML="Attempts Left : "+attempts;

if(guess===secretNumber){

message.innerHTML="🎉 Congratulations! You guessed it!";

message.style.color="#00ff99";

gameOver();

}

else if(attempts===0){

message.innerHTML="💀 Game Over! Number was "+secretNumber;

message.style.color="#ff4444";

gameOver();

}

else if(guess>secretNumber){

message.innerHTML="📈 Too High!";

message.style.color="#ffe066";

}

else{

message.innerHTML="📉 Too Low!";

message.style.color="#87ff65";

}

document.getElementById("guess").value="";

}

function gameOver(){

document.getElementById("guess").disabled=true;

document.querySelector("button").disabled=true;

document.getElementById("restart").style.display="block";

}

function restartGame(){

secretNumber=Math.floor(Math.random()*100)+1;

attempts=10;

document.getElementById("guess").disabled=false;

document.querySelector("button").disabled=false;

document.getElementById("guess").value="";

document.getElementById("message").innerHTML="You have 10 attempts.";

document.getElementById("message").style.color="white";

document.getElementById("attempts").innerHTML="Attempts Left : 10";

document.getElementById("restart").style.display="none";

}