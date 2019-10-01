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

    }
    /**
     * Retrieves List of valid positions on turn
     * @return {Position[]} List of board positions
     */
    getAvailableMoves(){

    }
    /**
     * Target's HealthPoints decrement by Damage of current object
     * @param {Pawn} target 
     */
    attackPawn(target){

    }
    /**
     * Default display of pawn
     */
    show(){

    }
    move(){

    }


}