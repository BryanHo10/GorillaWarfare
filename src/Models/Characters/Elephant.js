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
    getAvailableAttacks(direction){

        let possibleAttackTargets = [];
        switch(direction){
            case Direction.NORTH:
                possibleAttackTargets.push(new this.Position(this.Position.x,this.Position.y-1));
                possibleAttackTargets.push(new this.Position(this.Position.x,this.Position.y-2));
                possibleAttackTargets.push(new this.Position(this.Position.x+1,this.Position.y-1));
                possibleAttackTargets.push(new this.Position(this.Position.x-1,this.Position.y-1));
                break;
            case Direction.SOUTH:
                possibleAttackTargets.push(new this.Position(this.Position.x,this.Position.y+1));
                possibleAttackTargets.push(new this.Position(this.Position.x,this.Position.y+2));
                possibleAttackTargets.push(new this.Position(this.Position.x+1,this.Position.y+1));
                possibleAttackTargets.push(new this.Position(this.Position.x-1,this.Position.y+1));
                break;
            case Direction.WEST:
                possibleAttackTargets.push(new this.Position(this.Position.x-1,this.Position.y));
                possibleAttackTargets.push(new this.Position(this.Position.x-2,this.Position.y));
                possibleAttackTargets.push(new this.Position(this.Position.x-1,this.Position.y-1));
                possibleAttackTargets.push(new this.Position(this.Position.x-1,this.Position.y+1));
                break;
            case Direction.EAST:
                possibleAttackTargets.push(new this.Position(this.Position.x+1,this.Position.y));
                possibleAttackTargets.push(new this.Position(this.Position.x+2,this.Position.y));
                possibleAttackTargets.push(new this.Position(this.Position.x+1,this.Position.y-1));
                possibleAttackTargets.push(new this.Position(this.Position.x+1,this.Position.y+1));
                break;
            default:
                break;
        }

        return possibleAttackTargets;
        
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