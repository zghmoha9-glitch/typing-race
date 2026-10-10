const car=document.getElementById("car");
const label=document.getElementById("label");
const word=document.getElementById("word");
const startsound=document.getElementById("startsound");
const count=document.getElementById("count");
const given_word=document.getElementById("given_word");
const words_list=["hi"]//["easy","algorithems" ,"too slow" ,"think fast","quickly","hi"];
const pop=document.getElementById("pop");
let input="";
let text="";
function random(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}
function Pop(){
    pop.style.zIndex="1";
    word.textContent="";
    count.style.animation=`counter 3s  linear`
    setInterval(()=>{
        console.log("hi")
    },4000)

}
function word_engine(){
    text=words_list[random(0,words_list.length - 1)];
    given_word.textContent=text;
}
car.onclick=function(){
    let x=random(1,3);
    console.log(`the random time:${x}`);
    car.style.animation=`move ${x}s 0.5s ease-in-out both`;
    car.style.animationPlayState= "paused";
    word_engine();
    Pop();
};
window.onload=function () {
    startsound.currenttime=0;
    startsound.play();
}
function carstart() {
    count.style.animation=`none`
    window.onkeydown=function(e){
    console.log(`your key : ${e.key}`)
    if (String(e.key).length<=1) {
        input+=String(e.key);
        word.textContent=input
    } else if(String(e.key)=="Backspace"){
        input=input.slice(0,input.length - 1)
        word.textContent=input
        console.log(input)
    }
    if (input===text) {
        car.style.animationPlayState="paused";
        word.textContent="you win";
        car.style.transform="translateX(0vw)";
        window.onkeydown= null;
        input="";
    }
    console.log(`your input: ${input}`)
}
}
car.onanimationstart=function() {
    startsound.currenttime=0;
    startsound.play();
}
car.onanimationend=function() {
    window.onkeydown= null;
    word.textContent="you loose HAHAHA!";
    car.style.animation= `park 3s 0.5s ease-out both`;
    input="";
}
count.onanimationend=function(){
    carstart();
    pop.style.zIndex="-1"
    car.style.animationPlayState= "running";
}
