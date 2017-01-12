/**
 * Created by ekersale on 11/11/2016.
 */

import Backbone from 'backbone';

import MaterialDescriptor from '../../modules/common/MaterialDescriptor';
import GeometryDescriptor from '../../modules/common/GeometryDescriptor';

class Object3D extends Backbone.Model {
  get idAttribute() {
    return '_id';
  }

  get cidPrefix() {
    return '__c';
  }

  url() {
    return "";
  }

  defaults() {
    return {
      id:       -1,
      name:     "",
      type:     "",
      parent:   undefined,
      children: [],

      transformations: {
        translation: {x:0.0, y:0.0, z:0.0},
        rotation:    {x:0.0, y:0.0, z:0.0},
        scale:       {x:0.0, y:0.0, z:0.0}
      },

      isSolid:            false,
      isGravityEffected:  false,
      isVisibilty:        true,
      geometryDescriptor: new GeometryDescriptor("" + " geometry"),
      materialDescriptor: new MaterialDescriptor("" + " material")
    };
  }

  get(name) {
    return this.attributes[name];
  }
}

export default Object3D;