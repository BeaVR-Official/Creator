import Plugins from './Plugins';

class Render {
  constructor(tree, holder) {
    this._$holder = $(holder);
    this._tree    = tree;
    this._templ   = tree._options.templates;
    this._plugins = new Plugins(this);
  }

  render() {
    this._$holder.empty();

    const $orphanNodes = [];
    JSON.stringify(this._tree, (key, val) => {
      if (val === null) return undefined;
      if (key === '_options') return undefined;
      if (key === '_parent') return undefined;
      if (typeof val === 'object' && val.hasOwnProperty('_id'))
        this.renderNode(val, $orphanNodes);
      return val;
    });

    this._plugins.onTreeRendered(this._$holder);
  }

  renderNode(node, $orphanNodes) {
    let $parent;
    const $node = this.drawNode(node);

    $orphanNodes[node._id] = $node;
    if (node._parent !== undefined) {
      $parent = $orphanNodes[node._parent._id];
      $parent.find('.node-child:eq(0)').append($node);
    }
    else {
      $parent = this._$holder;
      $parent.append($node);
    }

    // ugly workaround for nested sortables

    this._plugins.onNodeRendered($node);
  }

  drawNode(node) {
    const $node    = $(this._templ.node);
    const $content = $(this._templ.content);
    const $title   = $(this._templ.title);
    const $child   = $(this._templ.child);

    $node.attr('node-id', node._id);
    if (this._tree._options.events.onRender === 'function')
      $content.append(this._tree._options.events.onRender(node));
    $title.append(node._name);
    $content.append($title);
    $node.append($content);
    $node.append($child);

    $node.data('node', node);
    $content.data('node', node);
    $title.data('node', node);
    $child.data('node', node);

    return $node;
  }
}

export default Render;