import {Tree, Node} from './Tree';
import Render from './Render';

class SugarMaple {
  constructor(options) {
    let tree  = new Tree(options);
    let r = new Render(tree, '#sceneTree');

    let node1 = new Node("node1");
    let node2 = new Node("node2");
    let node3 = new Node("node3");
    let node4 = new Node("node4");
    let node5 = new Node("node5");
    let node6 = new Node("node6");
    let node7 = new Node("node7");

    tree.attachNode(tree._rootNode, node1);
    tree.attachNode(tree._rootNode, node2);
    tree.attachNode(node4, node7);
    tree.attachNode(node3, node4);
    tree.attachNode(node2, node3);
    tree.attachNode(node2, node5);
    //tree.attachNode(node4, node5);

    let expo = tree.exportTree();
    let impo = Tree.importTree(expo, options);

    //node1.disableCheckboxState();
    //console.log(typeof node1.disableCheckboxState);

    r.render();

    r._plugins.checkbox.check(node2);
    //r._plugins.checkbox.disable(node1);
  }
}

new SugarMaple({
  events:    {
    onImport: (node) => {
      return node;
    },
    onExport: (node) => {
      return node;
    },
    onRender: (node) => {
      return "node " + node._id;
    }
  },
  templates: {
    icons: {
      expand: "kk"
    }
  },
  plugins:   {
    drag:     {
      events:     {
        onReceive: (item, target) => {
          console.log(item);
        }
      },
      parameters: {
        delay: 0,
        axis:  'y'
      }
    },
    checkbox: {
      events:     {
        onCheck: (item) => {

        }
      },
      parameters: {
        defaultState: 'enabled',
        defaultValue: 'unchecked'
      }
    }
  }
});

