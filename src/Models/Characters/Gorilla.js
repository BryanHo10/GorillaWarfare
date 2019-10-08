import {Terrains} from '../Properties.js';
import Pawn from "./Pawn.js";
import * as lib from "../../index";

export default class Gorilla extends Pawn{
    constructor(x,y){
        // Gorilla
        // ---------------
        // HealthPoints 
        // Damage
        // StepCount
        // AllowedTerrains
        super(
            x,
            y,
            10,                                  // Health Points
            4,                                  // Damage
            3,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS] // Allowed Terrains
        );
        this.w = lib.TileLength;
        this.currentColor = [106, 106, 106];
    }
    changeColor(){
        this.isActive = !this.isActive;

        if(!this.isActive)
            this.currentColor = [106, 106, 106];
        else
            this.currentColor = [71, 71, 71];
        this.show();
    }
    show(){
        lib.P5.fill(this.currentColor);
    }
}