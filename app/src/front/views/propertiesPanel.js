/**
 * Created by giraud_d on 18/08/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';

class PropertiesView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.PropertiesPanel);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'bind #propName' : 'actionChangeName'
    };
  }

  constructor(object) {
    //this.object = object;
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

  actionChangeName(e) {
    let val = $(e.currentTarget).val();
    this.object = val;
  }
}

export default PropertiesView;