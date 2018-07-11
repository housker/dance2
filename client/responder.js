//https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43

Responder = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.class = "responder";
  this.$node.height = top;
  var colorSettings = {
    color: `hsl(${Math.floor(left) % 361}, 50%, 50%)`
  };
  this.$node.css(colorSettings);
};

Responder.prototype = Object.create(Dancer.prototype);
Responder.prototype.constructor = Responder;

Responder.prototype.step = function() {
  Dancer.prototype.step.call(this)
  this.$node.toggle();
}