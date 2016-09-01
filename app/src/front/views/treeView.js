/**
 * Created by giraud_d on 18/08/2016.
 */

import Loader from '../utils';
import SugarMaple from '../../modules/sugarmaple/SugarMaple';
import ScenePanel from '../../modules/creator/ScenesPanel';
import * as Backbone from 'backbone';

class TreeViewView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.TreeView);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  constructor() {
    super();
    $.widget("custom.sugarmaple", {
      _create: function () {
        new SugarMaple(this, this.options);
      }
    });

    this.sm = $('.properties-left-panel').sugarmaple({
      events:  {
        onImport: (node) => {
          return node;
        },
        onExport: (node) => {
          return node;
        }
      },
      plugins: {
        manage:    true,
        sortable:  true,
        checkable: true
      }
    });
  }

  initialize() {
    console.log(this.sm);
    ScenePanel.initTree(this.sm);
    this.render();
  }

  render() {
    this.$el.html(this.template);
  }
}

export default TreeViewView;