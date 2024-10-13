var dice1 = Math.ceil(Math.random() * 6);
var dice2 = Math.ceil(Math.random() * 6);
var img1 = "./images/dice" + dice1 + ".png";
var img2 = "./images/dice" + dice2 + ".png";
document.querySelector(".img1").setAttribute("src", img1);
document.querySelector(".img2").setAttribute("src", img2);
if(dice1 > dice2){
    document.querySelector("h1").textContent = "🚩Player 1 Wins!";
}
else if(dice1 < dice2){
    document.querySelector("h1").textContent = "Player 2 Wins!🚩";
}
else{
    document.querySelector("h1").textContent = "Draw!";
}
