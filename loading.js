function Loading() {
  this.start = () => {
    this.canvas = document.createElement("canvas");
    this.favicon = document.getElementById("favicon");
    this.canvas.width = 64;
    this.canvas.height = 64;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "bold 64px sans-serif";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.frame = 0;
    this.fps = 8;
    setInterval(() => {
      this.frame = this.frame + 1;
      this.loop();
    }, 1000 / this.fps);
  };
  this.size = 64;
  this.start();
  this.emojis = ["🌐"];

  this.map = (v, a, b, c, d) =>
    Math.min(
      Math.max(c + (d - c) * ((v - a) / (b - a)), Math.min(c, d)),
      Math.max(c, d)
    );

  this.wrap = (v, m) => {
    return ((v % m) + m) % m;
  };

  this.duration = 6 * this.fps;
  this.textcontent = "Loading ... Loading ...";
  this.loop = () => {
    const render = () => {
      let progress = (this.frame / this.duration) % 1;
      let scene = Math.floor(this.frame / this.duration) % 8 === 0;
      let char = this.emojis[0];

      let wordlength = this.ctx.measureText(this.textcontent).width + this.size;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (!scene) {
        this.ctx.textAlign = "center";
        this.ctx.save();
        this.ctx.fillStyle = "#000";
        this.ctx.translate(this.size * 0.5, this.size * 0.875);
        this.ctx.fillText(char, 0, 0);
        this.ctx.restore();
        this.ctx.fillStyle = "#000";
        this.ctx.beginPath();
        this.ctx.arc(this.size - 12, 12, 8, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.save();
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "#E2FBC5";
        this.ctx.translate(
          this.size - ((progress * wordlength) % wordlength),
          this.size * 0.875
        );
        this.ctx.fillText(this.textcontent, 0, 0);
        this.ctx.restore();
      }
      return this.canvas.toDataURL("image/png");
    };

    if (this.favicon) {
      this.favicon.href = render();
    }
  };
}

new Loading();
