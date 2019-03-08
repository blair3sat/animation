import * as THREE from 'three';
import {
    Interaction
} from 'three.interaction';

export default class Cubesat {
    constructor(scene, earth) {
        this.earth = earth;
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.25, 0.25, 0.25),
            new THREE.MeshBasicMaterial({
                color: 0x888888
            }),
        );
        this.cube.cursor = 'pointer';
        this.cube.on('mouseover', () => {
            this.cube.material.color.setHex(0xffffff);
        });
        this.cube.on('mouseout', () => {
            this.cube.material.color.setHex(0x888888);
        });
        this.cube.position.y = 1.5;
        // let radius = 1.5,
        //     segments = 64,
        //     material = new THREE.LineBasicMaterial({
        //         color: 0xffffff
        //     }),
        //     geometry = new THREE.CircleGeometry(radius, segments);

        // // Remove center vertex
        // geometry.vertices.shift();

        // // Non closed circle with one open segment:
        // scene.add(new THREE.Line(geometry, material));

        // // To get a closed circle use LineLoop instead (see also @jackrugile his comment):
        // scene.add(new THREE.LineLoop(geometry, material));
        scene.add(this.cube);
        console.log(scene);
    }

    update(t) {
        this.cube.position.z = -Math.sin(t / 10000) * 1.5;
        this.cube.position.y = -Math.cos(t / 10000) * 1.5;
        this.cube.lookAt(this.earth.position);
    }
}