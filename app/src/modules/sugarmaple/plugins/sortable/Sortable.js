import AbstractPlugin from '../AbstractPlugin';

/**
 * Sortable plugin, jQuery Sortable equivalent
 */
class Sortable extends AbstractPlugin {
  constructor(renderer, options) {
    super(renderer, options);
    this.$overNode    = undefined;
    this.$dragNode    = undefined;
    this.$placeHolder = $(this.options.templates.placeholder);
  }

  _initNode(node) {
    if (node.drag === undefined) node.drag = {};
    if (node.drag.foldable === undefined)
      node.drag.foldable = this.options.parameters.defaultFoldable;
    if (node.drag.draggable === undefined)
      node.drag.draggable = this.options.parameters.defaultDraggable;
    if (node.drag.droppable === undefined)
      node.drag.droppable = this.options.parameters.defaultDroppable;
  }

  _onNodeRendered($node) {
    const node = this._nodeFromElement($node);

    // set the basic css/state for a non-dragged node
    $node.find('.node-content').eq(0).addClass('basic');
    if (node.drag.droppable) this.droppable(node);
    if (node.parent !== undefined) { // not applicable to rootNode
      if (node.drag.foldable) this.foldable(node);
      if (node.drag.draggable) this.draggable(node);
    }
  }

  /**
   * Make a not not foldable
   * @param node
   */
  notFoldable(node) {
    const $node = this._elementFromNode(node);

    node.drag.foldable = false;
    $node.trigger('expand');
    $node.unbind('fold expand');
  }

  /**
   * Gives a node the ability to be folded
   * (Useful while dragging a node with children)
   * @param node
   */
  foldable(node) {
    const $node = this._elementFromNode(node);

    node.drag.foldable = true;
    this._makeFoldableFromElem($node);
  }

  /**
   * Gives a node the ability to be folded
   * (Useful while dragging a node with children)
   * @param $node
   */
  _makeFoldableFromElem($node) {
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
   * Make a node not draggable
   * @param node
   */
  notDraggable(node) {
    const $node = this._elementFromNode(node);

    node.drag.draggable = false;
    if ($node.draggable('instance') !== undefined)
      $node.draggable('destroy');
  }

  /**
   * Gives a node the ability to be dragged
   * @param node
   */
  draggable(node) {
    node.drag.draggable = true;

    const that  = this;
    const $node = this._elementFromNode(node);
    $node.draggable({
      handle:            '> .node-content',
      zIndex:            9999,
      scroll:            true,
      scrollSpeed:       that.options.parameters.scrollSpeed,
      scrollSensitivity: that.options.parameters.scrollSensitivity,
      revertDuration:    that.options.parameters.revertDuration,
      create:            function () {
        this.$dragNode          = $(this);
        this.$dragNode.$content = this.$dragNode.find('.node-content').eq(0);
      },
      helper:            function () {
        // create a foldable clone of the dragged node
        that.$helper          = $(this).clone();
        that.$helper.$content = that.$helper.find('.node-content').eq(0);
        // please be foldable
        that._makeFoldableFromElem(that.$helper);

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
        // foldable dragged node & set sortable state & hide
        that.$dragNode.hide();
        that.$dragNode.trigger('fold');
        that.$dragNode.$content.switchClass('basic', 'dragged',
          that.options.parameters.effectsDuration);
        // foldable helper & set sortable state
        that.$helper.trigger('fold');
        that.$helper.addClass('no-bg');
        that.$helper.$content.addClass('dragged',
          that.options.parameters.effectsDuration);
        that._trigger('dragged', [node]);
      },
      stop:              function () {
        // un-hide dragged node, expand & set basic state
        that.$dragNode.show();
        that.$dragNode.trigger('expand');
        that.$dragNode.$content.switchClass('dragged', 'basic',
          that.options.parameters.effectsDuration);
        that.$placeHolder.detach();
      },
      revert:            function () {
        // move the dragged node relative to the position of the helper
        return !that.addRelativelyToOverNode(that.$dragNode);
      }
    });
  }

  /**
   * TODO Clean the code. /!\ DO NOT SCREAM /!\
   * Adds an $element above or under the current overed node
   * The helper indicates its position relatively to the overed node
   * @return Boolean Whether the node receiving $element is droppable or not
   * @param $element
   */
  addRelativelyToOverNode($element) {
    if (this.$helper.pos === 'top') {
      // Cannot append Node to the top of Root
      if (this.tree.isRoot(this.$overNode.data('node')))
        return false;
      // Check if the top receiver ( = parent of overed node) is able to receive
      const $topParent = this.$overNode.parents('.node').eq(0).find('.node-content').eq(0);
      if ($topParent.droppable('instance') !== undefined) {
        $element.insertBefore(this.$overNode); // move in ui
        if ($element !== this.$placeHolder) { // move in tree data
          const parent = this._nodeFromElement($topParent);
          const moved = this._nodeFromElement($element);
          this.tree.attach(parent, moved);
          this._trigger('dropped', [parent, moved]);
        }
      } else return false;
    } else if (this.$helper.pos === 'bottom') {
      // Check if the bottom receiver ( = overed node itself) is able to receive
      const $bottomParent = this.$overNode.find('.node-content').eq(0);
      if ($bottomParent.droppable('instance') !== undefined) {
        this.$overNode.$child.prepend($element); // move in ui
        if ($element !== this.$placeHolder) { // move in tree data
          const parent = this._nodeFromElement(this.$overNode);
          const moved = this._nodeFromElement($element);
          this.tree.attach(parent, moved);
          this._trigger('dropped', [parent, moved]);
        }
      } else return false;
    }

    return true;
  }

  /**
   * Make a node not droppable
   * @param node
   */
  notDroppable(node) {
    const $node = this._elementFromNode(node).find('.node-content').eq(0);

    node.drag.droppable = false;
    if ($node.droppable('instance') !== undefined)
      $node.droppable('destroy');
  }

  /**
   * Gives a node the ability to receive draggable ones
   * @param node
   */
  droppable(node) {
    node.drag.droppable = true;

    const that  = this;
    const $node = this._elementFromNode(node);
    $node.find('.node-content').eq(0).droppable({
      greedy:    true,
      accept:    '.node',
      tolerance: 'pointer',
      create:    function () {
        this.$dropNode          = $node;
        this.$dropNode.$child   = $node.find('.node-child').eq(0);
        this.$dropNode.$content = $(this);
      },
      over:      function () {
        // save the overed node for later use (sortable)
        that.$overNode = this.$dropNode;
      }
    });
  }
}

export default Sortable;