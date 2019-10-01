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
            HealthPoints = 4,
            Damage = 1,
            StepCount = 2,
            AllowedTerrains = [Terrains.TREE,Terrains.GRASSLANDS]
        );
        this.w = lib.TileLength;
        this.currentColor = [20, 204, 255];
    }
    changeColor(){
        this.currentColor = [20, 102, 90];
        this.show();
    }
    show(){
        lib.P5.fill(this.currentColor);
    }
    
} 