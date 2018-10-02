function cerrarSesion(){
    firebase.auth().signOut()
    .then(function(){
      console.log('Cerrando sesión....');
      location='../html/login.html'
    })
    .catch(function(error){
      console.log(error);
    })
  }