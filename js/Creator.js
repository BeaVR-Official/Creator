/**
 * Created by urvoy_p on 24/04/16.
 */

import Document from './helper/Document.js'

class Creator {
    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.rootScene = new THREE.Scene();
        this.mainCamera = new THREE.PerspectiveCamera(45, 0, 0.1, 10000);
        this.mainCamera.position.z = 300;
        this.rootScene.add(this.mainCamera);

        $(window).resize(this.adaptToWindow());
    }

    attachTo(htmlNodeId) {
        this.adaptToWindow();
        $(htmlNodeId).append(this.renderer.domElement);
    }

    adaptToWindow() {
        let parentWidth = $(window).width();
        let parentHeight = $(window).height();

        this.mainCamera.aspect = parentWidth / parentHeight;
        this.mainCamera.updateProjectionMatrix();
        this.renderer.setSize(parentWidth, parentHeight);
    }
}

let CreatorInstance = new Creator;
export default CreatorInstance;