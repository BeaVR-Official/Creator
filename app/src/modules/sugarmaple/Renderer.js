import Plugins from './Plugins';
import {Tree} from './Tree';

/**
 * Displays a node by building it & requesting plugins
 */
class Renderer {
  constructor(tree, widget) {
    this.tree    = tree;
    this.widget  = widget;
    this.$holder = $(widget.element);
    this.plugins = new Plugins(this);
  }

  /**
   * Appends a Tree or sub-Tree Nodes to its parent
   * @param tree the Node representing a part / whole tree
   */
  render(tree) {
    const $parents = {};
    if (tree instanceof Tree)
      tree = tree.getRoot();
    this.tree.iterateOver(tree, (node) => {
      this._renderNode(node, $parents);
    });
  }

  /**
   * Draws a node and appends it to its parent
   * @param node Node to be rendered
   * @param $parents Nodes previously rendered
   * @private
   */
  _renderNode(node, $parents) {
    const $node = this._drawNode(node);
    let $parent;

    $parents[node.id] = $node;
    // if the node is not the root
    if (!this.tree.isRoot(node)) {
      // if rendering a subtree, finds its DOM parent
      if ($parents[node.parent.id] === undefined)
        $parents[node.parent.id] = this._elementFromNode(node.parent);
      // if rendering a tree, gets the parent from the drawn nodes
      $parent = $parents[node.parent.id].find('.node-child').eq(0);
    } else { // if rootNode prepare to append to its holder
      $parent = this.$holder;
      $parent.empty();
    }

    $parent.append($node);
    // Triggers the Renderer plugins
    this.plugins._initNode(node);
    this.plugins._onNodeRendered($node);
  }

  /**
   * Builds a new HTMLElement from a Node
   * @param node Node to be drawn
   * @returns {*|jQuery|HTMLElement}
   * @private
   */
  _drawNode(node) {
    // Load the components of a Node
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

    // Link HTMLElement with its Node
    $node.data('node', node);

    return $node;
  }

  /**
   * Retrieves the HTMLElement corresponding to a Node
   * @param node Node to be found in the DOM
   * @returns {*|jQuery|HTMLElement}
   * @private
   */
  _elementFromNode(node) {
    return $(this.$holder.find('[node-id=' + node.id + ']').eq(0));
  }

  /**
   * Retrieves the Node corresponding to an HTMLElement
   * @param $node HTMLElement holding corresponding to the wanted Node
   * @returns {*|jQuery|HTMLElement}
   * @private
   */
  _nodeFromElement($node) {
    return $node.data('node');
  }
}

export default Renderer;