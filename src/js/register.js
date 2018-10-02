function register(){
    const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(resp => {
        console.log(resp);
        location='../html/map'
        })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ...
    });
  
}
