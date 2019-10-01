import {Terrains} from './Properties.js';
export default class Position{
    constructor(x,y){
        this.x = x;
        this.y = y;
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