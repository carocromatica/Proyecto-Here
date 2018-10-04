function cerrarSesion(){
    firebase.auth().signOut()
    .then(function(){
      console.log('Cerrando sesión....');
      window.location='../html/login.html'
    })
    .catch(function(error){
      console.log(error);
    })
  }