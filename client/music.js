//https://www.youtube.com/watch?v=IBHpSkGZtNM
//https://24ways.org/2013/make-your-browser-dance/#author

var audio = new Audio();
audio.crossOrigin = 'anonymous';
audio.src = 'rutgermuller.wav';
audio.controls = true;
audio.loop = true;
audio.autoplay = false;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

window.addEventListener('load', initMusicPlayer, false);

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
