const start = () => {
  var c = document.getElementById("cp");
  var ctx = c.getContext("2d");

  function resize() {
    c.style.width = "100%";
    c.style.height = "100%";
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
  }

  var colors = ["rgb(219, 219, 40)"];

  function Box() {
    this.half_size = Math.floor(Math.sqrt(Math.random() * 40) + 1);
    this.x = 0;
    this.y = Math.floor(Math.random() * c.height + 1);
    this.r = Math.PI / 4;
    this.shadow_length = 2000;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.last_draw = 0;

    this.getDots = function() {
      var full = (Math.PI * 2) / 4;

      var p1 = {
        x: this.x + this.half_size * Math.sin(this.r),
        y: this.y + this.half_size * Math.cos(this.r)
      };
      var p2 = {
        x: this.x + this.half_size * Math.sin(this.r + full),
        y: this.y + this.half_size * Math.cos(this.r + full)
      };
      var p3 = {
        x: this.x + this.half_size * Math.sin(this.r + full * 2),
        y: this.y + this.half_size * Math.cos(this.r + full * 2)
      };
      var p4 = {
        x: this.x + this.half_size * Math.sin(this.r + full * 3),
        y: this.y + this.half_size * Math.cos(this.r + full * 3)
      };

      return {
        p1: p1,
        p2: p2,
        p3: p3,
        p4: p4
      };
    };
    this.move = function() {
      var speed = 2 * Math.sqrt(this.half_size);
      this.x += speed * 4;
    };
    this.draw = function() {
      var dots = this.getDots();
      ctx.beginPath();
      ctx.moveTo(dots.p1.x, dots.p1.y);
      ctx.lineTo(dots.p2.x, dots.p2.y);
      ctx.lineTo(dots.p3.x, dots.p3.y);
      ctx.lineTo(dots.p4.x, dots.p4.y);
      ctx.fillStyle = this.color;
      ctx.fill();

      if (this.y - this.half_size > c.height) {
        this.y -= c.height + 100;
      }
      if (this.x - this.half_size > c.width) {
        this.x -= c.width + 100;
      }
    };
  }

  var boxes = [];

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, c.width, c.height);

    let randomCount = 5;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        randomCount = 6;
    }

    if (Math.random() * 100 <= randomCount) {
      boxes.push(new Box());
    }
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].move();
      if (boxes[i].x - boxes[i].last_draw > boxes[i].half_size * 1.5) {
        boxes[i].draw();
        boxes[i].last_draw = boxes[i].x;
      }
      if (boxes[i].x + 10 >= c.width) {
        boxes.splice(i, 1);
      }
    }
    setTimeout(draw, 100);
  }

  resize();
  draw();

  while (boxes.length < 2) {
    boxes.push(new Box());
  }
  window.onresize = resize;
};
document.addEventListener("DOMContentLoaded", start);
