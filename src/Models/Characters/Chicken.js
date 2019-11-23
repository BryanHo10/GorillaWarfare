import {Terrains,Direction} from '../Properties.js';
import Pawn from "./Pawn.js";
import * as lib from "../../index";
import Board from "../Board";


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
            1,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS] // Allowed Terrains
        );
        this.currentColor = [255, 255, 128];
        this.isActive = false;
        this.sprite = lib.P5.loadImage("../src/Models/Characters/Sprites/Chicken.png");
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