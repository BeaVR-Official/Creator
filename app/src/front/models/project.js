/**
 * Created by ekersale on 10/01/2017.
 */

import Backbone from 'backbone';
import Cookie from '../cookie';


class Project extends Backbone.Model {
  get idAttribute() {
    return '_id';
  }

  get cidPrefix() {
    return '__c';
  }

  url() {
    // Cookie.getCookieValue("store_id")
    Backbone.$.ajaxSetup({
      headers: { 'Authorization' :'Bearer ' + Cookie.getCookieValue('store_token') }
    });
    // Todo rajouter le projet id ds ce model
    return 'http://beavr.fr:3000/api/creator/' + '57a8daa6574b2905146bd4ef' + '/projects/' + this.attributes.projectID;
  }

  defaults() {
    return {
      name            : 'undefined',
      author          : -1,
      description     : 'undefined',
    };
  }

  get(name) {
    return this.attributes[name];
  }

  parse(response) {
    return response.data.project;
  }
}

export default Project;