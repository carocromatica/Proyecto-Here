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
    let idSelecionado = localStorage.getItem("selectId");
    let armaSelecionado = localStorage.getItem("selectArma");
    let qrSelecionado = localStorage.getItem("selectQR");


    var blob = dataURLtoBlob(img.src);
    FB.getLoginStatus(function (response) {
        console.log(response);
        if (response.status === "connected") {
            postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
        } else if (response.status === "not_authorized") {
            FB.login(function (response) {
                postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
            }, {scope: "publish_stream, public_profile, publish_pages, manage_pages"});
        } else {
            FB.login(function (response) {
                postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
            }, {scope: "publish_stream, public_profile, publish_pages, manage_pages"});
        }
    });

}

function postImageToFacebook(token, filename, mimeType, imageData, message) {
    var fd = new FormData();
    fd.append("access_token", token);
    fd.append("source", imageData);
    fd.append("no_story", true);

    // Upload image to facebook without story(post to feed)
    $.ajax({
        url: "https://graph.facebook.com/me/photos?access_token=" + token,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            console.log("success: ", data);

            // Get image source url
            FB.api(
                "/" + data.id + "?fields=images",
                function (response) {
                    if (response && !response.error) {
                        //console.log(response.images[0].source);

                        // Create facebook post using image
                        FB.api(
                            "/me/feed",
                            "POST",
                            {
                                "message": "",
                                "picture": response.images[0].source,
                                "link": window.location.href,
                                "name": 'reciclando!',
                                "description": message,
                                "privacy": {
                                    value: 'SELF'
                                }
                            },
                            function (response) {
                                if (response && !response.error) {
                                    /* handle the result */
                                    console.log("postiado en facebook");
                                    console.log(response);
                                }
                            }
                        );
                    }
                }
            );
        },
        error: function (shr, status, data) {
            console.log("error " + data + " Status " + shr.status);
        },
        complete: function (data) {
            //console.log('Post to facebook Complete');
        }
    });
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
