/**
 * Created by urvoy_p on 04/05/16.
 */

import Scene from './Scene';

class PropPanelUI {
  constructor() {
    $('#propertiesPanel').resizable({
      minWidth: 200,
      maxWidth: $('#propertiesPanel').width(),
    });

    $(".Transformation-properties .object-properties input").change(function(event) {
      if (that.selectObject == undefined)
        return;
      that.modifyObjectProperties(event);
    });

    let that = this;
    $(".Transformation-properties .object-properties input").on("mousewheel", function(event) {
      if (that.selectObject == undefined)
        return;
      that.modifyObjectProperties(event);
    });

  }

  modifyObjectProperties(event) {
    var elem = $(event.target).closest(".object-properties").attr("data-type");
    if (this.selectObject == undefined)
      return;
    switch (elem) {
      case "location":
        this.selectObject.position.set(
          $(".Transformation-properties .object-properties input").eq(0).val(),
          $(".Transformation-properties .object-properties input").eq(1).val(),
          $(".Transformation-properties .object-properties input").eq(2).val()
        );
        break;
      case "rotation":
        this.selectObject.rotation.set(
          $(".Transformation-properties .object-properties input").eq(3).val(),
          $(".Transformation-properties .object-properties input").eq(4).val(),
          $(".Transformation-properties .object-properties input").eq(5).val()
        );
        break;
      case "scale":
        this.selectObject.scale.set(
          $(".Transformation-properties .object-properties input").eq(6).val(),
          $(".Transformation-properties .object-properties input").eq(7).val(),
          $(".Transformation-properties .object-properties input").eq(8).val()
        )
        break;
      default:
        break;
    }
    this.selectObject.needsUpdate = true;
    this.selectObject.updateMatrix();
    Scene.render();
  }

  unselectObject () {
    this.selectObject = undefined;
  }

  loadObjectInfo(object) {
    if (object == null && this.selectObject == undefined)
      return;
    if (object != null)
      this.selectObject = object;
    this.updateObjectGeneral(this.selectObject);
      this.updateTransformations(this.selectObject);
  }

  updateObjectGeneral(object) {
    $(".object input").first().val(object.name);
    $(".object input").eq(1).val(object.objType);
  }

  updateTransformations(object) {
    if (object == null || object == undefined)
      return;

    $(".Transformation-properties .object-properties input").eq(0).val(object.position.x);
    $(".Transformation-properties .object-properties input").eq(1).val(object.position.y);
    $(".Transformation-properties .object-properties input").eq(2).val(object.position.z);
    $(".Transformation-properties .object-properties input").eq(3).val(object.rotation.x);
    $(".Transformation-properties .object-properties input").eq(4).val(object.rotation.y);
    $(".Transformation-properties .object-properties input").eq(5).val(object.rotation.z);

    $(".Transformation-properties .object-properties input").eq(6).val(object.scale.x);
    $(".Transformation-properties .object-properties input").eq(7).val(object.scale.y);
    $(".Transformation-properties .object-properties input").eq(8).val(object.scale.z);


  }
}

export default new PropPanelUI();