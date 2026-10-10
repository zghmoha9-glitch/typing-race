const car = document.getElementById("car");
const word = document.getElementById("word");
const startsound = document.getElementById("startsound");
const count = document.getElementById("count");
const given_word = document.getElementById("given_word");
const pop = document.getElementById("pop");
//global varaiables
const words_list = ["easy","algorithems" ,"too slow" ,"think fast","quickly","hi"];
let counter = 40;
let input = "";
let text = "";
let new_round=true;
function random(min, max) {
    //generate random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Pop() {
    //pop and emptying the header
    pop.style.zIndex = "1";
    word.textContent = "";
    //counting
    count.style.animation = `counter 4s  linear`;
    let counting = setInterval(() => {
        if (counter === 0) {
            //at the end we stop counting ,removing the pop , starting the car and making the nesacery changes to be ready next time
            clearInterval(counting);
            counter = 41;
            count.textContent = 3;
            count.style.animation = "none"
            keyBoardReady();
            pop.style.zIndex = "-1";
            car.style.animationPlayState = "running";
        }
        //updating the counting
        if (counter % 10 === 0) {
            if (counter != 10) {
                //update the ui
                count.textContent = counter / 10 - 1;
            } else {
                //race start
                count.textContent = "GO !!!"
                startRaceSound();
            }
        }
        counter--;
    }, 100);
}
function word_engine() {
    //choosing the word randomly and displaying it
    text = words_list[random(0, words_list.length - 1)];
    given_word.textContent = text;
}
function carReady() {
    //generate random speed and logging
    let x = random(1, 3);
    console.log(`the random time:${x}`);
    //adding animation
    car.style.animation = `move ${x}s 0.5s ease-in-out both`;
    car.style.animationPlayState = "paused";
}
function keyBoardReady() {
    //listening for keyboard events
    window.onkeydown = function (e) {
        //logging
        console.log(`your key : ${e.key}`);
        //knowing which key pressed(we checked if key length is 1 to make sure there is no neta keys)
        if (String(e.key).length <= 1) {
            //user typed text and view update accordinaly
            input += String(e.key);
            word.textContent = input;
        } else if (String(e.key) == "Backspace") {
            //normal backspace functionality
            input = input.slice(0, input.length - 1);
            word.textContent = input;
        }
        //checking wining state
        if (input === text) {
            //upadate the ui for wining and preparing for next round
            car.style.animationPlayState = "paused";
            car.style.opacity=0;
            //car vanish
            setTimeout(() => {
                car.style.animation="none"
                car.style.opacity=1;
            }, 1500)
            //ui and user input update and disable keyboard
            word.textContent = "you win";
            new_round=true;
            window.onkeydown = null;
            input = "";
        }
        //logging
        console.log(`your input: ${input}`);
    };
}

car.onanimationend = function () {
    //loosing state , updating ui and user input, disable the keyboard
    new_round=true;
    window.onkeydown = null;
    word.textContent = "you loose HAHAHA!";
    car.style.animation = `park 3s 0.5s ease-out both`;
    input = "";
};
function startRaceSound() {
    //the horn sound
    startsound.currenttime = 0;
    startsound.play();
};
//game start
window.onkeyup = function (e) {
    console.log(e)
    if (String(e.key)==="Enter" && new_round===true ) {
        carReady();
        word_engine();
        Pop();
        new_round=false;
    }
};
// the sound of loading
window.onload = function () {
    startsound.currenttime = 0;
    startsound.play();
};