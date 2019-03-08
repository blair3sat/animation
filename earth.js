// import * as THREE from 'three';
// import e from './data.js';

import planet from './planet/planet.js';

export default class Earth {
    constructor(scene, camera, renderer) {
        // this.planet = new THREE.SphereGeometry(10, 32, 32);
        // this.crust = new THREE.MeshBasicMaterial({
        //     color: 0xff0000,
        // });
        // this.earth = new THREE.Mesh(this.planet, this.crust);
        // scene.add(this.earth);
        // console.log(this)
        this.earth = planet(scene, camera, renderer)
    }
}