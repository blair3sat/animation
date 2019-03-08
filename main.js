import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import {
    Interaction
} from 'three.interaction';

import Earth from './earth.js';
import Cubesat from './cubesat.js';

let renderer, scene, camera, controls, interaction, clock, start = performance.now();
let earth, cubesat;
let container = document.getElementById('container');

const SPACE_COLOR = 0x0f0f0f;
const SUN_COLOR = 0xffffff;
const AMBIENT_COLOR = 0xffffff;

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(SPACE_COLOR, 1);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    interaction = new Interaction(renderer, scene, camera);
    // clock = new THREE.Clock();
    // clock.start()


    // let sun = new THREE.PointLight(SUN_COLOR, 1, 4000);
    // sun.position.set(50, 0, 0);
    // let lightAmbient = new THREE.AmbientLight(AMBIENT_COLOR);
    // scene.add(sun, lightAmbient);

    let starsGeometry = new THREE.Geometry();

    for (let i = 0; i < 10000; i++) {

        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(1500);
        star.y = THREE.Math.randFloatSpread(1500);
        star.z = THREE.Math.randFloatSpread(1500);

        starsGeometry.vertices.push(star);
    }

    let starsMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa
    });

    var starField = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(starField);
    earth = new Earth(scene, camera, renderer);
    cubesat = new Cubesat(scene, earth.earth);
    // camera.lookAt(e.earth.position)

    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);

    cubesat.update(performance.now() - start);

    renderer.render(scene, camera);
}

init()
animate();
window.addEventListener('resize', onWindowResize, false);