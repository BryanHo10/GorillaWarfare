import {Terrains,Direction} from '../Properties.js';
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
            2,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS],// Allowed Terrains
            5                                   // Weight
        );
        this.currentColor = [106, 106, 106];
        this.isActive = false;
        this.sprite = lib.P5.loadImage("../src/Models/Characters/Sprites/Gorilla.png");
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