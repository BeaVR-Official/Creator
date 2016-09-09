/**
 * Created by giraud_d on 09/09/2016.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';
import Dropzone from "../../../../libs/dropzone/dropzone";

class CustomObjectsView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.CustomObject);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
    };
  }

  constructor() {
    super();
  }

  initialize() {
    this.render();
  }

  render() {
    $('.ui.modal').modal('show');
    this.$el.html(this.template);
    this.myAwesomeDropzone = new Dropzone("#my-awesome-dropzone", {
      init: function() {
        this.on("addedfile", function(file) {
          console.log("added file");
        });
        this.on("success", function(file) {
          console.log("successfully uploaded file");
        });
      }
    });
    return this;
  }
}

export default CustomObjectsView;