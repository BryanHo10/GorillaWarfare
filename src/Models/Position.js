import {Terrains} from './Properties.js';
export default class Position{
    constructor(x,y){
        this.x = 0;
        this.y = 0;
        this.Terrain = Terrains.GRASSLANDS;
    }
    /**
     * Sets position's terrain property to value
     * @param {Terrains} input 
     */
    setTerrain(input){
        this.Terrain = Terrains.GRASSLANDS;
    }
}