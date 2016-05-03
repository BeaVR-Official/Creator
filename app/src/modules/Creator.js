//import * as THREE from "three";
/**
 * Created by urvoy_p on 24/04/16.
 */

debugger;

class Creator {
  constructor() {
    
    // set the scene size
    let WIDTH  = 400,
      HEIGHT = 300;

    // set some camera attributes
    let VIEW_ANGLE = 45,
      ASPECT     = WIDTH / HEIGHT,
      NEAR       = 0.1,
      FAR        = 10000;

    // get the DOM element to attach to
    // - assume we've got jQuery to hand
    var $container = $('#mainView');

    // create a WebGL renderer, camera
    // and a scene
    this._renderer = new THREE.WebGLRenderer();
    this._camera   = new THREE.PerspectiveCamera(VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);
    this._scene    = new THREE.Scene();

    // the camera starts at 0,0,0 so pull it back
    this._camera.position.z = 300;

    // start the renderer
    this._renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(this._renderer.domElement);
    
  }

  addCircle(x, y, z) {

    /*
     Copier/coller d'Elliot
     */
    let geometry = new THREE.SphereGeometry(x, y, z);
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let sphere = new THREE.Mesh( geometry, material );
    //sphere.userData.id = _.uniqueId();
    //sphere.name= 'sphere_' + sphere.userData.id;
    sphere.mirroredLoop = true;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.objType = 'sphere';
    this._scene.add( sphere );


    /*
     Ton ancienne version
     */
    /*
     // create the sphere's material
     let sphereMaterial = new THREE.MeshLambertMaterial(
     {
     color: 0xCC0000
     });

     // set up the sphere vars
     let radius = 50, segments = 16, rings = 16;

     // create a new mesh with sphere geometry -
     // we will cover the sphereMaterial next!
     let sphere = new THREE.Mesh(
     new THREE.SphereGeometry(radius, segments, rings),
     sphereMaterial);

     // add the sphere to the scene
     this._scene.add(sphere);

     // and the camera
     this._scene.add(this._camera);
     */

    // draw!
    this._renderer.render(this._scene, this._camera);
  }

  addLight() {
    // create a point light
    let pointLight = new THREE.PointLight(0xFFFFFF);
    // set its position
    /*
    Mettre la lumière à peu près au milieu :)
     */
    pointLight.position.x = 10;
    pointLight.position.y = 0;
    pointLight.position.z = 10;
    // add to the scene
    this._scene.add(pointLight);

    // draw!
    this._renderer.render(this._scene, this._camera);
  }

  get scene() { return this._scene; }
}

export default new Creator();