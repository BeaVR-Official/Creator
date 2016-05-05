/**
 * Created by urvoy_p on 04/05/16.
 */

class ScenesPanelUI {
  constructor() {
    $('#scenesPanel').resizable({
      // minHeight: 200,
      minWidth: 200,
      maxWidth: $('#scenesPanel').width(),
      handles: "e" // coordonnées géographiques nswe
    });
  }
}

export default new ScenesPanelUI();