var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

left.press = function() {
  snake.vx = -5;
  snake.vy = 0;
  e1.vx = 0.05;
  e.vy = Math.random();
};

left.release = function() {
  if (!right.isDown) {
    snake.vx = snake.vx*-0.02;
  }
};

up.press = function() {
  snake.vy = -5;
  snake.vx = 0;
};

up.release = function() {
  if (!down.isDown) {
    snake.vy = snake.vy*-0.02;
  }
};

right.press = function() {
  snake.vx = 5;
  snake.vy = 0;
  e1.vx += -15;
};
right.release = function() {
  if (!left.isDown) {
    snake.vx = snake.vx*-0.02;
  }
};

down.press = function() {
  snake.vy = 5;
  snake.vx = 0;
};

down.release = function() {
  if (!up.isDown) {
    snake.vy = snake.vy*-0.02;
  }
};

function move(object) {
  object.x += object.vx;
  object.y += object.vy;

  if (object.position.x < 0) {
      object.position.x = screen.width;
  }

  if (object.position.x > screen.width) {
      object.position.x = 0;
  }

  if (object.position.y < 0) {
      object.position.y = screen.height;
  }

  if (object.position.y > screen.height) {
      object.position.y = 0;
  }
}

function controls() {
  move(snake);
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );

  return key;
}