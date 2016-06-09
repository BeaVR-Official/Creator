class Sort {
  constructor(tree, options) {
    this.tree    = tree;
    this.options = options;
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
        let detachedNode  = $(ui.node).data('node');
        let newNodeParent = $(event.target).parent('li').data('node');

        $this.tree.detachNode(detachedNode);
        $this.tree.attachNode(newNodeParent, detachedNode);
      }
    });
  }
}

export default Sort;