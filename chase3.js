// target position
var target = {
  x: 5,
  y: 7
}

// my position
var position = {
  x: 9,
  y: 9
}

// subtract (= difference vector)
var dx = target.x - position.x
var dy = target.y - position.y

// normalize (= direction vector)
// (a direction vector has a length of 1)
var length = Math.sqrt(dx * dx + dy * dy)
if (length) {
  dx /= length
  dy /= length
}

// move
// delta is the elapsed time in seconds
// SPEED is the speed in units per second (UPS)
position.x += dx * delta * SPEED
position.y += dy * delta * SPEED
