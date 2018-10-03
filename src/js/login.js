function login(){
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

firebase.auth().signInWithEmailAndPassword(email, password)//  auntenticar email y contraseña
.then(listo => {
    // colocar la redirección cuando el usuario inicie sesion
    location='../html/map.html'

console.log(listo);
}).catch(function(error) {
    // errores de autenticación.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    errores.innerHTML= '';
    errores.innerHTML +=`<p class='red-text'>${"Oops! Contraseña o Email inválido"}</p>`
  });
}

function facebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      location='../html/map.html'
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    }
    