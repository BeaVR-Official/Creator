import * as Scene from './Scene';

class PropPanelUI {
  constructor() {
    $('#propertiesPanel').resizable({
      minWidth: 200,
      maxWidth: $('#propertiesPanel').width()
    });

    $(".addItems").click(function () {
      $('.ui.labeled.icon.sidebar.left').sidebar('toggle');
      $(".pusher").css("height", "0px");
      Scene.default.render();
    });

    $(".addScript").click(function () {
      $('.ui.labeled.icon.sidebar.right').sidebar('toggle');
      $(".pusher").css("height", "0px");
      Scene.default.render();
    });

    $(".Transformation-properties .object-properties input[type=number]").change(function (event) {
      if (that.selectedObj === undefined)
        return;
      that.modifyObjectProperties(event);
    });

    let that = this;
    $(".Transformation-properties .object-properties input[type=number]").on("mousewheel", function (event) {
      if (that.selectedObj === undefined)
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
    if (this.selectedObj.material === undefined)
      this.selectedObj.color = newColor;
    else
      this.selectedObj.material.color = newColor;
    Scene.default.render();
  }

  setObjectVisibility(state) {
    this.selectedObj.visible = state;
    Scene.default.render();
  }

  modifyObjectProperties(event) {
    if (this.selectedObj === undefined)
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
        this.selectedObj.position.set(pos.x, pos.y, pos.z);
        break;
      case "rotation":
        let rotation = {
          x: Math.round(objProperties.eq(3).val()),
          y: Math.round(objProperties.eq(4).val()),
          z: Math.round(objProperties.eq(5).val())
        };
        this.selectedObj.rotation.set(rotation.x, rotation.y, rotation.z);
        break;
      case "scale":
        let scale = {
          x: objProperties.eq(6).val(),
          y: objProperties.eq(7).val(),
          z: objProperties.eq(8).val()
        };
        if (scale.x > 0 && scale.y > 0 && scale.z > 0)
          this.selectedObj.scale.set(scale.x, scale.y, scale.z);
        break;
      default:
        break;
    }
    Scene.default.updateTransformControls();
    Scene.default.render();
  }

  unselectObject() {
    this.selectedObj = undefined;
  }

  cleanPanel() {
    let objectInfo         = $(".object input");
    let transformationInfo = $(".Transformation-properties .object-properties input");
    let meshColorInfo      = $(".Mesh-properties .object-properties input[type=color]")[0];
    let meshVisibilityInfo = $(".Mesh-properties .object-properties input[type=checkbox]")[0];

    for (let i = 0; i !== 8; i++)
      transformationInfo.eq(i).val(0);
    objectInfo.eq(0).val("");
    objectInfo.eq(1).val("");

    meshColorInfo.value        = "#000000";
    meshVisibilityInfo.checked = false;
  }

  loadObjectInfo(object) {
    if (object !== undefined) {
      if (object.userData.objType === "picker")
        object = object.children[0];
      this.selectedObj = object;
    }
    this.update();
  }

  update() {
    this.updateMesh();
    this.updateObjectGeneral();
    this.updateTransformations();
  }

  updateObjectGeneral() {
    if (this.selectedObj.name !== undefined)
      $(".object input").first().val(this.selectedObj.name);
    if (this.selectedObj.userData.objType !== undefined)
      $(".object input").eq(1).val(this.selectedObj.userData.objType);
  }

  updateMesh() {
    let color;
    if (this.selectedObj.material === undefined)
      color = this.selectedObj.color;
    else
      color = this.selectedObj.material.color;
    if (color !== undefined)
      $(".Mesh-properties .object-properties input[type=color]")[0].value = "#" + color.getHexString();
    $(".Mesh-properties .object-properties input[type=checkbox]")[0].checked = this.selectedObj.visible;
  }

  updateTransformations() {
    if (this.selectedObj === undefined)
      return;

    let objProperties = $(".Transformation-properties .object-properties input");
    objProperties.eq(0).val(this.selectedObj.position.x);
    objProperties.eq(1).val(this.selectedObj.position.y);
    objProperties.eq(2).val(this.selectedObj.position.z);
    objProperties.eq(3).val(this.selectedObj.rotation.x);
    objProperties.eq(4).val(this.selectedObj.rotation.y);
    objProperties.eq(5).val(this.selectedObj.rotation.z);
    objProperties.eq(6).val(this.selectedObj.scale.x);
    objProperties.eq(7).val(this.selectedObj.scale.y);
    objProperties.eq(8).val(this.selectedObj.scale.z);
  }
}

export default new PropPanelUI();