import {Terrains} from '../Properties.js';
import Pawn from "./Pawn.js";
import * as lib from "../../index";

export default class Lion extends Pawn{
    constructor(){
        // Lion
        // ---------------
        // HealthPoints 
        // Damage
        // StepCount
        // AllowedTerrains
        super(
            x,
            y,
            8,                                  // Health Points
            3,                                  // Damage
            3,                                  // Step Count
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