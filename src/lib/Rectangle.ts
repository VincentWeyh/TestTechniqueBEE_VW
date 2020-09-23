class Rectangle {

  public x: number;
  public y: number;
  public height: number;
  public width: number;
  public fillColor: string;
  public path?: Path2D;
  public toDestroy: boolean = false;
  public isRotating: boolean = false;

  private rotation: number = 0;
  private rotationSpeed: number = 3;
  private maxRotation: number = 360;

  constructor(x: number, y: number, height: number, width: number, fillColor: string) {
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.fillColor = fillColor
  }

  draw = (ctx: CanvasRenderingContext2D): Path2D => {
    ctx.save();
    ctx.beginPath();
    const rect2d = new Path2D();

    if (this.isRotating) {
      ctx.translate(this.width / 2 + this.x, this.height / 2 + this.y);
      rect2d.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.rotate(this.rotate() * Math.PI / 180);
    } else {
      rect2d.rect(this.x, this.y, this.width, this.height);
    }

    ctx.fillStyle = this.fillColor;
    ctx.stroke(rect2d);
    ctx.fill(rect2d);
    ctx.restore();

    return rect2d
  }

  initRotate = (): void => {
    if (this.rotation <= this.maxRotation) this.isRotating = true;
  }

  rotate = (): number => {
    if (this.rotation >= this.maxRotation) {
      this.isRotating = false;
      this.toDestroy = true;

      return this.maxRotation;
    }

    return this.rotation += this.rotationSpeed;
  }
}

export default Rectangle