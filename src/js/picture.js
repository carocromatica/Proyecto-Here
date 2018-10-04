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

function callFB(){
    var faceWin = window.open('https://www.facebook.com/dialog/feed?app_id=184683071273&link=https%3A%2F%2Fcarocromatica.github.io%2FProyecto-Here%2F&picture=https%3A%2F%2Fi.imgur.com%2F1u9qQLh.png&name=holo%20&caption=%20&description=ojala%20funcione%20esta%20wea&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F"',
    'Facebook',
    'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
    faceWin.document.write("<script type = 'text/javascript'>alert('eres mio facebook'); </script>");
}

function SendFB(){
    let idSelecionado = localStorage.getItem("selectId");
    let armaSelecionado = localStorage.getItem("selectArma");
    let qrSelecionado = localStorage.getItem("selectQR");

    let Puntos = 0;
    switch(armaSelecionado) {
        case 1:
        Puntos = 100;
        break;
        case 2:
        Puntos = 350;
        break;
        case 3:
        Puntos = 250;
        break;
        case 4:
        Puntos = 450;
        break;
    } 

    let puntosObt = 0;

    firebase.database().ref(`usuarios/${firebase.auth().currentUser.uid}/puntos/puntaje`)
    .on("child_added", (puntos) => {
        puntosObt = puntos.val();
    });

    let totalPuntos = puntosObt + Puntos;

    const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas
    firebase.database().ref(`usuarios/${currentUser.uid}/puntos/puntaje`).update({
        totalPuntos 
    });

/*
    var blob = dataURLtoBlob(img.src);
    FB.getLoginStatus(function (response) {
        console.log(response);
        if (response.status === "connected") {
            postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
        } else if (response.status === "not_authorized") {
            FB.login(function (response) {
                postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
            }, {scope: "public_profile, publish_pages, manage_pages"});
        } else {
            FB.login(function (response) {
                postImageToFacebook(response.authResponse.accessToken, "Reciclando!!!", "image/png", blob, window.location.href);
            }, {scope: "public_profile, publish_pages, manage_pages"});
        }
    });
*/
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
        }
    });
}


 
