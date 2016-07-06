import Scene from './Scene';

export default class CustomObject {
  constructor(mesh, type) {

    this.obj = mesh;
    this.objType     = type;

    this.obj.userData.id = _.uniqueId();
    this.name        = type + '_' + this.obj.userData.id;
    this._script     = 'script here';

  }

  // addToScene(scene) {
  //  this.dispatchEvent({type: 'add', message: this.name + ' Added!'});
  // }

  setPosition(pos) {
    this.obj.position.set(pos.x, pos.y, pos.z);
  }

  setRotation(rot) {
    this.obj.rotation.set(rot.x, rot.y, rot.z);
  }

  setScale(scale) {
    if (scale.x > 0 && scale.y > 0 && scale.z > 0)
      this.obj.scale.set(scale.x, scale.y, scale.z);
  }

  setColor(color) {
    this.obj.material.color.set(color);
  }

  setVisibility(state) {
    this.obj.visible = state;
  }

  updatePosition(pos) {
    this.obj.setPosition(pos);
    //Scene.render();
  }
  
  updateRotation(rot) {
    this.obj.setRotation(rot);
    //Scene.render();
  }
  
  updateScale(scale) {
    this.obj.setScale(scale);
    //Scene.render();
  }
  
  objToJSON() {

    // let output = this.geometry.toJSON();
    // try {
    //   output = JSON.stringify( output, null, '\t' );
    //   output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
    // } catch ( e ) {
    //   output = JSON.stringify( output );
    // }
    // localStorage['geo'] = output;

    return {
      object:       JSON.stringify(this),
      _script:      'typeofScript',
      AnotherParam: 'plop'
    };
  }

  static fromJSON(entry) {


    // let object = JSON.parse(entry.object).geometries[0];
    // let output;
    // try {
    //   output = JSON.stringify( object, null, '\t' );
    //   // transformation nécessaire pour l'uuid
    //   output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
    // } catch ( e ) {
    //   // TODO catch exception
    //   output = JSON.stringify( output );
    // }


    // Temporaire
    // Avec ça le customObject marche mais pas la geometry & le material
    let materialBidon = new THREE.MeshLambertMaterial({color: 0xFF0000});
    let geometryBidon = new THREE.BoxGeometry(200, 200, 200);

    let customObject = new this(
      geometryBidon,
      materialBidon,
      null,
      JSON.parse(entry.object).object
    );
    customObject._script = entry._script;
    customObject._anotherParam = entry._anotherParam;

    //test
    //let geometry = new THREE.Geometry(JSON.parse(entry.object).geometries[0]);
    //customObject.geometry = geometry;
    // ERR : [.CommandBufferContext.Offscreen-MainThread-03CC8358]RENDER WARNING: Render count or primcount is 0.
    // Rf (à peu près) : https://stackoverflow.com/questions/35288245/three-js-imported-obj-model-commandbuffercontextrender-warning-render-count


    return customObject;
  }
}