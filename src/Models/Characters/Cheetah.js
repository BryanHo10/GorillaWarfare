import {Terrains} from '../Properties.js';
import Pawn from "./Pawn.js";
import * as lib from "../../index";

export default class Cheetah extends Pawn{
    constructor(x,y){
        // Cheetah
        // ---------------
        // HealthPoints 
        // Damage
        // StepCount
        // AllowedTerrains
        super(
            x,
            y,
            6,                                  // Health Points
            2,                                  // Damage
            5,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS] // Allowed Terrains
        );
        this.w = lib.TileLength;
        this.currentColor = [255, 128, 0];
    }

    
    changeColor(){
        this.isActive = !this.isActive;

        if(!this.isActive)
            this.currentColor = [255, 128, 0];
        else
            this.currentColor = [162, 81, 0];
        this.show();
    }
    show(){
        lib.P5.fill(this.currentColor);
    }
}