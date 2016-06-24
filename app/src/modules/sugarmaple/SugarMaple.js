import {Tree} from './Tree';
import Render from './Renderer';

class SugarMaple {
  constructor(widget, options) {
    const tree   = new Tree(options);
    const render = new Render(tree, widget);
    $.extend(true, this, render.plugins);
  }
}

export default SugarMaple;
