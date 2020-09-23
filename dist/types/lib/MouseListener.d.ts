declare class MouseListener {
    domElement: HTMLElement;
    mousePos: object;
    constructor(domElement: HTMLElement);
    initListeners(): void;
}
export default MouseListener;
