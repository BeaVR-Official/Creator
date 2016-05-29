import Options from './Options';

class Node {
  constructor(name) {
    this._name     = name;
    this._id       = undefined;
    this._parent   = undefined;
    this._children = [];
    this._data     = {};
  }
}

class Tree {
  constructor(options) {
    this._options       = new Options(options);
    this._rootNode      = new Node("rootNode");
    this._rootNode._id  = 0;
    this._currentNodeId = 0;
  }

  attachNode(parentNode, node) {
    node._id                       = ++this._currentNodeId;
    node._parent                   = parentNode;
    parentNode._children[node._id] = node;
  }

  detachNode(node) {
    if (node._parent !== 'undefined') {
      const parentNode = node._parent;
      parentNode._children.splice(node._id, 1);
    }
  }

  getNodeChild(node) {
    return node._children;
  }

  /**
   * Loads a new Tree from JSON and links the childs to their parents
   * Triggers an event before the load of a Node for modification
   * @param json
   * @param options
   */
  static importTree(json, options) {
    // Load the content from JSON
    let orphans        = [];
    let loadedTreeData = JSON.parse(json, (key, val) => {
      if (val !== null) {
        if (typeof val === 'object' && val.hasOwnProperty('_id')) {
          orphans.push(val);
          if (typeof options.events.onImport === 'function')
            return options.events.onImport(val);
        }

        return val;
      }
    });

    // Link child & parents
    for (let orphan of orphans)
      for (let parent of orphans)
        if (orphan._parent === parent._id) {
          orphan._parent = parent;
          break;
        }

    // put freshly extracted json into re-instantiated class
    let loadedTree = new Tree(options);
    Object.assign(loadedTree, loadedTreeData);

    return loadedTree;
  }

  /**
   * Transforms the current sugarmaple to JSON & replaces circular
   * references by ids for relinking on reload
   * Triggers an event before the saving of a Node for modification
   */
  exportTree() {
    return JSON.stringify(this, (key, val) => {
      if (val === null) return undefined;
      if (key === '_options') return undefined;
      if (key === '_parent' && val !== undefined) return val._id;
      if (typeof val === 'object' && val.hasOwnProperty('_id'))
        if (typeof this._options.events.onExport === 'function')
          return this._options.events.onExport(val);

      return val;
    });
  }
}

export {Tree, Node};