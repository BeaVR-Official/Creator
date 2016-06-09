import Plugins from './Plugins';

class Render {
  constructor(tree, holder) {
    this.$holder   = $(holder);
    this.tree      = tree;
    this.templates = tree.options.templates;
    this.plugins   = new Plugins(this);
  }

  renderTree() {
    this.$holder.empty();
    this.renderSubtree(this.tree);
    this.plugins.onTreeRendered(this.$holder);
  }

  renderSubtree(tree, $parents) {
    if ($parents === undefined)
      $parents = {};
    JSON.stringify(tree, (key, val) => {
      if (val === null) return undefined;
      if (key === 'options') return undefined;
      if (key === 'parent') return undefined;
      if (typeof val === 'object' && val.hasOwnProperty('id'))
        this.renderNode(val, $parents);
      return val;
    });

  }

  renderNode(node, $parents) {
    let $parent;
    const $node = this.drawNode(node);

    $parents[node.id] = $node;
    if (node.parent !== undefined)
      $parent = $parents[node.parent.id].find('.node-child').eq(0);
    else
      $parent = this.$holder;

    $parent.append($node);

    this.plugins.onNodeRendered($node);
  }

  drawNode(node) {
    const $node      = $(this.templates.node);
    const $content   = $(this.templates.content);
    const $title     = $(this.templates.title);
    const $child     = $(this.templates.child);
    const $childCont = $(this.templates.childCont);

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

export default Render;