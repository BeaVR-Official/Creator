/**
 * Created by giraud_d on 18/08/2016.
 */

import Loader from '../utils';
import BlockModel from '../models/blockModel';
import Objects from '../collections/objectCollection';
import Scene from '../../modules/creator/Scene';
import CreatorManagement from '../../modules/creator/CreatorManagement';
import ActionBlockParamsView from './objects/actionBlockParams';

import * as Backbone from 'backbone';

class PropertiesView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.PropertiesPanel);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'change input':            'actionChanged',
      'click .actionblock':      'actionBlockClicked',
      'click #validate_texture': 'uploadTexture',
      'click .reactionblock':    'reactionBlockClicked'
    };
  }

  constructor() {
    super();
  }

  initialize() {
    var actions = [];
    actions.push(new BlockModel({type: 'import', name: "Import Block"}));
    this.actionBlocks = new Objects(actions);

    var reactions = [];
    reactions.push(new BlockModel({type: 'import', name: "Import Block"}));
    this.reactionBlocks = new Objects(reactions);

    CreatorManagement.on('selectedObject', object => {
      this.object = object;
      this.fillInfo();
    });

    CreatorManagement.on('deselectedObject', object => {
      this.resetInfo();
      this.object = object;
    });
  }

  render() {
    this.$el.html(this.template({
      actionBlocks:   this.actionBlocks.toJSON(),
      reactionBlocks: this.reactionBlocks.toJSON()
    }));
    return this;
  }

  actionBlockClicked(e) {
    if (this.actionBlocks !== undefined) {
      const elem  = $(e.currentTarget);
      const found = this.actionBlocks.where({name: elem.data('id')});

      found.forEach((clickedObject) => {
        if (clickedObject.get('type') === 'import') {
          this.actionBlocks.add(new BlockModel({name: "Test"}));
          this.render();
        } else {
          const v = new ActionBlockParamsView(clickedObject); // passer l'objet de la collection cliqué à la view
                                                              // d'édition
          v.render();
        }
      });
    }

  }

  reactionBlockClicked(e) {
    if (this.actionBlocks !== undefined) {
      const elem  = $(e.currentTarget);
      const found = this.reactionBlocks.where({name: elem.data('id')});

      found.forEach((clickedObject) => {
        if (clickedObject.get('type') === 'import') {
          this.actionBlocks.add(new BlockModel({name: "Test"}));
          this.render();
        } else {

        }
      });
    }

    this.render();
  }

  actionChanged(e) {
    if (this.object !== undefined) {
      let elem = $(e.currentTarget);
      switch (elem.attr('name')) {
        case "basicInfo[name]":
          this.object.name = elem.val();
          break;
        case "location[x]":
          this.object.position.x = elem.val();
          break;
        case "location[y]":
          this.object.position.y = elem.val();
          break;
        case "location[z]":
          this.object.position.z = elem.val();
          break;
        case "rotation[x]": {
          this.object.rotation.x = elem.val() * Math.PI / 180;
          break;
        }
        case "rotation[y]":
          this.object.rotation.y = elem.val() * Math.PI / 180;
          break;
        case "rotation[z]":
          this.object.rotation.z = elem.val() * Math.PI / 180;
          break;
        case "scale[x]":
          this.object.scale.x = elem.val();
          break;
        case "scale[y]":
          this.object.scale.y = elem.val();
          break;
        case "scale[z]":
          this.object.scale.z = elem.val();
          break;
        case "mesh[color]":
          let newColor = new THREE.Color(elem.val());
          if (this.object.material === undefined)
            this.object.color = newColor;
          else
            this.object.material.color = newColor;
          break;
        case "mesh[visible]":
          this.object.visible = elem.prop('checked');
          break;
        default:
          break;
      }
      Scene.updateTransformControls();
      //Scene.render();
    }
  }

  fillInfo() {
    if (this.object !== undefined) {
      this.setInfo("basicInfo[name]", this.object.name);
      this.setInfo("basicInfo[type]", this.object.userData.objType);

      this.setInfo("location[x]", this.object.position.x);
      this.setInfo("location[y]", this.object.position.y);
      this.setInfo("location[z]", this.object.position.z);

      this.setInfo("rotation[x]", this.object.rotation.x);
      this.setInfo("rotation[y]", this.object.rotation.y);
      this.setInfo("rotation[z]", this.object.rotation.z);

      this.setInfo("scale[x]", this.object.scale.x);
      this.setInfo("scale[y]", this.object.scale.y);
      this.setInfo("scale[z]", this.object.scale.z);

      let color;
      if (this.object.material === undefined)
        color = this.object.color;
      else
        color = this.object.material.color;
      if (color !== undefined)
        this.setInfo("mesh[color]", "#" + color.getHexString());

      this.setInfo("mesh[visible]", this.object.visible);
    }
  }

  resetInfo() {
    this.setInfo("basicInfo[name]", "");
    this.setInfo("basicInfo[type]", "");

    this.setInfo("location[x]", "");
    this.setInfo("location[y]", "");
    this.setInfo("location[z]", "");

    this.setInfo("rotation[x]", "");
    this.setInfo("rotation[y]", "");
    this.setInfo("rotation[z]", "");

    this.setInfo("scale[x]", "");
    this.setInfo("scale[y]", "");
    this.setInfo("scale[z]", "");

    this.setInfo("mesh[color]", "");

    this.setInfo("mesh[visible]", false);
  }

  setInfo(infoName, value) {
    let field = $("input[name=\'" + infoName + "\']");
    if (infoName.localeCompare("mesh[visible]") === 0)
      field.prop('checked', value);
    else
      field.val(value);
  }

  uploadTexture() {
    // TODO: /!\ gros bidouillage
    console.log("OBJECT", this.object);
    let uploadInput = document.getElementById("upload_texture");
    let file        = uploadInput.files[0];

    let reader    = new FileReader();
    reader.onload = function (e) {
      let thisImage = reader.result;
      sessionStorage.setItem(file.name, thisImage);
    };
    reader.readAsDataURL(uploadInput.files[0]);

    let mat = new THREE.MeshPhongMaterial();
    mat.map = new THREE.ImageUtils.loadTexture(
      sessionStorage.getItem(file.name));

    if (this.object instanceof THREE.Group) {
      this.object.children[0].material = mat;
    } else
      this.object.material = mat;

    console.log("typeof OBJECT", (typeof this.object));
  }

}

export default PropertiesView;