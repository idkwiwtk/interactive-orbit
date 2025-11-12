class Orbit {
  private centerX: number;
  private centerY: number;
  private ctx: CanvasRenderingContext2D;
  private orbitRadius: number;
  private planetRadius: number;
  private satelliteRadius: number;
  private angle: number;
  private speed: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    orbitRadius: number,
    planetRadius: number,
    satelliteRadius: number,
    speed: number
  ) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.orbitRadius = orbitRadius;
    this.planetRadius = planetRadius;
    this.satelliteRadius = satelliteRadius;
    this.speed = speed;
    this.ctx = ctx;

    this.angle = 0;

    console.log("creat orbit object");
  }

  drawOrbit() {
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.orbitRadius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();
  }

  drawPlanet() {
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.planetRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
  }

  drawSatellite() {
    const satelliteX = this.centerX + this.orbitRadius * Math.cos(this.angle);
    const satelliteY = this.centerY + this.orbitRadius * Math.sin(this.angle);

    this.ctx.beginPath();
    this.ctx.arc(satelliteX, satelliteY, this.satelliteRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
  }

  updateAngle() {
    this.angle += this.speed;
  }

  reset() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    // reset canvas
    this.reset();

    // planet
    this.drawPlanet();

    // orbit
    this.drawOrbit();

    // satellite
    this.drawSatellite();

    // update angle
    this.updateAngle();
  }
}

export default Orbit;
