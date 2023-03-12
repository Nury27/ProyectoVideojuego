/**
 * GLOBAL VARs
 * 
 * 
 * 
 */
var dotClicked = false;
var adjacents=[];
var markedIdAr=[];
var gameSize;
var markedClass;
var intervalId;



function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function fillUpForm(){
    document.getElementById("nick").value=nick;
    document.getElementById("avatarImg").src=avatarChoosen;
    gameSize = parseInt(size);

}

function MakeGameContainer(){
    document.getElementById("game").style.gridTemplateColumns="repeat("+size+",1fr)"
    document.getElementById("game").style.gridTemplateRows="repeat("+size+",1fr)"


    let items="";
    let color=["red","green"];
    let colorRnd=0;
    for (let i = 0; i < (parseInt(size)*parseInt(size)); i++) {
        colorRnd=getRandomInt(2);
        items+=`<div class="containerItem"><div id="${i}"  class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById("game").innerHTML=items;
}


/**
 * CALCULATE ADJACENT DOTS
 * @date 2023-03-11
 * @param {any} markedId
 * @returns {any}
 */
function calculateAdjacent(markedId){
    adjacents=[];
    //TOP ADJACENT
    if((markedId-gameSize)>=0) adjacents.push(markedId-gameSize);
    //BOT ADJACENT
    if((markedId+gameSize)<(gameSize*gameSize)) adjacents.push(markedId+gameSize);
    //LEFT ADJACENT
    if((markedId%gameSize)>0) adjacents.push(markedId-1);
    //RIGHT ADJACENT
    if(((markedId+1)%gameSize)>0) adjacents.push(markedId+1);

    for (let i = 0; i < adjacents.length; i++) {
        console.log(adjacents[i]);   
    }
}

/**
 * Game's count down
 * @date 2023-03-11
 * @returns {any}
 */
function countdown(){
    let leftTime=parseInt(document.getElementById('leftTime').value)-1;
    document.getElementById("leftTime").value=leftTime;
    if(leftTime==0){
        clearInterval(intervalId);
        //STOP ALL EVENTS
        const items=document.getElementsByClassName('item');
        for (let item of items){
            item.removeEventListener('mousedown', startMarking);
            item.removeEventListener('mouseover', keepMarking);
        }
        document.removeEventListener('mouseup', stopMarking);
        //CHANGE SCREEN INDEX
        document.getElementById("endGame").classList.add('endGameColor');
        document.getElementById("endGame").style.zIndex='2';
        document.getElementById("game").style.zIndex='1';
        document.getElementById("playAgain").addEventListener("click",(e)=>location.reload())

    }
}

    // ADD EVENTS
function programGameEvents(){
    const items=document.getElementsByClassName('item');
    for (let item of items){
        item.addEventListener('mousedown', startMarking);
        item.addEventListener('mouseover', keepMarking);
    }
    document.addEventListener('mouseup', stopMarking);
    
    // COUNTDOWN
    intervalId=setInterval(countdown, 1000);
} 

    //GAME FUNCTIONS//
/**
 * Start marking dots
 * @date 2023-03-10
 * @param {any} event
 * @returns {any}
 */
function startMarking(event){
    let item=event.target;
    let containerItem=event.target.parentElement;
    if(item.classList.contains('red')){
        markedClass="red";
        containerItem.classList.add('red');
    }
    else {
        markedClass="green";
        containerItem.classList.add('green');
    }
    if(!dotClicked) dotClicked=true;
    console.log('clicking a circle') 


    //SAVE MARKED DOOTS
    markedIdAr.push(parseInt(item.id));
    calculateAdjacent(parseInt(item.id));



}

/**
 * Mark dots after clicking one & hold
 * @date 2023-03-10
 * @param {any} event
 * @returns {any}
 */
function keepMarking(event){
    if (dotClicked){
        let item=event.target;
        let newId=parseInt(item.id);
        //IS ADJACENT & SAME COLOR?
        if(adjacents.includes(newId) && item.classList.contains(markedClass))
        {
            let containerItem=event.target.parentElement;
            if(item.classList.contains('red')) containerItem.classList.add('red');
            else containerItem.classList.add('green');
            markedIdAr.push(parseInt(item.id));
            calculateAdjacent(parseInt(item.id));
        } 
    }
}

/**
 * Stop marking dots when stop holding click
 * @date 2023-03-10
 * @param {any} event
 * @returns {any}
 */
function stopMarking(event){
    dotClicked=false;
    adjacents=[];
    //ADD SCORE
    const scoreInput=document.getElementById("score");
    if(markedIdAr.length>1){
        scoreInput.value=parseInt(scoreInput.value)+markedIdAr.length;
    }

    for (let i = 0; i < markedIdAr.length; i++) {
        //GET OBJECT
        let markedItem = document.getElementById(markedIdAr[i]);
        markedItem.parentElement.classList.remove(markedClass);
        //CHANGE OBJET COLOR TO RANDOM COLOR
        let color=['red','green'];
        let colorRnd=getRandomInt(2);
        markedItem.classList.remove(markedClass);
        markedItem.classList.add(color[colorRnd]);
    }
    markedIdAr =[];

}

// GET USER DATA
getUserData();

if(!checkUserData()) location="index.html";
fillUpForm();
MakeGameContainer();
programGameEvents();