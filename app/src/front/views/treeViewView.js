/**
 * Created by giraud_d on 18/08/2016.
 */

import Loader from '../utils';
import SugarMaple from '../../modules/sugarmaple/SugarMaple';
import * as ScenePanel from '../../modules/creator/ScenesPanel';
import * as Backbone from 'backbone';

class TreeViewView extends Backbone.View {

  get template() {
    //return _.template(Loader.templates.TreeView);
  }

  get $el() {
    return $('.treeview-left-panel');
  }

  constructor() {
    super();
  }



  render() {
    this.$el.html(this.template);
  }
}

export default TreeViewView;