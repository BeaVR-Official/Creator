// /**
// * Created by kersal_e on 11/04/2016.
// */
//
//
// import ui from 'ui';
//
// class Creator {
//    constructor(width, height, ui) {
//        this.ui = ui;
//        this.renderer = new THREE.WebGLRenderer();
//        this.renderer.setSize(width, height);
//        this.renderer.setClearColor(0xdddddd, 1);
//        $(".SceneView").append(this.renderer.domElement);
//
//        this.dCamera = new THREE.PerspectiveCamera( 50, 1, 0.1, 10000 );
//        this.dCamera.name = 'Camera';
//        this.dCamera.position.set( 20, 10, 20 );
//        this.dCamera.lookAt( new THREE.Vector3() );
//        this.scene = new THREE.Scene();
//
//        this.camera = new THREE.PerspectiveCamera(
//            35,             // Field of view
//            800 / 600,      // Aspect ratio
//            0.1,            // Near plane
//            10000           // Far plane
//        );
//        this.camera.position.set(-15, 10, 10);
//        this.camera.lookAt(this.scene.position);
//        this.raycaster = new THREE.Raycaster();
//    }
//
//    addBox() {
//        var geometry = new THREE.BoxGeometry(5, 5, 5);
//        var material = new THREE.MeshLambertMaterial({color: 0xFF0000});
//        var mesh = new THREE.Mesh(geometry, material);
//        mesh.userData.id = _.uniqueId();
//        mesh.name= 'box_' + mesh.userData.id;
//        mesh.mirroredLoop = true;
//        mesh.castShadow = true;
//        mesh.receiveShadow = true;
//        mesh.objType = 'box';
//        this.scene.add(mesh);
//    }
//
//    addSphere() {
//        var geometry = new THREE.SphereGeometry( 5, 32, 32 );
//        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//        var sphere = new THREE.Mesh( geometry, material );
//        sphere.userData.id = _.uniqueId();
//        sphere.name= 'sphere_' + sphere.userData.id;
//        sphere.mirroredLoop = true;
//        sphere.castShadow = true;
//        sphere.receiveShadow = true;
//        sphere.objType = 'sphere';
//        scene.add( sphere );
//    }
//
//    addCylinder() {
//        var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
//        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//        var cylinder = new THREE.Mesh( geometry, material );
//        cylinder.userData.id = _.uniqueId();
//        cylinder.name= 'cylinder_' + cylinder.userData.id;
//        cylinder.mirroredLoop = true;
//        cylinder.castShadow = true;
//        cylinder.receiveShadow = true;
//        cylinder.objType = 'cylinder';
//        scene.add( cylinder );
//    }
//
//    addLight() {
//        var light = new THREE.PointLight(0xFFFF00);
//        light.position.set(10, 0, 10);
//        this.scene.add(light);
//    }
//
//    render() {
//        this.renderer.render(this.scene, this.camera);
//    }
//
//    select(mouse) {
//        if (mouse == undefined)
//            return;
//        if (this.selectObject != undefined)
//        {
//            this.raycaster.setFromCamera(mouse, this.camera);
//            this.selectObject.position.set(mouse.x * 10, mouse.y * 10, this.selectObject.position.z);
//            this.ui.pushDataInView(this.selectObject);
//            return;
//        }
//        this.raycaster.setFromCamera(mouse, this.camera);
//        var intersects = this.raycaster.intersectObjects( this.scene.children );
//        for ( var i = 0; i < intersects.length; i++ ) {
//            this.ui.pushDataInView(intersects[ i ].object);
//            this.selectObject = intersects[ i ].object;
//        }
//    }
//
//    resetGrap() {
//        this.selectObject = undefined;
//    }
//
//    getScene() {
//        return this.scene;
//    }
//
//    setRenderSize(width, height) {
//        this.camera.aspect = width / height;
//        this.camera.updateProjectionMatrix();
//        this.renderer.setSize(width, height);
//    }
// }
//
//
//
// var creator = new Creator($(window).width(), $(window).height(), ui);
// ui.setViewPort(creator);
// creator.addBox();
// creator.addLight();
// creator.render();
//
//
// window.scene = creator.getScene();
//
//
// $("body").bind("blur focus focusin focusout load resize scroll unload click" + " dblclick mousedown mouseup mousemove mouseover mouseout mouseenter " + "mouseleave change select submit keydown keypress keyup error", function (e) {
//    creator.render();
// });
//
// $(window).resize(function () {
//    creator.setRenderSize($(window).width(), $(window).height());
// });
//
// $(".menuRightMiddle").draggable({containment: '.SceneView'});
//
// $(".menuLeftMiddle").draggable({containment: '.SceneView'});
//
// /*
// var data = [
//    {
//        label: 'Main Camera',
//        children: [
//            { label: 'Sphere',
//            children : [
//                { label : 'DirectionalLight' },
//                { label : 'SpotLight'},
//                { label : 'Material'}
//            ]},
//            {
//                label: 'Cube',
//                children: [{
//                    label: 'material'
//                }]
//            }
//        ]
//    }
// ];
//
// $(function() {
//    $('#tree1').tree({
//        data: data,
//        dragAndDrop: true,
//        autoOpen: 0
//    });
// });
//
// */
