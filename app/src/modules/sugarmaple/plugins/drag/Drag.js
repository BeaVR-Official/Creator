import AbstractPlugin from '../AbstractPlugin';

/**
 * Drag plugin, jQuery Sortable equivalent
 */
class Drag extends AbstractPlugin {
  constructor(renderer, options) {
    super(renderer, options);
    this.$overNode    = undefined;
    this.$dragNode    = undefined;
    this.$placeHolder = $(this.options.templates.placeholder);
  }

  onNodeRendered($node) {
    const node = this.nodeFromElement($node);

    this.initNode(node);

    // set the basic css for a non-dragged node
    $node.find('.node-content').eq(0).addClass('basic');
    if (node.parent !== undefined) { // not applicable to rootNode
      this.foldable(node);
      this.draggable(node);
      this.droppable(node);
    }
  }

  /**
   * Adds the necessary data structure to a Node
   * for the plugin to work
   * @param node
   */
  initNode(node) {
    if (node.drag === undefined) node.drag = {};
    if (node.drag.foldable === undefined)
      node.drag.foldable = this.options.parameters.foldable;
    if (node.drag.draggable === undefined)
      node.drag.draggable = this.options.parameters.draggable;
    if (node.drag.droppable === undefined)
      node.drag.droppable = this.options.parameters.droppable;
  }

  /**
   * Gives a node the ability to be folded
   * (Useful while dragging a node with children)
   * @param node
   */
  foldable(node) {
    node.drag.foldable = true;
    this.makeFoldableFromElem(this.elementFromNode(node));
  }

  /**
   * Gives a node the ability to be folded
   * (Useful while dragging a node with children)
   * @param $node
   */
  makeFoldableFromElem($node) {
    if (!this.options.parameters.foldable) return;

    const that            = this;
    const $childContainer = $node.find('.node-child-container').eq(0);

    $childContainer.addClass('expand');
    $node.on('fold expand', function (event) {
      if (!$childContainer.hasClass(event.type)) {
        const rmClass = event.type === 'expand' ? 'fold' : 'expand';

        $childContainer.switchClass(rmClass, event.type,
          that.options.parameters.effectsDuration);
      }
      event.stopPropagation();
    });
  }

  /**
   * Gives a node the ability to be dragged
   * @param node
   */
  draggable(node) {
    node.drag.draggable = true;
    if (!this.options.parameters.draggable) return;

    const that  = this;
    const $node = this.elementFromNode(node);
    $node.draggable({
      scrollSensitivity: 20,
      scrollSpeed:       10,
      zIndex:            9999,
      scroll:            true,
      revertDuration:    that.options.parameters.revertDuration,
      create:            function () {
        this.$dragNode          = $(this);
        this.$dragNode.$content = this.$dragNode.find('.node-content').eq(0);
      },
      helper:            function () {
        // create a foldable clone of the dragged node
        that.$helper          = $(this).clone();
        that.$helper.$content = that.$helper.find('.node-content').eq(0);
        // please fold
        that.makeFoldableFromElem(that.$helper);

        return that.$helper;
      },
      drag:              function () {
        if (that.$overNode === undefined) return;
        // get distance from helper to overed node
        const dragOffset = that.$helper.offset();
        const overOffset = that.$overNode.offset();
        const overHeight = that.$overNode.$content.outerHeight();
        const distance   = dragOffset.top - overOffset.top;
        // determine dragged relative position to the overed node
        if (Math.abs(distance) <= overHeight / 2) {
          if (distance >= -overHeight / 2 && distance <= 0)
            that.$helper.pos = 'top';
          else if (distance > 0 && distance <= overHeight / 2)
            that.$helper.pos = 'bottom';
          // move the placeholder relative to the position of the helper
          that.addRelativelyToOverNode(that.$placeHolder);
        }
      },
      start:             function () {
        that.$dragNode = this.$dragNode;
        // foldable dragged node & set drag state & hide
        that.$dragNode.hide();
        that.$dragNode.trigger('fold');
        that.$dragNode.$content.switchClass('basic', 'dragged',
          that.options.parameters.effectsDuration);
        // foldable helper & set drag state
        that.$helper.trigger('fold');
        that.$helper.addClass('no-bg');
        that.$helper.$content.addClass('dragged',
          that.options.parameters.effectsDuration);
      },
      stop:              function () {
        // move the dragged node relative to the position of the helper
        that.addRelativelyToOverNode(that.$dragNode);
        // un-hide dragged node, expand & set basic state
        that.$dragNode.show();
        that.$dragNode.trigger('expand');
        that.$dragNode.$content.switchClass('dragged', 'basic',
          that.options.parameters.effectsDuration);
        that.$placeHolder.detach();
      },
      revert:            function () {
        return false;
      }
    });
  }

  /**
   * Adds an element above or under the current overed node
   * The helper indicates its position relatively to the overed node
   * @param $element
   */
  addRelativelyToOverNode($element) {
    if (this.$helper.pos === 'top')
      $element.insertBefore(this.$overNode);
    else if (this.$helper.pos === 'bottom')
      this.$overNode.$child.prepend($element);
  }

  /**
   * Gives a node the ability to be dropped
   * @param node
   */
  droppable(node) {
    node.drag.droppable = true;
    if (!this.options.parameters.droppable) return;

    const that  = this;
    const $node = this.elementFromNode(node);
    $node.find('.node-content').eq(0).droppable({
      greedy:    true,
      accept:    '.node',
      tolerance: 'pointer',
      create:    function () {
        this.$dropNode          = $(this).parents('.node').eq(0);
        this.$dropNode.$child   = this.$dropNode.find('.node-child').eq(0);
        this.$dropNode.$content = $(this);
      },
      over:      function () {
        // save the overed node for later use (drag)
        that.$overNode = this.$dropNode;
      }
    });
  }
}

export default Drag;