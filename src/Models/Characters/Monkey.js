import {Terrains} from '../Properties.js';
import Pawn from "./Pawn.js";

export default class Monkey extends Pawn{
    constructor(){
        // Monkey
        // ---------------
        // HealthPoints 
        // Damage
        // Moveset
        // AllowedTerrains
        super(4,1,2,[Terrains.TREE,Terrains.GRASSLANDS]);
    }
    show(){
        fill(0);
        stroke(255);
        circle(this.x*this.w,this.y*this.w,this.w-1);
    }
}