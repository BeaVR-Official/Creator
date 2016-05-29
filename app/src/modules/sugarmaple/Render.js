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
    if (node._parent !== undefined)
      $parent = $($orphanNodes[node._parent._id].find('.list-group')[0]);
    else
      $parent = this._$holder;
    $parent.append($node);

    // ugly workaround for nested sortables
    $parent.find('.list-group').each(function () {
      const pos    = $(this).position();
      $(this).css('margin-top', -pos.top + 'px');
      $(this).css('padding-top', pos.top + 'px');
    });

    this._plugins.onNodeRendered($node.children('.item-container'));
  }

  drawNode(node) {
    const $node          = $(this._templ.item);
    const $nodeContainer = $(this._templ.container);
    const $nodeContent   = $(this._templ.content);
    const $nodeTitle     = $(this._templ.title);
    const $nodeChild     = $(this._templ.list);

    $nodeTitle.append(node._name);
    if (this._tree._options.events.onRender === 'function')
      $nodeContent.append(this._tree._options.events.onRender(node));
    $nodeContent.append($nodeTitle);
    $nodeContainer.attr('node-id', node._id);
    $nodeContainer.append($nodeContent);
    $nodeContainer.append($nodeChild);
    $node.append($nodeContainer);

    $node.data('node', node);
    $nodeContainer.data('node', node);
    $nodeContent.data(node);
    $nodeTitle.data(node);
    $nodeChild.data('node', node);

    return $node;
  }
}

export default Render;