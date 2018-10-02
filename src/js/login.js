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
  });
}

