import {Terrains,Direction} from '../Properties.js';
import Position from "../Position";
import Pawn from "./Pawn.js";
import * as lib from "../../index";

export default class Elephant extends Pawn{
    constructor(x,y){
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
        this.currentColor = [128, 64, 64];
        this.isActive = false;
        this.sprite = lib.P5.loadImage("../src/Models/Characters/Sprites/Elephant.png");
    }
    getAvailableAttacks(direction){

        let possibleAttackTargets = [];
        switch(direction){
            case Direction.NORTH:
                possibleAttackTargets.push(new Position(this.Position.x,this.Position.y-1));
                possibleAttackTargets.push(new Position(this.Position.x,this.Position.y-2));
                possibleAttackTargets.push(new Position(this.Position.x+1,this.Position.y-1));
                possibleAttackTargets.push(new Position(this.Position.x-1,this.Position.y-1));
                break;
            case Direction.SOUTH:
                possibleAttackTargets.push(new Position(this.Position.x,this.Position.y+1));
                possibleAttackTargets.push(new Position(this.Position.x,this.Position.y+2));
                possibleAttackTargets.push(new Position(this.Position.x+1,this.Position.y+1));
                possibleAttackTargets.push(new Position(this.Position.x-1,this.Position.y+1));
                break;
            case Direction.WEST:
                possibleAttackTargets.push(new Position(this.Position.x-1,this.Position.y));
                possibleAttackTargets.push(new Position(this.Position.x-2,this.Position.y));
                possibleAttackTargets.push(new Position(this.Position.x-1,this.Position.y-1));
                possibleAttackTargets.push(new Position(this.Position.x-1,this.Position.y+1));
                break;
            case Direction.EAST:
                possibleAttackTargets.push(new Position(this.Position.x+1,this.Position.y));
                possibleAttackTargets.push(new Position(this.Position.x+2,this.Position.y));
                possibleAttackTargets.push(new Position(this.Position.x+1,this.Position.y-1));
                possibleAttackTargets.push(new Position(this.Position.x+1,this.Position.y+1));
                break;
            default:
                break;
        }

        return possibleAttackTargets;
        
    }
    changeColor(){
        this.isActive = !this.isActive;

        if(!this.isActive)
            this.currentColor = [128, 64, 64];
        else
            this.currentColor = [86, 44, 44];
        this.show();
    }
    show(){
        lib.P5.fill(this.currentColor);
    }
}