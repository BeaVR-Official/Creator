import ScenePlayer from './ScenePlayer';
import Constants from '../creator/Constants';

class ScenePlayerUI {

  constructor() {
    this.adaptToWindow();
    $('#mainView')
      .click(() => {
        //console.log(e);
        ScenePlayer.load();
      });

    $('#mainView').append(ScenePlayer._renderer.domElement);
  }

  /*
  constructor() {
    this.adaptToWindow();
    //$(window).resize(() => this.adaptToWindow());
    //$('#mainView').append(Scene._renderer.domElement);
    //SceneControls.constructor();
  }
  */

  adaptToWindow() {
    // let parentWidth  = $(window).width() - ($('.categories-left-panel').width() +
    // $('.properties-left-panel').outerWidth()); let parentHeight = $(window).height();

    let parentWidth  = $(window).width() - Constants.getCanvasSettings().width;
    let parentHeight = $(window).height();

    ScenePlayer._camera.aspect = parentWidth / parentHeight;
    ScenePlayer._camera.updateProjectionMatrix();
    ScenePlayer._renderer.setSize(parentWidth, parentHeight);
    ScenePlayer.render();
  }

}

export default new ScenePlayerUI();