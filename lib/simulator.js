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

    this.client = new MoussakaClient(opts);
    this.rotateSpeed = this.client.registerVar('rotateSpeed', 0.05);

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
    this.cube.rotation.x += this.rotateSpeed.value;
    this.cube.rotation.y += this.rotateSpeed.value;
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
