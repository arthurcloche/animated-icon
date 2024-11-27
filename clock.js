function Clock() {
  this.start = () => {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 64;
    this.canvas.height = 64;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    setInterval(() => this.loop(), 1000);
  };
  this.start();
  this.loop = () => {
    const d = new Date(); //Date.now();
    const renderClock = (bgCol) => {
      let width = 2;
      let height = 64;
      this.ctx.fillStyle = bgCol;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      this.ctx.fillStyle = "#fff";
      this.ctx.translate(height * 0.5, height * 0.5);
      this.ctx.rotate((d.getSeconds() / 60) * 2 * 3.1415 + 3.1415);
      this.ctx.fillRect(-width / 2, 0, width, height * 0.9);
      this.ctx.restore();

      this.ctx.save();
      this.ctx.fillStyle = "#fff";
      this.ctx.translate(height * 0.5, height * 0.5);
      this.ctx.rotate((d.getMinutes() / 60) * 2 * 3.1415 + 3.1415);
      this.ctx.fillRect(-width / 2, 0, width, height / 2);
      this.ctx.restore();

      width = 3;
      this.ctx.save();
      this.ctx.fillStyle = "#fff";
      this.ctx.translate(height * 0.5, height * 0.5);
      this.ctx.rotate(
        (((d.getHours() + d.getMinutes() / 60) % 24) / 12) * 2 * 3.1415 + 3.1415
      );
      this.ctx.fillRect(-width / 2, 0, width, height / 3);
      this.ctx.restore();
      return this.canvas.toDataURL("image/png");
    };

    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = renderClock("#000");
    }
  };
}

new Clock();
