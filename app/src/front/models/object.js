/**
 * Created by ekersale on 11/11/2016.
 */

import Backbone from 'backbone';

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
                translation: [0,0,0],
                rotation: [0,0,0],
                scale: [0,0,0]
            }

        };
    }

    get(name) {
        return this.attributes[name];
    }
}

export default Object3D;