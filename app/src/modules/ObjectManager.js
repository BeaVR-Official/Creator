export default class ObjectManager extends THREE.Object3D {
  constructor(mesh, scene) {
    super();
    this.mesh = mesh;

    scene.add(this.mesh);
  }

  setPosition(pos) {
    this.mesh.position.set(pos.x, pos.y, pos.z);
  }

  setRotation(rot) {
    this.mesh.rotation.set(rot.x, rot.y, rot.z);
  }

  setScale(scale) {
    this.mesh.scale.set(scale.x, scale.y, scale.z);
  }

  setColor(color) {
    this.mesh.material.color.set(color);
  }

  setVisibility(state) {
    this.mesh.visible = state;
  }
}