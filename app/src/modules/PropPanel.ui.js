/**
 * Created by urvoy_p on 04/05/16.
 */

import Scene from './Scene';
import SceneUI from './Scene.ui';

class PropPanelUI {
  constructor() {
    $('#propertiesPanel').resizable({
      minWidth: 200,
      maxWidth: $('#propertiesPanel').width()
    });

    $(".addItems").click(function () {
      $('.ui.labeled.icon.sidebar.left').sidebar('toggle');
      $(".pusher").css("height", "0px");
      Scene.render();
    });

    $(".addScript").click(function () {
      $('.ui.labeled.icon.sidebar.right').sidebar('toggle');
      $(".pusher").css("height", "0px");
      Scene.render();
    });

    $(".Transformation-properties .object-properties input[type=number]").change(function (event) {
      if (that.selectObject === undefined)
        return;
      that.modifyObjectProperties(event);
    });

    let that = this;
    $(".Transformation-properties .object-properties input[type=number]").on("mousewheel", function (event) {
      if (that.selectObject === undefined)
        return;
      that.modifyObjectProperties(event);
    });

    $(".Mesh-properties .object-properties input[type=color]").change(function () {
      that.changeObjectColor($(".Mesh-properties .object-properties input[type=color]")[0].value);
    });

    $(".Mesh-properties .object-properties input[type=checkbox]").change(() => {
      this.setObjectVisibility($(".Mesh-properties .object-properties input[type=checkbox]")[0].checked);
    });
  }

  changeObjectColor(color) {
    let newColor = new THREE.Color(color);
    this.selectObject.setColor(newColor);
    Scene.render();
  }

  setObjectVisibility(state) {
    this.selectObject.setVisibility(state);
    Scene.render();
  }

  modifyObjectProperties(event) {
    if (this.selectObject === undefined)
      return;
    let elem          = $(event.target).closest(".object-properties").attr("data-type");
    let objProperties = $(".Transformation-properties .object-properties input");
    switch (elem) {
      case "location":
        let pos = {
          x: Math.round(objProperties.eq(0).val()),
          y: Math.round(objProperties.eq(1).val()),
          z: Math.round(objProperties.eq(2).val())
        };
        this.selectObject.setPosition(pos);
        break;
      case "rotation":
        let rotation = {
          x: Math.round(objProperties.eq(3).val()),
          y: Math.round(objProperties.eq(4).val()),
          z: Math.round(objProperties.eq(5).val())
        };
        this.selectObject.setRotation(rotation);
        break;
      case "scale":
        let scale = {
          x: objProperties.eq(6).val(),
          y: objProperties.eq(7).val(),
          z: objProperties.eq(8).val()
        };
        this.selectObject.setScale(scale);
        break;
      default:
        break;
    }
    this.selectObject.needsUpdate = true;
    //SceneUI.transformControls.update();
    Scene.render();
  }

  unselectObject() {
    this.selectObject = undefined;
  }

  loadObjectInfo(object) {
    console.log(object);
    if (object !== undefined) {
      if (object.name === "lightPicker") {
        object = object.children[0];
      }
      this.selectObject = object;
    }
    this.update();
  }

  update() {
    this.updateMesh(this.selectObject.mesh);
    this.updateObjectGeneral(this.selectObject.mesh);
    this.updateTransformations();
  }

  updateObjectGeneral(object) {
    let selectedMesh = this.selectObject.mesh;
    $(".object input").first().val(selectedMesh.name);
    if (selectedMesh.objType === undefined)
      selectedMesh.objType = selectedMesh.type;
    $(".object input").eq(1).val(selectedMesh.objType);
  }

  updateMesh(object) {
    //console.log(object);
    //let material = object.material;

    try {
      $(".Mesh-properties .object-properties input[type=color]")[0].value = "#" + object.material.color.getHexString();
    }
    catch (e) {
      console.error("UpdateMesh: ", e);
    }
    ;
    $(".Mesh-properties .object-properties input[type=checkbox]")[0].checked = object.visible;
  }

  updateTransformations() {
    if (this.selectObject === undefined)
      return;

    let objProperties = $(".Transformation-properties .object-properties input");
    let selectedMesh  = this.selectObject.mesh;
    objProperties.eq(0).val(selectedMesh.position.x);
    objProperties.eq(1).val(selectedMesh.position.y);
    objProperties.eq(2).val(selectedMesh.position.z);
    objProperties.eq(3).val(selectedMesh.rotation.x);
    objProperties.eq(4).val(selectedMesh.rotation.y);
    objProperties.eq(5).val(selectedMesh.rotation.z);
    objProperties.eq(6).val(selectedMesh.scale.x);
    objProperties.eq(7).val(selectedMesh.scale.y);
    objProperties.eq(8).val(selectedMesh.scale.z);
  }
}

export default new PropPanelUI();