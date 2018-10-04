firebase.auth().onAuthStateChanged(function (user) {
  if (user) {


    firebase.database().ref(`usuarios/${firebase.auth().currentUser.uid}/avatar`)
    .on("child_added", (profile) => {
      milely.innerHTML = `
      <p class="profile">${profile.val()}</p>
      `     
      + milely.innerHTML;
    });

    firebase.database().ref(`usuarios/${firebase.auth().currentUser.uid}/puntos`)
    .on("child_added", (puntos) => {
      puntaje.innerHTML = `
      ${puntos.val()}  `     
      + puntaje.innerHTML;
    });

  } else {
    window.location = "login.html";
  }
});

function selectElfa(){
  alert('Elegiste a Elfa')
  const mono=document.getElementById("personaje").innerHTML = "<img id='personaje' src='https://i.imgur.com/RQEPG92.png' class='responsive-img avatar'> ";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });
}

function selectMago(){
  alert('Elegiste a Mago')
  const mono=document.getElementById("personaje").innerHTML = "<img id='personaje' src='https://i.imgur.com/OD2BpX0.png' class='responsive-img avatar'> ";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });
}

function selectRobin(){
  alert('Elegiste a Robin')
  const mono=document.getElementById("personaje").innerHTML = "<img id='personaje' src='https://i.imgur.com/2XvUC8M.png' class='responsive-img avatar'> ";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });
}

function selectChica(){
  alert('Elegiste a Chica Ruda')
  const mono=document.getElementById("personaje").innerHTML = "<img id='personaje' src='https://i.imgur.com/IsFXKks.png' class='responsive-img avatar'>";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });
}

function createAlias (){
  const puntaje=500;
  const alias=document.getElementById('alias').value;
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    alias
  });

  firebase.database().ref(`usuarios/${currentUser.uid}/puntos`).update({
    puntaje
  });
}

function sumarPuntos(){
  let puntajeHtml=document.getElementById('puntaje').innerHTML;
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  let puntajeActual=parseInt(puntajeHtml);
  console.log(puntajeActual)
  let puntajeAgregado=750;

  let puntajeFinal=puntajeActual+puntajeAgregado;

  firebase.database().ref(`usuarios/${currentUser.uid}/puntos`).update({
    puntaje:puntajeFinal
  });


}