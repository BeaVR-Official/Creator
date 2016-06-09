import {Tree, Node} from './Tree';
import Render from './Render';

class SugarMaple {
  constructor(parent, options) {
    let tree   = new Tree(options);
    let render = new Render(tree, parent);

    render.renderTree();

    $.extend(true, this, render.plugins);
  }
}

export default SugarMaple;
