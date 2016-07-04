var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

left.press = function() {
  snake.vx = -5;
  snake.vy = 0;
};

left.release = function() {
  if (!right.isDown && snake.vy === 0) {
    snake.vx = snake.vx*-0.2;
  }
};

up.press = function() {
  snake.vy = -5;
  snake.vx = 0;
};

up.release = function() {
  if (!down.isDown && snake.vx === 0) {
    snake.vy = snake.vy*-0.2;
  }
};

right.press = function() {
  snake.vx = 5;
  snake.vy = 0;
};
right.release = function() {
  if (!left.isDown && snake.vy === 0) {
    snake.vx = snake.vx*-0.2;
  }
};

down.press = function() {
  snake.vy = 5;
  snake.vx = 0;
};

down.release = function() {
  if (!up.isDown && snake.vx === 0) {
    snake.vy = snake.vy*-0.2;
  }
};

function controls(snake) {
  snake.x += snake.vx;
  snake.y += snake.vy;

  if (snake.position.x < 0) {
      snake.position.x = screen.width;
  }

  if (snake.position.x > screen.width) {
      snake.position.x = 0;
  }

  if (snake.position.y < 0) {
      snake.position.y = screen.height;
  }

  if (snake.position.y > screen.height) {
      snake.position.y = 0;
  }
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