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
      //$(this).children('ul:not(:empty)').slideToggle({
      //  //duration: 100000,
      //  //easing: 'easeInOutQuint'
      //});
      event.stopImmediatePropagation();
    });
    $node.find('.list-group').sortable({
      dropOnEmpty: true,
      delay:       that._options.parameters.delay,
      axis:        that._options.parameters.axis,
      zIndex:      9999,
      connectWith: 'ul',
      opacity:     0.8,
      items:       '> li',
      tolerance:   'intersect',
      placeholder: 'placeholder',
      receive:     (event, ui) => {
        const detachedNode  = $(ui.item).data('node');
        const newNodeParent = $(event.target).data('node');

        that._tree.detachNode(detachedNode);
        that._tree.attachNode(newNodeParent, detachedNode);

        this._$holder.trigger('receive', {detachedNode: $(ui.item)[0], newParent: $(event.target)[0]});
      },
      out:         (event, ui) => {
        $(event.target).removeClass('overed');
      },
      over:        (event, ui) => {
        this._$holder.find('.overed').removeClass('overed');
        $(event.target).closest('.item-content').addClass('overed');
      },
      stop:        (event, ui) => {
        $(ui.item).closest('.item-content').removeClass('dragged');
        this._$holder.find('.overed').removeClass('overed');

      },
      start:       (event, ui) => {
        $(ui.item).closest('.item-content').addClass('dragged');
      }
    });
  }
}

export default Drag;