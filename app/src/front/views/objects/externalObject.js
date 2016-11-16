/**
 * Created by giraud_d on 08/10/2016.
 */


import Loader from '../../utils';
import * as Backbone from 'backbone';
import Navigator from '../../../modules/creator/Navigator';

class ExternalObjectView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ExternalObject);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click #validate_externalObject': 'uploadExternalObject'
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

  uploadExternalObject() {
    let uploadInput = document.getElementById("upload_externalObject");
    let file = uploadInput.files[0];
    Navigator.addExternal(file);
  }
}

export default ExternalObjectView;