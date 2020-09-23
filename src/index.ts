import DrawingApp from './lib/DrawingApp'

window.onload = (): void => {
  const DOMCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
  DOMCanvas.width = window.innerWidth;
  DOMCanvas.height = window.innerHeight;

  if (DOMCanvas) {
    new DrawingApp(DOMCanvas);
  }
}