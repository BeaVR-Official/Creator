/**
 * Created by ekersale on 11/11/2016.
 */

import * as Backbone from 'backbone';

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
            id: -1,
            transformations : {
                translation: {x : 0, y : 0, z : 0},
                rotation: {x : 0, y : 0, z : 0},
                scale: {x : 0, y : 0, z : 0}
            }

        };
    }

    get(name) {
        return this.attributes[name];
    }
}

export default Object3D;