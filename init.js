//https://tylermcginnis.com/object-creation-in-javascript-functional-instantiation-vs-prototypal-instantiation-vs-pseudo-e9287b6bbb32/

//https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local

//https://www.google.com/search?q=interactive+css+music+animation&oq=interactive+css+music+animation&aqs=chrome..69i57.14982j0j4&sourceid=chrome&ie=UTF-8

 //Initialize
 $(document).ready(function() {
  window.dancers = [];
  window.responders = [];
  console.log('height', $("body").height())
  console.log('width', $("body").width())

  $('.addDancerButton').on('click', function(event) {
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');
    var dancerMakerFunction = window[dancerMakerFunctionName];

//Drop-down menu
/*
<a class="dropdown-toggle">..</a>
*/
// var main = function() {
//   $('.dropdown-toggle').click(function() {
//     $('.dropdown-menu').toggle();
//   });
// }
// var oldTimeBetweenSteps = Math.random() * 1000;
// var newTimeBetweenSteps =

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    dancer.$node.id = window.dancers.length;
    window.dancers.push(dancer.$node);
    dancer.triangleType = window.responders.length % 4
    var triangles = ["triangle-up", "triangle-down", "triangle-left", "triangle-right"];
    var currentTriangle = triangles[dancer.triangleType];
    dancer.$node.addClass(currentTriangle);
    if(dancer.$node.class === "responder") {
      window.responders.push(dancer.$node);
    }
  });
});



//Dancer
var Dancer = function(top, left, timeBetweenSteps) {
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.$node = $('<span class="dancer" id=""></span>');
  this.setPosition(top, left);
};

Dancer.prototype.step = function() {
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

//BlinkyDancer
BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.class = "blinkyDancer";
  this.$node.prepend('<img class="star" src="giphy-downsized.gif">')
  this.$node.css("z-index", "-1");
  this.step();
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this)
  this.$node.toggle();
}