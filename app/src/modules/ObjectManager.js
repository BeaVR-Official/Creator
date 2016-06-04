import Scene from './Scene';

class ObjectManager {
  constructor() {

  }

  addObject(obj, scene) {
    scene.add(obj);
    Scene.render();
  }
  
  setPos(obj, pos) {
    obj.position.set(pos.x, pos.y, pos.z);
  }
  
  setRot(obj, rotation) {
    obj.rotation.set(rotation.x, rotation.y, rotation.z);
  }
  
  setScale(obj, scale) {
    obj.scale.set(scale.x, scale.y, scale.z);
  }
  
  updateMatrix(obj) {
    obj.updateMatrix();
  }
}

export default new ObjectManager();