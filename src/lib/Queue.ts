import Rectangle from './Rectangle'

class Queue {

  private items: Array<Rectangle> = [];

  push = (item: Rectangle): void => {
    this.items.push(item);
  }

  itemsToRemove = (): Array<Rectangle> => {
    if (this.items.every(rect => rect.toDestroy === true))
      return this.items;

    return Array<Rectangle>();
  }
}

export default Queue