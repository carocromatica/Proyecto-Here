

  var starCountRef = firebase.database().ref('usuarios/');
starCountRef.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
  console.log(snapshot.val())
});
