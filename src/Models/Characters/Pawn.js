import {Terrains,Direction,Players} from '../Properties.js';
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
        this.Owner = Players.ONE;
        this.isActive = false;
        this.currentColor = [255, 204, 0];

    }

    // function to output pawn info into infoBox
    showInfo(){
        lib.P5.createDiv("Owner: " + this.Owner + "\n"
                     + "Unit Type: " + typeof(this) + "\n"
                     + "HP: " + this.HealthPoints + "\n"
                     + "Damage: " + this.Damage + "\n"
                     + "Moves: " + this.StepCount + "\n");
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
    move(targetPos){
        this.Position = targetPos;
    }

    getTargets(boardGrid){
        let targetTiles = [];
        
        for(let dir of Object.values(Direction)){
            targetTiles = targetTiles.concat(this.getAvailableAttacks(dir));
        }
        let targets = [];
        targetTiles = targetTiles.filter(pos => pos.x >= 0 && pos.y >=0 && pos.x <12 && pos.y <12);
        for(let tile of targetTiles){
            let pawn = boardGrid[tile.x][tile.y].Occupant;
            if(pawn && !targets.includes(pawn) && pawn.Owner != this.Owner){
                targets.push(pawn);
            }
        }
        return targets;

    }

}