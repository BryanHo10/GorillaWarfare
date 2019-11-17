import {Terrains,Direction} from '../Properties.js';
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
            2,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS] // Allowed Terrains
        );
        this.currentColor = [255, 128, 0];
        this.isActive = false;
        this.sprite = lib.P5.loadImage("../src/Models/Characters/Sprites/cheetah_temp.png");
        
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