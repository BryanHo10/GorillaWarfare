import {Terrains,Direction} from '../Properties.js';
import Pawn from "./Pawn.js";
import * as lib from "../../index";

export default class Chicken extends Pawn{
    constructor(x,y){
        // Chicken
        // ---------------
        // HealthPoints 
        // Damage
        // StepCount
        // AllowedTerrains
        super(
            x,
            y,
            5,                                  // Health Points
            2,                                  // Damage
            2,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS] // Allowed Terrains
        );
        this.w = lib.TileLength;
        this.currentColor = [255, 255, 128];
        this.isActive = false;
    }
    changeColor(){
        this.isActive = !this.isActive;

        if(!this.isActive)
            this.currentColor = [255, 255, 128];
        else
            this.currentColor = [255, 255, 45];
        this.show();
    }
    show(){
        lib.P5.fill(this.currentColor);
    }
}