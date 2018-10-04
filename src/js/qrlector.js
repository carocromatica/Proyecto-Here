const scanner = new Instascan.Scanner({
  video: document.getElementById('webcam')
});
scanner.addListener('scan', content => {
    //let result= document.getElementById('txtResultado');
    //result.innerHTML = content;
    //alert("tu codigo QR dice:" + content);
    localStorage.setItem("selectQR",content);
    window.location = "../html/picture.html";
});
Instascan.Camera.getCameras().then( cameras => {
    if(cameras.length > 0){
        for (let index = 0; index < cameras.length; index++) {
            console.log(cameras[index]);
        }  
        scanner.start(cameras[0]);
   }
});