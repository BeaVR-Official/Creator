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

    $(".Transformation-properties .object-properties input[type=number]").change(function (event) {
      if (that.selectObject == undefined)
        return;
      that.modifyObjectProperties(event);
    });

    let that = this;
    $(".Transformation-properties .object-properties input[type=number]").on("mousewheel", function (event) {
      if (that.selectObject == undefined)
        return;
      that.modifyObjectProperties(event);
    });

    $(".Mesh-properties .object-properties input[type=color]").change(function() {
      that.changeObjectColor($(".Mesh-properties .object-properties input[type=color]")[0].value);
    });

    $(".Mesh-properties .object-properties input[type=checkbox]").change(() => {
      this.setObjectVisibility($(".Mesh-properties .object-properties input[type=checkbox]")[0].checked);
    });
  }

  changeObjectColor(color) {
    try {
      this.selectObject.material.color = new THREE.Color(color);
    }
    catch(err) {
      this.selectObject.color = new THREE.Color(color);
    }
    Scene.render();
  }

  setObjectVisibility(state) {
    this.selectObject.visible = state;
    Scene.render();
  }

  modifyObjectProperties(event) {
    var elem = $(event.target).closest(".object-properties").attr("data-type");
    if (this.selectObject == undefined)
      return;
    switch (elem) {
      case "location":
        this.selectObject.position.set(
          Math.round($(".Transformation-properties .object-properties input").eq(0).val()),
          Math.round($(".Transformation-properties .object-properties input").eq(1).val()),
          Math.round($(".Transformation-properties .object-properties input").eq(2).val())
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
    //this.selectObject.matrixAutoUpdate = false;
    this.selectObject.needsUpdate = true;
    this.selectObject.updateMatrix();
    //TODO update transformControl from SceneControls.js
    Scene.render();
  }

  unselectObject() {
    this.selectObject = undefined;
  }

  loadObjectInfo(object) {
    if (object == null && this.selectObject == undefined)
      return;
    if (object != null) {
      if (object.name == "lightPicker") {
        object = object.children[0];
      }
      this.selectObject = object;
    }

    this.updateObjectGeneral(this.selectObject);
    this.updateTransformations(this.selectObject);
    this.updateMesh(this.selectObject);
  }

  updateObjectGeneral(object) {
    $(".object input").first().val(object.name);
    if (object.objType == undefined)
      object.objType = object.type;
    $(".object input").eq(1).val(object.objType);
  }

  updateMesh(object) {
    try {    $(".Mesh-properties .object-properties input[type=color]")[0].value = "#" + object.material.color.getHexString();}
    catch (err){
      $(".Mesh-properties .object-properties input[type=color]")[0].value = "#" + object.color.getHexString();
    };
    $(".Mesh-properties .object-properties input[type=checkbox]")[0].checked = object.visible;
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