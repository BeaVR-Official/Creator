/**
 * Created by ekersale on 08/11/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import Object3D from '../models/object';

import EventManager from '../../modules/common/EventManager';
import GraphicalManager from '../../modules/common/GraphicalManager';

require('../../../assets/styles/SettingsBox.scss');

class SettingsBoxView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.SettingsBox);
  }

  get $el() {
    return $('.SettingsBoxSelector');
  }

  get events() {
    return {
      'click .openSettings':               'OpenCloseBox',
      'keyup .transformations input':      'changed',
      'change .transformations input':     'changed',
      'mousewheel .transformations input': 'inputWheel',
      'change #sliderOpacity':             'propertyChanged',
      'mousemove #sliderOpacity':          'propertyChanged',
      ///Events drag
      'dragstart .dropMaterial img':       'dragEvent',
      'dragstart .dropTexture img':        'dragEvent',
      'drop .dropMaterial':                'dropMaterial',
      'dragover .dropMaterial':            function (ev) {
        ev.preventDefault();
      },
      'drop .dropTexture':                 'dropTexture',
      'dragover .dropTexture':             function (ev) {
        ev.preventDefault();
      },
    };
  }

  constructor() {
    super();
    this.model = new Object3D();
    this.listenTo(this.model, 'all', this.render);
    _.bindAll(this, 'changed');
    this.render();
    this.count = 0;
    this.eventListener();
  }

  eventListener() {
    var that = this;
    EventManager.on('getObjectSelected', (objectDescriptor) => {
      that.model.attributes = objectDescriptor.attributes;
      console.log("Object model selected!! ", that.model.attributes.transformations);
      that.render();
    });
  }

  dragEvent(ev) {
    ev.originalEvent.dataTransfer.setData("text", $(ev.target).attr('src'));
  }

  dropMaterial(ev) {
    ev.preventDefault();
    var data = ev.originalEvent.dataTransfer.getData("text");
    if ($(ev.target).localName != "img")
      $(ev.target).closest('img').attr('src', data);
    else {
      $(ev.target).attr('src', data);
    }
  }

  dropTexture(ev) {
    ev.preventDefault();
    var data = ev.originalEvent.dataTransfer.getData("text");
    if ($(ev.target).localName != "img")
      $(ev.target).closest('img').attr('src', data);
    else {
      $(ev.target).attr('src', data);
    }
  }

  propertyChanged(ev) {
    if (this.count == 4) {
      var val = $('#color').css('background-color');
      if (val.indexOf('rgba') >= 0) {
        var a = val.slice(4).split(',');
        console.log(a[0]);
        val = 'rgba' + a[0] + ',' + parseInt(a[1]) + ',' + parseInt(a[2]) + ',' + parseFloat(((ev.target.value > 0) ? (ev.target.value / 100).toString() : (0).toString())) + ')';
      }
      else
        val = val.replace(')', ", " + ((ev.target.value > 0) ? (ev.target.value / 100).toString() : (0).toString()) + ")")
                 .replace('rgb', 'rgba');
      console.log(val);
      $('#color').css('background-color', val);
      this.count = 0;
    }
    else
      this.count++;
  }

  changed(event) {
    var string                                       = event.target.attributes['data-name'].value;
    var elem                                         = string.split('.');
    this.model.attributes[elem[0]][elem[1]][elem[2]] = parseInt($(event.target).val());

    GraphicalManager.render();
  }

  inputWheel(event, delta) {
    var string = event.target.attributes['data-name'].value;
    var elem   = string.split('.');

    if (delta > 0) {
      console.log(this.model.attributes[elem[0]][elem[1]][elem[2]]);
      this.model.attributes[elem[0]][elem[1]][elem[2]] = parseInt($(event.target).val()) + 1;
    } else {
      console.log(this.model.attributes[elem[0]][elem[1]][elem[2]]);
      this.model.attributes[elem[0]][elem[1]][elem[2]] = parseInt($(event.target).val()) - 1;
    }
    console.log(this.model);
  }

  render() {
    var that = this;
    if (that.model.attributes !== undefined) {
      this.$el.html(this.template({transformations: that.model.attributes.transformations}));
    }
    return this;
  }

  isToolBoxOpen() {
    return ($(".Box").css("visibility") == 'visible') ? true : false;
  }

  CloseBox() {
    $(".openSettings i").addClass("fa-spin");
    $(".Box").fadeOut(800, function () {
      $(".Box").css('visibility', 'hidden');
      $(".openSettings i").removeClass("fa-spin");
    });
  }

  OpenBox() {
    $(".openSettings i").addClass("fa-spin");
    $(".Box").css('visibility', 'visible');
    $(".Box").fadeIn(800, function () {
      $(".openSettings i").removeClass("fa-spin");
    });
  }

  OpenCloseBox() {
    if (this.isToolBoxOpen())
      this.CloseBox();
    else
      this.OpenBox();
    console.log(this.model)
  }
}

export default SettingsBoxView;