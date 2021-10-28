
let canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');
let video = document.querySelector('#video');
let img = new Image;
let counter = 0;
function timerPrompt() {
    let t = "00:05";
    let intMinutes = t.replace(/(\d?\d):(\d\d)/g, "$1");
    let intSeconds = t.replace(/(\d?\d):(\d\d)/g, "$2");
    return intMinutes * 60 * 1000 + intSeconds * 1000;
  }
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
        video.play();
    })
}
var photoTimer = setInterval(function() {
  if (counter > 9) {
    clearInterval(photoTimer);
  } else {
    $("#message").text(counter);
  } 
  counter++;
}, 1000)
/*function countdownTimer() {

  let remaining = "";

  $("#message").text("remaining");
  if (counter < 5) {    
    remaining = counter;
    counter++;    
  }
  else if (counter > 5) {
    
    var imgData = document.getElementById('canvas').toDataURL();
        
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/img",
      data: {img: imgData},    
    });
  }
    
  document.getElementById("countdown").innerHTML = remaining;  
  console.log("upping counter to " + counter)
  counter++;
  
}*/

  var vid = document.getElementById("myVideo");
  
  var endTime = new Date();
  console.log("initial run of countdownTimer()");
  //countdownTimer();
  console.log("second run of countdownTimer()");
  $(document).keypress(function (e) { 
    if (e.which == 13 && counter > 5) {
      counter = 0;
    }
  });
  //setInterval(countdownTimer, 1000)
  /*
  $('#shutter').addClass('on');
  setTimeout(function() {
       $('#shutter').removeClass('on');
  }, 30*2+45);/* Shutter speed (double & add 45) */
  // TODO preload video and prompt after loading
  // numbers are clickable to restart or update time
  // use bootstrap modals instead of alert prompts
  
