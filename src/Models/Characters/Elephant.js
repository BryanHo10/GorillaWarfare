import {Terrains} from '../Properties.js';
import Pawn from "./Pawn.js";
import * as lib from "../../index";

export default class Elephant extends Pawn{
    constructor(){
        // Elephant
        // ---------------
        // HealthPoints 
        // Damage
        // StepCount
        // AllowedTerrains
        super(
            x,
            y,
            12,                                  // Health Points
            2,                                  // Damage
            1,                                  // Step Count
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