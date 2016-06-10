import Options from './Options';

class Node {
  constructor(name, data) {
    this.id       = undefined;
    this.parent   = undefined;
    this.children = [];
    this.name     = name;
    this.data     = data;
  }
}

class Tree {
  constructor(options) {
    this.options       = new Options(options);
    this.rootNode      = undefined;
    this.currentNodeId = 0;
  }

  setRootNode(node) {
    this.attachNode(undefined, node);
    this.rootNode = node;
  }

  getRootNode() {
    return this.rootNode;
  }

  attachNode(parentNode, node) {
    this.detachNode(node); // detach if still has parent

    if (node.id === undefined)
      node.id = ++this.currentNodeId;

    if (parentNode !== undefined) {
      parentNode.children[node.id] = node;
      node.parent                  = parentNode;
    }
  }

  detachNode(node) {
    if (node.parent !== undefined) {
      const parentNode = node.parent;

      node.parent = undefined;
      parentNode.children.splice(node.id, 1);
    }
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
        if (typeof val === 'object' && val.hasOwnProperty('id')) {
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
        if (orphan.parent === parent.id) {
          orphan.parent = parent;
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
      if (key === 'options') return undefined;
      if (key === 'parent' && val !== undefined) return val.id;
      if (typeof val === 'object' && val.hasOwnProperty('id'))
        if (typeof this.options.events.onExport === 'function')
          return this.options.events.onExport(val);

      return val;
    });
  }
}

export {Tree, Node};