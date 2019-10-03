import {Terrains} from '../Properties.js';
import Pawn from "./Pawn.js";

export default class Gorilla extends Pawn{
    constructor(){
        // Gorilla
        // ---------------
        // HealthPoints 
        // Damage
        // StepCount
        // AllowedTerrains
        super(
            HealthPoints = 4,
            Damage = 1,
            StepCount = 2,
            AllowedTerrains = [Terrains.TREE,Terrains.GRASSLANDS]
        );
    }
    show(){
        fill(0);
        stroke(255);
        circle(this.x*this.w,this.y*this.w,this.w-1);
    }
}