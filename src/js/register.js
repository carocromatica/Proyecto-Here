function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userData) => {
        return firebase.database().ref(`usuarios/${userData.user.uid}`).set({
            
            mail: userData.user.email,
            uid: userData.user.uid,
        });
    }).then(()=>{
        alert("Registro con exito")
       window.location='../html/avatar.html'
    })
    .catch((error) => {
        console.log("Error de Firebase > Codigo > " + error.code);
        console.log("Error de Firebase > Mensaje > " + error.message);

    });

}

