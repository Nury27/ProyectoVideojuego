/**
 * @author Nur Youssef <nuryou27@gmail.com>
 * {@link https://github.com/Nury27/ProyectoVideojuego GitHub}
 */

// INITIALIZING OBJECTS, DOM & VARs

var nickInput;
var sizeInput;
var emailInput;
var formEntry;
var error;
var avatarItems;
var itemImg;
var avatarChoosen;

// if(sessionStorage.getItem("error") != null){
//     error.innerText=sessionStorage.getItem("error");
//     sessionStorage.removeItem("error");
// }

// <!-- =============EVENT FUNCTIONS==================== -->

function checkForm(){

    //CHECK CHANGES

    if(nickInput.value.match(/((?<!\S)(\d+))/))
    {
        console.log("No nick found");
        nickInput.focus();
        error.innerText="Nick can't start with a number"
        event.preventDefault();
        return false;
    }
    else if(sizeInput.value=="0"){
        console.log("Game's size not choosen");
        sizeInput.focus();
        error.innerText="Game's size not choosen"
        event.preventDefault();
        return false;
    }

    // IF INFO IS CORRECT:

    userData(nickInput, sizeInput, emailInput, avatarChoosen);
    userHistory(nickInput);
    return true;
}

function moviendoImg(event){
    itemImg = event.target;
    console.log(itemImg.src);
}
function cambiarImg(event){
    avatarChoosen.src=itemImg.src;
}


  //LOADING DOM
function domLoaded(){
    // GET ALL THE ELEMENTS
    nickInput=document.getElementById("nick");
    sizeInput=document.getElementById("size");
    emailInput=document.getElementById("email");
    formEntry=document.getElementById("formEntry");
    error=document.getElementById("error");

    // CHECK FOR ERRORS OF game.html

    if(sessionStorage.getItem('error')!=null)
    {
        error.innerText=sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    formEntry.addEventListener("submit", checkForm);
    
    //Eventos del D&B
    
    avatarItems=document.getElementsByClassName("avatarImgItem")
    for(let item of avatarItems){
        item.addEventListener("dragstart", moviendoImg)
    }
    avatarChoosen=document.getElementById("avatarImg");
    avatarChoosen.addEventListener('dragover',e=>(e.preventDefault()))
    avatarChoosen.addEventListener('drop',cambiarImg)


}

// <!-- =============INITIALIZING EVENTS==================== -->

document.addEventListener("DOMContentLoaded", domLoaded);

//GEOLOCATION
geolocationData();

