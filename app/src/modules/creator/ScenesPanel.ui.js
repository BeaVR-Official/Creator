import SugarMaple from '../sugarmaple/SugarMaple';
import ScenePanel from './ScenesPanel';

class ScenesPanelUI {
  constructor() {
    $('#scenesPanel').resizable({
      // minHeight: 200,
      // minHeight: 200,
      minWidth: 200,
      maxWidth: 1000,
      handles:  "e" // coordonnées géographiques nswe
    });

    $.widget("custom.sugarmaple", {
      _create: function () {
        new SugarMaple(this, this.options);
      }
    });

    this.sm = $('#sceneTree').sugarmaple({
      events:  {
        onImport: (node) => {
          return node;
        },
        onExport: (node) => {
          return node;
        }
      },
      plugins: {
        manage:    true,
        sortable:  true,
        checkable: true
      }
    });

    ScenePanel.initTree(this.sm);
    this.sugarMapleEvents();
  }

  sugarMapleEvents() {
    this.sm.on('checkable.checked', (e, node) => {
      if (node !== undefined)
        ScenePanel.onChecked(node);
    });

    this.sm.on('checkable.unchecked', (e, node) => {
      ScenePanel.onUnchecked();
    });

    this.sm.on('sortable.dragged', (e, node) => {
      if (node !== undefined)
        ScenePanel.onDragged(node);
    });

    this.sm.on('sortable.dropped', (e, newParent, node) => {
      if (newParent !== undefined)
        ScenePanel.onDropped(newParent, node);
    });
  }
}

export default new ScenesPanelUI();