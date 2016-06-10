import {Tree} from './Tree';
import Render from './Renderer';

class SugarMaple {
  constructor(holder, options) {
    const tree    = new Tree(options);
    const render  = new Render(tree, holder);

    render.renderSubtree(tree);

    $.extend(true, this, render.plugins);
  }
}

export default SugarMaple;
