import {Terrains,Direction} from '../Properties.js';
import Pawn from "./Pawn.js";
import * as lib from "../../index";

export default class Lion extends Pawn{
    constructor(x,y){
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
            1,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS] // Allowed Terrains
        );
        this.currentColor = [255, 128, 64];
        this.isActive = false;
        this.sprite = lib.P5.loadImage("../src/Models/Characters/Sprites/Lion.png");
    }
    changeColor(){
        this.isActive = !this.isActive;
        if(!this.isActive)
            this.currentColor = [255, 128, 64];
        else
            this.currentColor = [219, 71, 0];
        this.show();
        
    }
    show(){
        lib.P5.fill(this.currentColor);
    }
}