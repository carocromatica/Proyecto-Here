//contiene js que es importante
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
    video.style.display = 'block';
    screenshotButton.style.display = 'block';
    img.style.display = 'none';
    enableVideo.style.display = 'none';    
  }

  screenshotButton.onclick = function() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      img.src = canvas.toDataURL('image/webp');
      
      video.style.display = 'none';
      screenshotButton.style.display = 'none';
      img.style.display = 'block';
      enableVideo.style.display = 'block';
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
/*
    function savePhoto(){
        console.log("boton guardar");
        let newRegistroKey = firebase.database().ref().child('registros').push().key;
        subirArchivo(dataURLtoBlob(img.src), newRegistroKey + '.jpg', newRegistroKey);
        
    }
  */  

function SendFB(){
    FB.login(function(response) {
        if (response.status === 'connected') {
            var blob = dataURLtoBlob(img.src);
            FB.getLoginStatus(function (response) {
                console.log(response);
                if (response.status === "connected") {
                    postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
                } else if (response.status === "not_authorized") {
                    FB.login(function (response) {
                        postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
                    }, {scope: "publish_actions"});
                } else {
                    FB.login(function (response) {
                        postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
                    }, {scope: "publish_actions"});
                }
            });
        } else {
            alert("Lo siento, no pudiste logearte a facebook");
          // The person is not logged into this app or we are unable to tell. 
        }
      }, {scope: 'email,user_likes, public_profile'});

}

    /*
  function subirArchivo(archivo, nombre, key) {
    console.log('Subir Archivo');
    console.log(archivo);
    console.log(nombre);
    let storageService = firebase.storage();
    // creo una referencia al lugar donde guardaremos el archivo
    let refStorage = storageService.ref('userImages').child(nombre);
    // Comienzo la tarea de upload
    const uploadTask = refStorage.put(archivo);
    // defino un evento para saber qué pasa con ese upload iniciado
    uploadTask.on('state_changed', null,
        function(error){
            console.log('Error al subir el archivo', error);
        },
        function(){
            //obtiene la url de la imagen recien subida
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                //cambia el source de la imagen por la url de la imagen recien subida
                console.log('Listo, quedo en :' + downloadURL + ' y la key ' + key);
                register["urlPicture"] = downloadURL;
                register["key"] = key;
                localStorage.setItem('register',JSON.stringify(register));
                console.log(register);
                window.location = 'firma.html';
                //saveData(downloadURL,key);
              });
        }
    );
}
*/
