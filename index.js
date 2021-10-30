let canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');
let video = document.querySelector('#video');
let img = new Image;
let counter = 0;
let countdownArr = [5,4,3,2,1];    
if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
        video.play();
        })
      }

$(document).keypress(function (e) { 
  if (e.which == 13 && counter > 5) {
    counter = 0;
    console.log("counter set to 0")      
  }
});

var photoTimer = setInterval(function() {
  console.log(counter);
  if (counter < 5){
    $("#message").text(countdownArr[counter]);
  } else if (counter == 5) {
    context.drawImage(video, 0,0,1280,720);
    img = canvas.toDataURL();
    $("#message").text("CLICK");    
    $.ajax({
      type: "POST",
      url: "https://photoboothfiles.patrickjasinski.com/",
      data: {img: img},    
    });
  }
  counter++;
  }, 1000);