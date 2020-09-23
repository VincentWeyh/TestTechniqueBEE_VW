/// Rectangle.test.ts
import Rectangle from '../lib/Rectangle';

test("Rectangle constructor values", () => {
  const width = 15;
  const height = 20;
  const xPos = 5;
  const yPos = 15;

  let rect = new Rectangle(width, height, xPos, yPos, 'rgba(0, 0, 0, 0.5)');

  expect(rect.x).toBe(width);
  expect(rect.y).toBe(height);
  expect(rect.height).toBe(xPos);
  expect(rect.width).toBe(yPos);
  expect(rect.fillColor).toBe('rgba(0, 0, 0, 0.5)');
})

test("Rectangle rotation", () => {
  const width = 15;
  const height = 20;
  const xPos = 5;
  const yPos = 15;

  let rect = new Rectangle(width, height, xPos, yPos, 'rgba(0, 0, 0, 0.5)');
  rect.initRotate()
  
  expect(rect.isRotating).toBe(true);
})