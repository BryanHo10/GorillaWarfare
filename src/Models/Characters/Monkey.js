import {Terrains,Direction} from '../Properties.js';
import Position from "../Position";
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
            x,
            y,
            4,                                  // Health Points
            1,                                  // Damage
            2,                                  // Step Count
            [Terrains.TREE,Terrains.GRASSLANDS] // Allowed Terrains
        );
        this.w = lib.TileLength;
        this.currentColor = [20, 204, 255];
        this.isActive = false;
    }
    getAvailableAttacks(direction){
        let xRange = 0;
        let yRange = 0;
        let incrementation = 0;
        let possibleAttackTargets = [];
        switch(direction){
            case Direction.NORTH:
                yRange = -4;
                incrementation = -1;
                break;
            case Direction.SOUTH:
                yRange = 4;
                incrementation = 1;
                break;
            case Direction.WEST:
                xRange = -4;
                incrementation = -1;
                break;
            case Direction.EAST:
                xRange = 4;
                incrementation = 1;
                break;
            default:
                break;
        }
        for(let x = this.Position.x;x!=this.Position.x+xRange;x+=incrementation){
            possibleAttackTargets.push(new Position(x,this.Position.y));
        }
        for(let y = this.Position.y;y!=this.Position.y+yRange;y+=incrementation){
            possibleAttackTargets.push(new Position(this.Position.x,y));
        }
        return possibleAttackTargets;
        
    }
    changeColor(){
        this.isActive = !this.isActive;

        if(!this.isActive)
            this.currentColor = [20, 102, 90];
        else
            this.currentColor = [20, 204, 255];
        this.show();
    }
    show(){
        lib.P5.fill(this.currentColor);
    }
    
} 