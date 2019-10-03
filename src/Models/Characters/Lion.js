import {Terrains} from '../Properties.js';
import Pawn from "./Pawn.js";

export default class Lion extends Pawn{
    constructor(){
        // Lion
        // ---------------
        // HealthPoints 
        // Damage
        // StepCount
        // AllowedTerrains
        super(
            4,                                  // Health Points
            1,                                  // Damage
            2,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS] // Allowed Terrains
        );
    }
    show(){
        fill(0);
        stroke(255);
        circle(this.x*this.w,this.y*this.w,this.w-1);
    }
}