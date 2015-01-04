(function (document, window) {
  'use strict';

  // Moussaka Javascript Client Example
  // Manipulate a 3D scene

  var THREE = require('three.js');
  var MoussakaClient = require('moussaka-client-js.js');

  //
  // Game Code
  //

  var Simulator = function (opts) {

    // Set up client
    this.client = new MoussakaClient(opts);

    // Moussaka Variables
    this.rotateSpeed =
      this.client.registerVar(
        'Rotate Speed', 0.05, {
          min: 0,
          max: 0.25
        }
      );
    this.cubeShouldRotate =
      this.client.registerVar(
        'Cube Should Rotate', true
      );
    this.testText =
      this.client.registerVar(
        'Test Text', 'Change this test text'
      );
    this.cubeColor =
      this.client.registerVar(
        'Cube Color',
        new MoussakaClient.types.Color(0, 255, 0, 255), {
          lockedValues: {
            a: true
          }
        }
      );
    this.cubePosition = this.client.registerVar(
      'Cube Position', new MoussakaClient.types.Position(0, 0, 0), {
        lockedValues: {
          x: true,
          z: true
        }
      }
    );

    // Private Fields
    this.prevTestText = null;
    this.textMesh = null;
  };

  Simulator.prototype.generateText = function (text) {
    if (this.textMesh) {
      this.scene.remove(this.textMesh);
      this.textMesh = null;
    }

    var text3d = new THREE.TextGeometry(text, {
      size: 1,
      height: 1,
      curveSegments: 2,
      font: 'optimer',
      weight: 'normal'
    });

    text3d.computeBoundingBox();
    var centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox
      .min.x);

    var textMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        overdraw: 0.5
      });

    this.textMesh = new THREE.Mesh(text3d, textMaterial);

    this.textMesh.position.x = centerOffset;
    this.textMesh.position.y = -10;
    this.textMesh.position.z = -20;

    //this.textMesh.rotation.x = 0;
    //this.textMesh.rotation.y = Math.PI * 2;
    this.textMesh.rotation.z = Math.PI / 8;

    this.scene.add(this.textMesh);
  };

  Simulator.prototype.startGame = function () {
    // Taken directly from:
    // http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene

    var canvasEl = document.querySelector('div#renderer');

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75,
      canvasEl.offsetWidth / canvasEl.offsetWidth, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(canvasEl.offsetWidth, canvasEl.offsetWidth);
    canvasEl.appendChild(this.renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    // Initial Render
    this.render();
  };

  Simulator.prototype.render = function () {
    window.requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
    if (this.cubeShouldRotate.value === true) {
      this.cube.rotation.x += this.rotateSpeed.value;
      this.cube.rotation.y += this.rotateSpeed.value;
    }

    this.cube.position.x = this.cubePosition.value.x;
    this.cube.position.y = this.cubePosition.value.y;
    this.cube.position.z = this.cubePosition.value.z;

    var cubeColor = new THREE.Color(
      this.cubeColor.value.r / 255.0,
      this.cubeColor.value.g / 255.0,
      this.cubeColor.value.b / 255.0
    );

    this.cube.material.color = cubeColor;

    if (this.prevTestText !== this.testText.value) {
      this.generateText(this.testText.value);
      this.prevTestText = this.testText.value;
    }
  };


  var simulator = new Simulator({
    deviceName: 'Moussaka Client Example',
    apiKey: 'xxxx-xxxx-xxxx-xxxx-xxxx',
    projectId: 'xxxx-xxxx-xxxx-xxxx-xxxx',
    projectVersion: 'v1'
  });

  simulator.startGame();

  module.exports = simulator;

})(document, window);
