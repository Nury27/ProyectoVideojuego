/**
 * @author Nur Youssef <nuryou27@gmail.com>
 * 
 */

var nick;
var size;
var email;
var geolocationTxt;
var avatarChoosen;

function userData(nick, size, email){

    sessionStorage.setItem("nick", nick.value)
    sessionStorage.setItem("email", email.value)
    sessionStorage.setItem("size", size.value)
    sessionStorage.setItem("geolocationTxt", geolocationTxt)
    sessionStorage.setItem("avatarChoosen", avatarImg.src)

}

function getUserData(){
    nick = sessionStorage.getItem("nick");
    size = sessionStorage.getItem("size");
    email = sessionStorage.getItem("email");
    avatarChoosen = sessionStorage.getItem("avatarChoosen");

}

function checkUserData(){
    if(nick == null){
        sessionStorage.setItem("error", "Nick not found")
        return false;
    }
    return true;
}

function geolocationData(){
    if(!navigator.geolocation){
        geolocationTxt="browser not compatible with geolocation API"
    }
    else{
        navigator.geolocation.getCurrentPosition(
            //Exito
            (position) => {geolocationTxt="Latitude: " + position.coords.latitude + ", longitude: " + position.coords.longitude},
            //Error
            () => {geolocationTxt="Geolocation couldn't be taken";}
        )
    }
}
//local Storage

function userHistory(nick){
    let historyStorage=localStorage.getItem("history");
    let history;
    if(historyStorage == null){
        history=[];
    }
    else{
        history = JSON.parse(historyStorage);
    }
    let userRegister={
        user: nick.value,
        date:Date.now()
    }
    history.push(userRegister);
    localStorage.setItem("history",JSON.stringify(history));
}
