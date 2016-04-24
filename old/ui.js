///**
// * Created by Vincent on 24/04/16.
// */
//
//class UI {
//    constructor() {
//        var that = this;
//        $('input').on('mousewheel', function(event) {
//            that.creator.render();
//        });
//        $('input').on('input', function() {
//            that.inputChange(this,that);
//        });
//        $('.AddBox').click(function() {
//            that.creator.addBox();
//            that.updateThree(that);
//        });
//        $('.AddSphere').click(function() {
//            that.creator.addSphere();
//            that.updateThree(that);
//        });
//        $('.AddSCylinder').click(function() {
//            that.creator.addCylinder();
//            that.updateThree(that);
//        });
//
//
//
//    }
//
//    updateThree() {
//        var scene = this.creator.getScene();
//        var data = [];
//        data.push({
//            'label' : "MainCamera",
//            'children': []
//        });
//        for (var i = 0; i < scene.children.length; ++i) {
//            data[0].children.push({
//                'label' : (scene.children[i].name != "") ? scene.children[i].name : scene.children[i].type
//            });
//        }
//        $('#tree1').tree('loadData', JSON.parse(JSON.stringify(data)));
//    }
//
//    setViewPort (creator) {
//        this.creator = creator;
//        var that = this;
//        $(".SceneView").mousedown(function () {
//            $(this).mousemove(function(e) {
//                that.onMouseClick(e, that);
//            });
//        }).mouseup(function () {
//            $(this).unbind('mousemove');
//            that.creator.resetGrap();
//        }).mouseout(function () {
//            $(this).unbind('mousemove');
//            that.creator.resetGrap();
//        });
//        var scene = this.creator.getScene();
//        var data = [];
//        data.push({
//            'label' : "MainCamera",
//            'children': []
//        });
//        for (var i = 0; i < scene.children.length; ++i) {
//            data[0].children.push({
//                'label' : (scene.children[i].name != "") ? scene.children[i].name : scene.children[i].type
//            });
//        }
//        $('#tree1').tree({
//            data: JSON.parse(JSON.stringify(data)),
//            dragAndDrop: true,
//            autoOpen: 0
//        });
//    }
//
//    inputChange(those, that) {
//        if (that.currentObject == undefined)
//            return;
//        var mod = $(those).attr('class');
//        if (mod == 'TransPosX' || mod == 'TransPosY' || mod == "TransPosZ") {
//            that.currentObject.position.set($('.TransPosX').val(), $('.TransPosY').val(), $('.TransPosZ').val());
//        }
//        if (mod == 'TransRotX' || mod == 'TransRotY' || mod == "TransRotZ") {
//            that.currentObject.rotation.set($('.TransRotX').val(), $('.TransRotY').val(), $('.TransRotZ').val());
//        }
//        if (mod == 'TransScaleX' || mod == 'TransScaleY' || mod == "TransScaleZ") {
//            that.currentObject.scale.set($('.TransScaleX').val(), $('.TransScaleY').val(), $('.TransScaleZ').val());
//        }
//        that.currentObject.needsUpdate = true;
//        that.currentObject.updateMatrix();
//    }
//
//    pushDataInView (object) {
//        this.currentObject = object;
//        $('.ObjSelectType').val(object.objType);
//        $(".objectName").val(object.name);
//        $(".TransPosX").val(object.position.x);
//        $(".TransPosY").val(object.position.y);
//        $(".TransPosZ").val(object.position.z);
//        $(".TransRotX").val(object.rotation.x);
//        $(".TransRotY").val(object.rotation.y);
//        $(".TransRotZ").val(object.rotation.z);
//        $(".TransScaleX").val(object.scale.x);
//        $(".TransScaleY").val(object.scale.y);
//        $(".TransScaleZ").val(object.scale.z);
//    }
//
//    onMouseClick( event, that ) {
//        var mouse = new THREE.Vector2();
//        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//        that.creator.select(mouse);
//    }
//}
//
//export default ui;
//
