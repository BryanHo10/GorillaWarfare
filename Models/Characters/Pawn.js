import {Terrains,Movesets} from '../Properties.js';

class Pawn{
    constructor(HealthPoints,Damage,Moveset,AllowedTerrains){
        this.Position = new Position(0,0);
        this.HealthPoints = HealthPoints;
        this.Damage = Damage;
        this.Moveset = Moveset;
        this.AllowedTerrains = AllowedTerrains;

    }
    /**
     * Retrieves List of valid positions on turn
     * 
     * 
     * @return {Position[]} List of board positions
     */
    getAvailableMoves(){

    }
    /**
     * 
     * @param {Pawn} target 
     */
    attackPawn(target){

    }
    show(){

    }
    move(){

    }


}