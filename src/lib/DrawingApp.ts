import MouseListener from './MouseListener'
import Rectangle from './Rectangle'
import Queue from './Queue'

class DrawingApp {

  public DOMElement: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;

  private isDrawing: boolean = false;
  private currentDrawnRect?: Rectangle;
  private rectsToDraw: Array<Rectangle> = [];
  private deleteQueue: Queue;

  private mouseListener: MouseListener;
  private mouseStartX: number = 0;
  private mouseStartY: number = 0;

  constructor(DOMElement: HTMLCanvasElement) {
    this.DOMElement = DOMElement;
    this.canvasContext = this.DOMElement.getContext('2d') as CanvasRenderingContext2D;

    this.deleteQueue = new Queue();
    this.mouseListener = new MouseListener(this.DOMElement);

    this.initListeners();
    this.draw();
  }

  /**
   * Main request animation frame
  */
  draw = (): void => {
    // Clear the canvas
    this.canvasContext.clearRect(0, 0, this.DOMElement.width, this.DOMElement.height);

    // Filter previous drawn rectangles with the ones to remove
    this.rectsToDraw = this.rectsToDraw.filter(x => {
      if (this.deleteQueue.itemsToRemove())
        return this.deleteQueue.itemsToRemove().indexOf(x) < 0

      return 1
    });

    // Draw existing rectangles
    this.rectsToDraw.forEach((rect) => {
      rect.draw(this.canvasContext)
    });

    // Drawing the current rectangle
    if (this.isDrawing && this.canvasContext && this.currentDrawnRect) {
      this.currentDrawnRect.height = this.mouseListener.mousePosY - this.mouseStartY;
      this.currentDrawnRect.width = this.mouseListener.mousePosX - this.mouseStartX;

      this.currentDrawnRect.path = this.currentDrawnRect.draw(this.canvasContext);
    }

    requestAnimationFrame(this.draw)
  }

  initListeners = (): void => {

    this.DOMElement.addEventListener('click', () => {
      this.isDrawing = !this.isDrawing;

      if (this.isDrawing) {
        this.mouseStartX = this.mouseListener.mousePosX;
        this.mouseStartY = this.mouseListener.mousePosY;

        // Initialize the current drawing rectangle
        this.currentDrawnRect = new Rectangle(this.mouseStartX, this.mouseStartY, 0, 0, this.getRandomRgbaColor())
      }
      else {
        // Add the new rectangle to the existing ones
        this.rectsToDraw.push(this.currentDrawnRect!);
        this.currentDrawnRect = undefined;
      }
    })

    this.DOMElement.addEventListener('dblclick', () => {
      this.checkClickRectPath();
    })
  }

  checkClickRectPath = (): void => {
    this.rectsToDraw.filter(rect => rect != this.currentDrawnRect).forEach((rect) => {
      if (this.canvasContext.isPointInPath(rect.path!, this.mouseListener.mousePosX, this.mouseListener.mousePosY)) {
        rect.initRotate();
        this.deleteQueue.push(rect);
      }
    })
  }

  getRandomRgbaColor(): string {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.9)`
  }
}

export default DrawingApp