firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let usermail = firebase.auth().currentUser.email;
    document.getElementById("usermail").innerHTML = usermail;

   
  } else {
    window.location = "index.html";
  }
});



function selectElfa(){
  alert('elegiste a elfa')
  document.getElementById("PERSONAJE").src = "../../assets/img/avatars/elfa.png";
}

function selectMago(){
  alert('elegiste a mago')
  document.getElementById("PERSONAJE").src = "../../assets/img/avatars/mago.png";
}

function selectRobin(){
  alert('elegiste a robin')
  document.getElementById("PERSONAJE").src = "../../assets/img/avatars/exportar.png";
}

function selectChica(){
  alert('elegiste a chica')
  document.getElementById("PERSONAJE").src = "../../assets/img/avatars/chicaRuda.png";
}