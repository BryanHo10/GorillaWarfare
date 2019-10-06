import {Terrains} from '../Properties.js';
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
    changeColor(){
        this.currentColor = [255, 204, 0];
        this.show();
    }
    move(){

    }


}