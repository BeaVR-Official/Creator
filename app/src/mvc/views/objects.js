/**
 * Created by kersal_e on 03/08/2016.
 */

/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Object3D from '../models/objectModel';
import Objects from '../collections/objectCollection';

class ObjectCategoriesView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ObjectCategories);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click .tab' : 'loadTabulation'
    };
  }

  constructor() {
    super();
  }

  initialize() {
    var object = [];
    object.push(new Object3D({name: 'All objects', logo:'src/assets/images/windows.png'}));
    object.push(new Object3D({name: 'Basic objects', logo:'src/assets/images/multi-tab.png'}));
    object.push(new Object3D({name: 'Custom objects', logo:'src/assets/images/puzzle.png'}));
    object.push(new Object3D({name: 'My library', logo:'src/assets/images/painter-palette.png'}));
    object.push(new Object3D({name: 'Add folder', logo:'src/assets/images/add.png'}));
    this.objects = new Objects(object);
    this.render();
  }

  render() {
    this.$el.html(this.template({
      objectsCategories : this.objects.toJSON()
    }));
    return this;
  }

}

export default ObjectCategoriesView;