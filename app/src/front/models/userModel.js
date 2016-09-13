/**
 * Created by kersal_e on 09/09/2016.
 */

import * as Backbone from 'backbone';

class User extends Backbone.Model {
  get idAttribute() {
    return '_id';
  }

  get cidPrefix() {
    return '__c';
  }

  url() {
    return "http://beavr.fr:3000/api/users/" + this.attributes.id;
  }

  defaults() {
    return {
      id: -1,
      logo: '',
      name: 'undefined'
    };
  }

  get(name) {
    return this.attributes[name];
  }
}

export default User;