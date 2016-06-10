import Plugins from './Plugins';

class Renderer {
  constructor(tree, holder) {
    this.$holder = $(holder);
    this.tree    = tree;
    this.plugins = new Plugins(this);
  }

  renderSubtree(tree, $parents) {
    if ($parents === undefined) $parents = {};

    JSON.stringify(tree, (key, val) => {
      if (val === null) return undefined;
      if (key === 'options') return undefined;
      if (key === 'parent') return undefined;
      if (typeof val === 'object' && val.hasOwnProperty('id'))
        this._renderNode(val, $parents);
      return val;
    });
  }

  _renderNode(node, $parents) {
    let $parent;
    const $node = this._drawNode(node);

    $parents[node.id] = $node;
    if (node.parent !== undefined)
      $parent = $parents[node.parent.id].find('.node-child').eq(0);
    else {
      $parent = this.$holder;
      $parent.empty();
    }

    $parent.append($node);

    this.plugins.onNodeRendered($node);
  }

  _drawNode(node) {
    const $node      = $(this.tree.options.templates.node);
    const $content   = $(this.tree.options.templates.content);
    const $title     = $(this.tree.options.templates.title);
    const $child     = $(this.tree.options.templates.child);
    const $childCont = $(this.tree.options.templates.childCont);

    $node.attr('node-id', node.id);
    if (typeof this.tree.options.events.onRender === 'function')
      $content.append(this.tree.options.events.onRender(node));
    $title.append(node.name);
    $content.append($title);
    $node.append($content);
    $childCont.append($child);
    $node.append($childCont);

    $node.data('node', node);
    $content.data('node', node);
    $title.data('node', node);
    $childCont.data('node', node);
    $child.data('node', node);

    return $node;
  }
}

export default Renderer;