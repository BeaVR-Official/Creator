/**
 * Created by vincent on 16/10/16.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';
import Navigator from '../../../modules/creator/Navigator';

class WorldCustomization extends Backbone.View {

  get template() {
    return _.template(Loader.templates.WorldCustomization);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'change #selectSky':    'selectSky',
      'change #selectGround': 'selectGround',
      'click #addGround':     'addGround',
      'click #addSky':        'addSky'
    };
  }

  constructor() {
    super();
  }

  initialize() {
    let skyBoxList = [];
    skyBoxList.push();
  }

  render() {
    this.$el.html(this.template());
    return this;
  }

  selectSky(event) {
    let skyFolder = event.target.value;
    this.skyFolderPath = 'assets/images/skyBox/' + 'sky_' + skyFolder + '/';
    console.log(this.skyFolderPath);
  }

  selectGround(event) {
    let groundTex = event.target.value;
    this.groundTexPath = 'assets/images/groundTex/' + 'ground_' + groundTex + '.png';
    console.log(this.groundTexPath);
  }

  addSky() {
    if (this.skyFolderPath !== undefined)
      Navigator.addSky(this.skyFolderPath);
    else
      Navigator.addSky('assets/images/skyBox/sky_1/');
  }

  addGround() {
    if (this.groundTexPath !== undefined)
      Navigator.addGround(this.groundTexPath);
    else
      Navigator.addGround('assets/images/groundTex/ground_1.png');
  }
}

export default WorldCustomization;