/**
 * Created by giraud_d on 08/10/2016.
 */


import Loader from '../../utils';
import * as Backbone from 'backbone';
import Navigator from '../../../modules/creator/Navigator';

class CustomObjectView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.CustomObject);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click #validate_customObject': 'uploadCustomObject'
    };
  }

  constructor() {
    super();
  }

  initialize() {

  }

  render() {
    this.$el.html(this.template());
    return this;
  }

  uploadCustomObject() {
    let uploadInput = document.getElementById("upload_customObject");
    let file = uploadInput.files[0];
    Navigator.addExternal(file);
  }
}

export default CustomObjectView;