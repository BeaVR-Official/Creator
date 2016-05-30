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
      $(this).find('.node-child').eq(0).slideToggle();
      event.stopImmediatePropagation();
    });
    $node.find('.node-child').sortable({
      dropOnEmpty:          true,
      delay:                that._options.parameters.delay,
      axis:                 that._options.parameters.axis,
      zIndex:               9999,
      connectWith:          '.node-child',
      opacity:              0.8,
      items:                '> .node',
      tolerance:            'intersect',
      placeholder:          'placeholder',
      receive:              (event, ui) => {
        const detachedNode  = $(ui.item).data('node');
        const newNodeParent = $(event.target).data('node');

        that._tree.detachNode(detachedNode);
        that._tree.attachNode(newNodeParent, detachedNode);

        this._$holder.trigger('receive', {detachedNode: $(ui.item)[0], newParent: $(event.target)[0]});
      },
      out:                  (event, ui) => {
        $(event.target).removeClass('overed');
      },
      over:                 (event, ui) => {
        this._$holder.find('.overed').removeClass('overed');
        $(event.target).closest('.node-content').addClass('overed');
      },
      stop:                 (event, ui) => {
        $(ui.item).find('.node-content').eq(0).removeClass('dragged');
        this._$holder.find('.overed').removeClass('overed');

      },
      start:                (event, ui) => {
        $(ui.item).find('.node-content').eq(0).addClass('dragged');
      }
    });
  }
}

export default Drag;