import {Terrains} from '../Properties.js';
import Pawn from "./Pawn.js";
import * as lib from "../../index";

export default class Monkey extends Pawn{
    constructor(x,y){
        // Monkey
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
        this.w = lib.TileLength;
        this.currentColor = [20, 204, 255];
    }
    changeColor(){
        if(!this.isActive)
            this.currentColor = [20, 102, 90];
        else
            this.currentColor = [20, 204, 255];
        this.show();
        this.isActive = !this.isActive;
    }
    show(){
        lib.P5.fill(this.currentColor);
    }
    
} 