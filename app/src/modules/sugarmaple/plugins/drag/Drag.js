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

    $node.click(function (event) {
      $(this).find('.node-child-container:has(.node-child:not(:empty))').eq(0).slideToggle();
      event.stopImmediatePropagation();
    });
    $node.find('.node-child').sortable({
      dropOnEmpty: true,
      delay:       that._options.parameters.delay + 50,
      axis:        that._options.parameters.axis,
      zIndex:      9999,
      connectWith: '.node-child',
      opacity:     0.8,
      items:       '> .node',
      tolerance:   'intersect',
      placeholder: 'placeholder',
      distance:    0,
      receive:     (event, ui) => {
        const detachedNode  = $(ui.item).data('node');
        const newNodeParent = $(event.target).data('node');

        that._tree.detachNode(detachedNode);
        that._tree.attachNode(newNodeParent, detachedNode);

        this._$holder.trigger('receive', {detachedNode: $(ui.item)[0], newParent: $(event.target)[0]});
      },
      out:         (event, ui) => {
      },
      over:        (event, ui) => {
      },
      stop:        (event, ui) => {
        $(ui.item).find('.node-content').eq(0).removeClass('dragged');
        $(ui.item).removeClass('nobg');

      },
      start:       (event, ui) => {
        $(this).find('.node-child-container:has(.node-child:not(:empty))').eq(0).slideUp();
        $(ui.item).find('.node-content').eq(0).addClass('dragged');
        $(ui.item).addClass('nobg');
      }
    });
  }
}

export default Drag;