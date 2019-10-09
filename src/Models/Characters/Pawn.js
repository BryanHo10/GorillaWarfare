import {Terrains,Direction} from '../Properties.js';
import Position from '../Position';
import * as lib from '../../index';

export default class Pawn{
    constructor(x,y,HealthPoints,Damage,StepCount,AllowedTerrains){
        this.Position = new Position(x,y);
        this.HealthPoints = HealthPoints;
        this.Damage = Damage;
        this.StepCount = StepCount;
        this.AllowedTerrains = AllowedTerrains;
        this.w = lib.TileLength;
        this.isActive = false;
        this.currentColor = [255, 204, 0];

    }
    /**
     * Target's HealthPoints decrement by Damage of current object
     * @param {Pawn} target 
     */
    attackPawn(target){
        target.HealthPoints-=this.Damage;
    }
    /**
     * Default display of pawn
     */
    show(){

    }
    getAvailableAttacks(direction){

        let possibleAttackTargets = [];
        switch(direction){
            case Direction.NORTH:
                possibleAttackTargets.push(new Position(this.Position.x,this.Position.y-1));
                break;
            case Direction.SOUTH:
                possibleAttackTargets.push(new Position(this.Position.x,this.Position.y+1));
                break;
            case Direction.WEST:
                possibleAttackTargets.push(new Position(this.Position.x-1,this.Position.y));
                break;
            case Direction.EAST:
                possibleAttackTargets.push(new Position(this.Position.x+1,this.Position.y));
                break;
            default:
                break;
        }

        return possibleAttackTargets;
        
    }
    changeColor(){
        this.currentColor = [255, 204, 0];
        this.show();
    }
    move(){

    }


}