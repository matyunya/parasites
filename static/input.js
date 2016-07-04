var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

left.press = function() {
  bunny.vx = -5;
  bunny.vy = 0;
};

left.release = function() {
  //Stop the cat
  if (!right.isDown && bunny.vy === 0) {
    bunny.vx = bunny.vx*-0.2;
  }
};

//Up
up.press = function() {
  bunny.vy = -5;
  bunny.vx = 0;
};
up.release = function() {
  if (!down.isDown && bunny.vx === 0) {
    bunny.vy = bunny.vy*-0.2;
  }
};

//Right
right.press = function() {
  bunny.vx = 5;
  bunny.vy = 0;
};
right.release = function() {
  if (!left.isDown && bunny.vy === 0) {
    bunny.vx = bunny.vx*-0.2;
  }
};

//Down
down.press = function() {
  bunny.vy = 5;
  bunny.vx = 0;
};
down.release = function() {
  if (!up.isDown && bunny.vx === 0) {
    bunny.vy = bunny.vy*-0.2;
  }
  };

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}