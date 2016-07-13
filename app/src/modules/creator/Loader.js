import Scene from './Scene';
import CreatorManagement from './CreatorManagement';

class Loader {
  constructor() {

  }

  loadFile(file) {
    let reader    = new FileReader();
    let extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'js') {
      reader.addEventListener('load', event => {
        let contents = event.target.result;
        let data     = JSON.parse(contents);
        this.handleJSON(data, file);
      }, false);
      reader.readAsText(file);
    }
  }

  handleJSON(data, file) {
    if (data.metadata.type === undefined) { // 3.0
      data.metadata.type = 'Geometry';
    }

    if (data.metadata.formatVersion !== undefined) {
      data.metadata.version = data.metadata.formatVersion;
    }

    if (data.metadata.type.toLowerCase() === 'geometry') {
      let loader   = new THREE.JSONLoader();
      let result   = loader.parse(data);
      let geometry = result.geometry;
      let material;

      if (result.materials !== undefined) {
        if (result.materials.length > 1) {
          material = new THREE.MultiMaterial(result.materials);
        } else {
          material = result.materials[0];
        }
      } else {
        material = new THREE.MeshStandardMaterial();
      }

      geometry.sourceType = "ascii";
      geometry.sourceFile = file.name;

      let mesh         = new THREE.Mesh(geometry, material);
      mesh.objType     = 'external';
      mesh.userData.id = _.uniqueId();
      mesh.name        = file.name.replace(/\.[^/.]+$/, "");
      mesh.name += '_' + mesh.userData.id;
      CreatorManagement.addObject(mesh);
      Scene.render();
    }
  }
}

export default new Loader();