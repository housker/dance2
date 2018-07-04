//https://www.youtube.com/watch?v=IBHpSkGZtNM
//https://24ways.org/2013/make-your-browser-dance/#author
//https://freesound.org/search/?q=spells&f=&s=score+desc&advanced=0&g=1
//https://archive.org/details/HarryPotter-hedwigTheme

var audio = new Audio();
audio.crossOrigin = 'anonymous';
audio.src = 'rutgermuller.wav';
audio.controls = true;
audio.loop = true;
audio.autoplay = false;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

window.addEventListener('load', initMusicPlayer, false);
//could I do the same thing with doc.ready?
function initMusicPlayer() {
  document.getElementById('audio_box').appendChild(audio);
  var myHeader = new Headers();
  context = new AudioContext();
  analyser = context.createAnalyser();
  canvas = document.getElementById('analyser_render');
  ctx = canvas.getContext('2d');
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();
}

function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00CCFF';
  bars = 100;
  for(var i = 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    //dancer opacity
    if(window.responders[i]) {
      var topDownLoc = window.responders[i].height;
      var freqIndex = Math.floor((451 - topDownLoc) * (1024 / 451));
      var freqOpacity = ((fbc_array[freqIndex] / 230) + 0.5) * 0.99;
      window.responders[i].css("opacity", freqOpacity);
    }
  }
}

window.requestAnimationFrame(frameLooper)



// var audioFile = './rutgermuller.wav'

// // function loadSound() {
// //   //set audio file url
// //   var audioFileUrl = 'https://freesound.org/s/51251/';
// //   console.log(audioFileUrl)
// //   //create new request
// //   var request = new XMLHttpRequest();
// //   request.open("GET", audioFileUrl, true);
// //   request.responseType = "arraybuffer";

// //   request.onload = function() {
// //     //take from http request and decode into buffer
// //     audioContext.decodeAudioData(request.response, function(buffer) {
// //         audioBuffer = buffer;
// //        });
// //     }
// //   request.send();
// // }
// // loadSound()

// function createAnalyser(source) {
//   //create analyser node
//   analyser = audioContext.createAnalyser();
//   //connect to source
//   source.connect(analyser);
//   //pipe to speakers
//   analyser.connect(audioContext.destination);
// }

// var myAnalyser = new createAnalyser(audioFile);
// console.log(myAnalyser)