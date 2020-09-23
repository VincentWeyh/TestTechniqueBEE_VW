/**
 * @jest-environment jsdom
 */

/// DrawingApp.test.ts
import DrawingApp from '../lib/DrawingApp';

test("Drawing App DOM ELEMENT", () => {
  document.body.innerHTML= `
  <div id="main" class="main">
    <canvas id="mainCanvas" class="main__canvas"></canvas>
  </div>
  `

  const drawingApp = new DrawingApp(document.getElementById("mainCanvas") as HTMLCanvasElement)

  expect(drawingApp.DOMElement).toBe(drawingApp.DOMElement);
})
