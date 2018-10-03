firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let usermail = firebase.auth().currentUser.email;
    document.getElementById("usermail").innerHTML = usermail;

  


    firebase.database().ref(`usuarios/${firebase.auth().currentUser.uid}/avatar`)
    .on("child_added", (avatar) => {

      asd.innerHTML = `
    
      <img id="personaje" src='${avatar.val()}' class="responsive-img avatar"> 
      `     
      + asd.innerHTML;
      console.log(avatar)

    });

  } else {
    window.location = "index.html";
  }
});


function selectElfa(){
  alert('elegiste a elfa')

  const mono=document.getElementById("personaje").src = "https://i.imgur.com/IsFXKks.png";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });


}

function selectMago(){

  alert('elegiste a mago')
  const mono=document.getElementById("personaje").src = "https://i.imgur.com/OD2BpX0.png";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });

}

function selectRobin(){
  alert('elegiste a robin')
  document.getElementById("personaje").src = "../../assets/img/avatars/exportar.png";
}

function selectChica(){
  alert('elegiste a chica')
  document.getElementById("personaje").src = "../../assets/img/avatars/chicaRuda.png";
}