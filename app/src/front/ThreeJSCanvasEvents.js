import Constants from '../modules/creator/Constants';
import GraphicalManager from '../modules/common/GraphicalManager';

class ThreeJSCanvasEvents {
  constructor() {
    let canvas = $('#SceneSelector')[0];

    canvas.addEventListener("mousedown", this._onMouseDown, false);
    canvas.addEventListener("mousemove", this._onMouseDown, false);
    canvas.addEventListener("mouseup", this._onMouseUp, false);
    // mouseEvent() {
    //   let threeJSCanvas = $('#mainView');
    //
    //   threeJSCanvas.mousedown(() => {
    //     console.log("mouseDown");
    //   });
    //
    //   threeJSCanvas.mousemove(() => {
    //     console.log("mouseMove");
    //   });
    //
    //   threeJSCanvas.mouseup(event _onMouseDown=> {
    //     let x = event.clientX - Constants.getCanvasSettings().width;
    //     let y = event.clientY - Constants.getCanvasSettings().height;
    //
    //     let windowWidth  = window.innerWidth - Constants.getCanvasSettings().width;
    //     let windowHeight = window.innerHeight - Constants.getCanvasSettings().height;
    //
    //     let mouse = {
    //       x: (x / windowWidth * 2) - 1,
    //       y: -(y / windowHeight * 2) + 1
    //     };
    //
    //     GraphicalManager.setMouse(mouse);
    //
    //     console.log("mouseUp");
    //
    //   });
    //
    // }
  }

  _onMouseDown(event) {
  }

  _onMouseMove(event) {
  }

  _onMouseUp(event) {
    let x = event.clientX;
    let y = event.clientY - $(".TopBarSelector").height();


    let windowWidth  = window.innerWidth;
    let windowHeight = window.innerHeight;

    let mouse = {
      x: (x / windowWidth * 2) - 1,
      y: -(y / windowHeight * 2) + 1
    };

    GraphicalManager.setMouse(mouse);
  }


  // TODO add keyboardEvents (optional for rush)
}

export default ThreeJSCanvasEvents;