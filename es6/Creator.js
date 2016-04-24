/**
 * Created by urvoy_p on 24/04/16.
 */
class Creator {
    constructor(htmlNodeId) {
        this.renderer = new THREE.WebGLRenderer();
        this.parentNode = $(htmlNodeId);
    }

    display() {
        let parentWidth = this.parentNode.outerWidth();
        let parentHeight = this.parentNode.outerWidth();

        this.rootScene = new THREE.Scene();
        this.mainCamera = new THREE.PerspectiveCamera(
            45, //View Angle
            parentWidth / parentHeight, //Aspect
            0.1, //Near
            1 //Far
        );
        this.mainCamera.position.z = 300;
        this.rootScene.add(this.mainCamera);
        this.renderer.setSize(parentWidth, parentHeight);
        this.parentNode.append(this.renderer.domElement)
    }
}

export default Creator;