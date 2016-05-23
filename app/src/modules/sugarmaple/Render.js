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
    let $node = this.drawNode(node);

    $orphanNodes[node._id] = $node.children('.list-group');
    if (node._parent !== undefined)
      $orphanNodes[node._parent._id].append($node);
    else
      this._$holder.append($node);
    this._plugins.onNodeRendered($node);
  }

  drawNode(node) {
    const $node        = $(this._templ.item);
    const $nodeChild   = $(this._templ.list);
    const $nodeContent = $(this._templ.itemContent);

    $nodeContent.append(this._tree._options.events.onRender(node));
    $node.attr('node-id', node._id);
    $node.append($nodeContent);
    $node.append($nodeChild);
    $node.data('node', node);

    return $node;
  }

  redrawNode(node) {
    let $node     = $('[node-id=' + node._id + ']').detach();
    const $parent = $('[node-id=' + node._parent._id + ']');
    const $child  = $node.children('.list-group').detach();

    $node = this.drawNode(node);
    $parent.append($node);
    $node.append($child);

    this._plugins.onNodeRendered($node);
  }
}

export default Render;