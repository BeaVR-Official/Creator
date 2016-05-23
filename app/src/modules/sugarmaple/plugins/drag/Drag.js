import AbstractPlugin from '../AbstractPlugin';

class Drag extends AbstractPlugin {
  constructor(render, options) {
    super(render, options);
  }

  onTreeRendered() {
    // nothing to be done for that plugin
  }

  onNodeRendered($node) {
    const that = this;

    $node.children('.list-group').sortable({
      dropOnEmpty: true,
      delay:       that._options.parameters.delay,
      axis:        that._options.parameters.axis,
      zIndex:      9999,
      connectWith: 'ul',
      items:       '> li',
      tolerance:   'intersect',
      receive:     (event, ui) => {
        const detachedNode  = $(ui.item).data('node');
        const newNodeParent = $(event.target).parent('li').data('node');

        that._tree.detachNode(detachedNode);
        that._tree.attachNode(newNodeParent, detachedNode);

        if (typeof that._options.events.onReceive === 'function')
          that._options.events.onReceive(ui.item, event.target);
      },
      out:         (event, ui) => {
        if (typeof that._options.events.onOut === 'function')
          that._options.events.onOut(ui.item, event.target);
      },
      over:        (event, ui) => {
        if (typeof that._options.events.onOver === 'function')
          that._options.events.onOver(ui.item, event.target);
      },
      stop:        (event, ui) => {
        if (typeof that._options.events.onStop === 'function')
          that._options.events.onStop(ui.item);
      },
      start:       (event, ui) => {
        if (typeof that._options.events.onStart === 'function')
          that._options.events.onStart(ui.item);
      }
    });
  }
}

export default Drag;