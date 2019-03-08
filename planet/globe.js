import createIcosphere from './icosphere.js';
import elevationData from '../data/data.js';

let elevation_buffer = Buffer.from(elevationData);

export default class Globe {
    constructor(config) {
        this.config = config;

        var header = new Int16Array(elevation_buffer.buffer, 0, 1);
        var recursion_level = config.recursion_level;

        var icosphere = createIcosphere(recursion_level);

        this.points = icosphere.points;
        this.triangles = icosphere.triangles;

        this.max_recursion_level = recursion_level;

        var elevation_ints = new Int16Array(elevation_buffer.buffer, 2, this.points.length);

        this.points.forEach((point, i) => {
            point.elevation = elevation_ints[i];
        });
    }

    // Regenerate faces based on the current recursion level
    generateTriangles() {
        var icosphere = createIcosphere(this.config.recursion_level);

        this.triangles = icosphere.triangles;
    }
}