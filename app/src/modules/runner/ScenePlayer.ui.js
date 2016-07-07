import ScenePlayer from './ScenePlayer';

class ScenePlayerUI {

  constructor() {
    $('#mainView')
      .click(() => {
        console.log(e);
        ScenePlayer.load();
      });
  }
}

export default new ScenePlayerUI();