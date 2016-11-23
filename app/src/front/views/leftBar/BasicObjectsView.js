/**
 * Created by giraud_d on 17/08/2016.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../../node_modules/underscore';

import Item from '../../models/ItemMenu';
import ItemMenuCollection from '../../collections/ItemMenuCollection';

import EventManager from '../../../modules/common/EventManager';

require('../../../../assets/styles/BasicObject.scss');

class BasicObjectsView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.BasicObject);
  }

  get events() {
    return {
      'click .basicObjectElem' : 'loadBasicObjects'
    };
  }

  get $el() {
    return $('.ContainerBasicObject');
  }

  constructor() {
    super();
  }

  initialize() { // en dur pour le moment

    let objectByCategorie = [];

    objectByCategorie.push(new Item({id: 1, name: "Cube"}));
    objectByCategorie.push(new Item({id: 2, name: "Cylinder"}));
    objectByCategorie.push(new Item({id: 3, name: "Sphere"}));
    this.object = new ItemMenuCollection(objectByCategorie);
  }

  render() {
    this.$el.html(this.template({
      object: this.object.toJSON()
    }));
    return this;
  }

  loadBasicObjects(e) {
    let selectedElem = $(e.target).closest('.basicObjectElem');
    let data;
    switch (selectedElem.data("id")) {
      case "Cube":
        data = {
          objectName: 'box',
          objectType: 'box'
        };
        EventManager.emitEvent('addObject', data);
        break;
      case "Cylinder":
        data = {
          objectName: 'cylinder',
          objectType: 'cylinder'
        };
        EventManager.emitEvent('addObject', data);
        break;
      case "Sphere":
        data = {
          objectName: 'sphere',
          objectType: 'sphere'
        };
        EventManager.emitEvent('addObject', data);
        break;
    }
  }

}

export default BasicObjectsView;