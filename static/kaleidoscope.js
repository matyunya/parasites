
var Kaleidoscope, c, i, image, kaleidoscope, len, onChange, options, ref, tr, tx, ty, update, bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

Kaleidoscope = function () {
    Kaleidoscope.prototype.HALF_PI = Math.PI / 2;
    Kaleidoscope.prototype.TWO_PI = Math.PI * 2;
    function Kaleidoscope(options1) {
        var key, ref, ref1, val;
        this.options = options1 != null ? options1 : {};
        this.defaults = {
            offsetRotation: 0,
            offsetScale: 1,
            offsetX: 0,
            offsetY: 0,
            radius: screen.width/2 + 180,
            slices: 24,
            zoom: 1
        };
        ref = this.defaults;
        for (key in ref) {
            val = ref[key];
            this[key] = val;
        }
        ref1 = this.options;
        for (key in ref1) {
            val = ref1[key];
            this[key] = val;
        }

        if (this.domElement == null) {
            this.domElement = document.createElement('canvas');
        }
        if (this.context == null) {
            this.context = this.domElement.getContext('2d');
        }
        if (this.image == null) {
            this.image = document.createElement('img');
        }
    }
    Kaleidoscope.prototype.draw = function () {
        var cx, i, index, ref, results, scale, step;
        this.domElement.width = this.domElement.height = this.radius*2;
        this.context.fillStyle = this.context.createPattern(this.image, 'repeat');
        scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
        step = this.TWO_PI / this.slices;
        cx = this.image.width / 2;
        results = [];
        for (index = i = 0, ref = this.slices; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
            this.context.save();
            this.context.translate(this.radius, this.radius);
            this.context.rotate(index * step);
            this.context.beginPath();
            this.context.moveTo(-0.5, -0.5);
            this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51);
            this.context.lineTo(0.5, 0.5);
            this.context.closePath();
            this.context.rotate(this.HALF_PI);
            this.context.scale(scale, scale);
            this.context.scale([
                -1,
                1
            ][index % 2], 1);
            this.context.translate(this.offsetX - cx, this.offsetY);
            this.context.rotate(this.offsetRotation);
            this.context.scale(this.offsetScale, this.offsetScale);
            this.context.fill();
            results.push(this.context.restore());
        }
        return results;
    };
    return Kaleidoscope;
}();

image = new Image();
image.onload = function (_this) {
    return function () {
        return kaleidoscope.draw();
    };
}(this);
image.src = '/static/img/3.jpg';
kaleidoscope = new Kaleidoscope({
    image: image,
    slices: 8
});
kaleidoscope.domElement.style.position = 'fixed';
kaleidoscope.domElement.style.top = '-400px';
kaleidoscope.domElement.style.left = '-170px';
kaleidoscope.domElement.style.background = 'transparent';
kaleidoscope.domElement.style.zIndex = '-10000';
document.body.appendChild(kaleidoscope.domElement);
tx = kaleidoscope.offsetX;
ty = kaleidoscope.offsetY;
tr = kaleidoscope.offsetRotation;

onKeyDown = function (_this) {
    return function (event) {
        var cx, cy, dx, dy, hx, hy;
          cx = window.innerWidth / 2;
          cy = window.innerHeight / 2;
          dx = snake.vx / window.innerWidth;
          dy = snake.vy / window.innerHeight;
          hx = dx - 0.5;
          hy = dy - 0.5;
          tx = hx * kaleidoscope.radius * -2;
          ty = hy * kaleidoscope.radius * 2;
          return tr = Math.atan2(hy, hx);
    };
}(this);

window.addEventListener('keydown', onKeyDown, true);

options = {
    ease: 0.05
};

(update = function (_this) {
    return function () {
        var delta, theta;
        delta = tr - kaleidoscope.offsetRotation;
        theta = Math.atan2(Math.sin(delta), Math.cos(delta));
        kaleidoscope.offsetX += (tx - kaleidoscope.offsetX) * options.ease;
        kaleidoscope.offsetY += (ty - kaleidoscope.offsetY) * options.ease;
        kaleidoscope.offsetRotation += (theta - kaleidoscope.offsetRotation) * options.ease;
        kaleidoscope.draw();
        return setTimeout(update, 2500 / 60);
    };
}(this))();
