import Options from './Options';

class Node {
  constructor() {
    this._id       = null;
    this._parent   = null;
    this._children = [];
    this._data     = {};
  }
}

class Tree {
  constructor(options = new Options()) {
    this._options       = options;
    this._rootNode      = new Node();
    this._rootNode._id  = 0;
    this._currentNodeId = 0;
  }

  addChild(parentNode, node) {
    node._id                       = ++this._currentNodeId;
    node._parent                   = parentNode;
    parentNode._children[node._id] = node;
  }

  getChildren(parentNode) {
    return parentNode._children;
  }

  removeChild(node) {
    if (node._parent !== 'undefined') {
      const parentNode = node._parent;
      delete parentNode._children[node._id];
    }
  }

  /**
   * Loads a new Tree from JSON and links the childs to their parents
   * Triggers an event before the load of a Node for modification
   * @param json
   * @param options
   */
  static importTree(json, options = new Options()) {
    // Load the content from JSON
    let orphans    = [];
    let loadedTree = JSON.parse(json, (key, val) => {
      if (val !== null) {
        if (typeof val === 'object' && val.hasOwnProperty('_id')) {
          orphans.push(val);
          if (typeof options.events.onImport === 'function')
            return options.events.onImport(key, val);
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

    // Say that the rootNode has no parent
    loadedTree._rootNode._parent = null;
    loadedTree._options          = options;

    return loadedTree;
  }

  /**
   * Transforms the current sugarmaple to JSON & replaces circular
   * references by ids for relinking on reload
   * Triggers an event before the saving of a Node for modification
   */
  exportTree() {
    const $this = this;

    return JSON.stringify(this, (key, val) => {
      if (val === null) return null;
      if (key === '_options') return null;
      if (key === '_parent' && val !== null) return val._id;
      if (typeof val === 'object' && val.hasOwnProperty('_id'))
        if (typeof $this._options.events.onExport === 'function')
          return $this._options.events.onExport(key, val);

      return val;
    });
  }

  getRootNode() {
    return this._rootNode;
  }
}

export {Tree, Node};