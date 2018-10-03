firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let usermail = firebase.auth().currentUser.email;
    document.getElementById("usermail").innerHTML = usermail;

    firebase.database().ref(`usuarios/${firebase.auth().currentUser.uid}/avatar`)
    .on("child_added", (avatar) => {

      milely.innerHTML = `
    
      <img id="personaje" src='${avatar.val()}' class="responsive-img avatar"> 
      `     
      + milely.innerHTML;
      console.log(avatar)
    });

  } else {
    window.location = "index.html";
  }
});


function selectElfa(){
  alert('Elegiste a Elfa')

  const mono=document.getElementById("personaje").src = "https://i.imgur.com/RQEPG92.png";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });

  
}

function selectMago(){

  alert('Elegiste a Mago')
  const mono=document.getElementById("personaje").src = "https://i.imgur.com/OD2BpX0.png";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });

}

function selectRobin(){
  alert('Elegiste a Robin')
  const mono=document.getElementById("personaje").src = "https://i.imgur.com/2XvUC8M.png";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });
 
}

function selectChica(){
  alert('Elegiste a Chica Ruda')
  const mono=document.getElementById("personaje").src = "https://i.imgur.com/IsFXKks.png";
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
  firebase.database().ref(`usuarios/${currentUser.uid}/avatar`).update({
    mono
  });
}