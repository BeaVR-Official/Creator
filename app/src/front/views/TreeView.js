/**
 * Created by giraud_d on 18/08/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';

class TreeViewView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.TreeView);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
    };
  }

  constructor() {
    super();
  }

  initialize() {
    this.render();
  }

  render() {
    this.$el.html(this.template);
    // this.$el.html(this.template({
    //   objectsCategories : this.objects.toJSON()
    // }));
    return this;
  }

}

export default TreeViewView;