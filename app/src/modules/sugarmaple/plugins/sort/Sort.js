class Sort {
  constructor(tree, options) {
    this._tree = tree;
    this._options = options;
  }

  draggable($nodeList) {
    const $this = this;

    $nodeList.sortable({
      dropOnEmpty: true,
      delay:       0,
      axis:        'xy',
      zIndex:      9999,
      connectWith: 'ul',
      items:       '> li',
      tolerance:   'intersect',
      receive:     (event, ui) => {
        let detachedNode  = $(ui.item).data('node');
        let newNodeParent = $(event.target).parent('li').data('node');

        $this._tree.detachNode(detachedNode);
        $this._tree.attachNode(newNodeParent, detachedNode);
      }
    });
  }
}

export default Sort;