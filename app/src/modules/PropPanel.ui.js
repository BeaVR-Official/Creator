/**
 * Created by urvoy_p on 04/05/16.
 */

class PropPanelUI {
  constructor() {
    $('#propertiesPanel').resizable({
      // minHeight: 200,
      minWidth: 200,
      // maxWidth: $('#propertiesPanel').width(),
      handles: "w" // coordonnées géographiques nswe
    });
  }
}

export default new PropPanelUI();