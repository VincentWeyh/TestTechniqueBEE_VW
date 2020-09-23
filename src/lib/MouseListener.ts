class MouseListener {

  domElement: HTMLElement;
  mousePosX: number = 0;
  mousePosY: number = 0;

  constructor(domElement: HTMLElement) {
    this.domElement = domElement;

    this.initListeners();
  }

  initListeners = (): void => {
    this.domElement.addEventListener('mousemove', (e: MouseEvent) => {
      this.mousePosX = e.clientX;
      this.mousePosY = e.clientY;
    })
  }
}

export default MouseListener