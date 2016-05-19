import {Tree, Node} from './Tree';

class SugarMaple {
  constructor(options) {
    let tree  = new Tree(options);
    let node1 = new Node();
    let node2 = new Node();
    let node3 = new Node();
    let node4 = new Node();
    let node5 = new Node();

    tree.addChild(tree._rootNode, node1);
    tree.addChild(tree._rootNode, node2);
    tree.addChild(node2, node3);
    tree.addChild(node2, node4);
    tree.addChild(node4, node5);

    this._tree = Tree.importTree(tree.exportTree(), options);
  }
}

new SugarMaple({
  events:    {
    onImport: (key, value) => {
      return value;
    },
    onExport: (key, value) => {
      return value;
    },
    onRender: (key, value) => {
      console.log('render ' + key);
    }
  },
  templates: {
    icons: {
      expand: "kk"
    }
  }
});