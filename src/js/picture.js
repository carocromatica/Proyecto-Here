



const constraints = {
    video: true
  };
  const video = document.getElementById('Video');
  const captureVideoButton =  document.getElementById('btnCaptura');
  const screenshotButton = document.getElementById('capturePicture');
  const enableVideo = document.getElementById('enableVideo');
  const img = document.getElementById('imgFoto');
  const canvas = document.createElement('canvas');

  let register = JSON.parse(localStorage.getItem("register"));
  localStorage.removeItem("register");
  console.log(register);

  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
  
  img.style.display = 'none';
  enableVideo.style.display = 'none';

  enableVideo.onclick = function() {
    video.style.display = 'inline';
    screenshotButton.style.display = 'inline';
    img.style.display = 'none';
    enableVideo.style.display = 'none';    
  }

  screenshotButton.onclick = function() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      img.src = canvas.toDataURL('image/webp');
      
      video.style.display = 'none';
      screenshotButton.style.display = 'none';
      img.style.display = 'inline';
      enableVideo.style.display = 'inline';
  };

  function handleSuccess(stream) {
      screenshotButton.disabled = false;
      video.srcObject = stream;
  }

  function handleError(error) {
      console.error('Error: ', error);
  }

  function dataURLtoBlob(dataurl) {
    console.log(dataurl);

    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    console.log('Enviando foto');
    return new Blob([u8arr], {type:mime});
  }



function SendFB(){
    console.log(firebase.auth().currentUser.uid);
    console.log('entrando a sendFB');
    let idSelecionado = localStorage.getItem("selectId");
    let armaSelecionado = localStorage.getItem("selectArma");
    let qrSelecionado = localStorage.getItem("selectQR");
    console.log('arma seleccionada')
    console.log(armaSelecionado);
    let Puntos = 0;
    switch(armaSelecionado) {
        case '1':
        Puntos = 100;
        break;
        case '2':
        Puntos = 350;
        break;
        case '3':
        Puntos = 250;
        break;
        case '4':
        Puntos = 450;
        break;
    } 
    console.log('puntos');
    console.log(Puntos);
    let puntosObt = 0;

    var review = firebase.database().ref(`usuarios/${firebase.auth().currentUser.uid}/puntos/puntaje`);
    review.on('value', function(puntos) {
      console.log('puntos obtenidos');  
      console.log(puntos.val());
      let puntaje = Puntos + puntos.val();
      console.log('puntos Totales');  
      console.log(puntaje);

      document.getElementById('puntosGanados').innerHTML = Puntos;

      var instance = M.Modal.getInstance(document.getElementById('modalPublicar'));
      instance.open();
      puntosObt  = puntaje;
    });
    /*
    let puntaje = puntosObt;
    firebase.database().ref(`usuarios/${firebase.auth().currentUser.uid}/puntos`).update({
        puntaje
    });
    */
    

}


 
