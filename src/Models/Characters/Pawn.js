import {Terrains} from '../Properties.js';

export default class Pawn{
    constructor(HealthPoints,Damage,StepCount,AllowedTerrains){
        this.Position = new Position(0,0);
        this.HealthPoints = HealthPoints;
        this.Damage = Damage;
        this.StepCount = StepCount;
        this.AllowedTerrains = AllowedTerrains;

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