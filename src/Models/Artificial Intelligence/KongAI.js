import Player from "../Player"
import clonedeep from "lodash"

export default class KongAI extends Player{
    constructor(label){
        super(label);
        this.heuristicWeights={
            // Maximize
            "DmgDealt":1,
            "DmgKing":1,
            "PawnKill":1,
            "KingKill":1,
            // Minimize
            "PawnLost":-1,
            "PawnHurt":-1,
            "KingHurt":-1,
            "KingLost":-1
        }

    } 
    performAction(board){
        
    }
    /**
     * Returns a heuristic value based on the weights multiplied by delta(P)
     * @function delta(P): The difference between current Player status and previous Player status  
     * @param {*} prevStatus 
     * @param {*} currStatus 
     */
    measureWeights(prevStatus,currStatus){
        
    }

    // Maximizing Function
    calculateDmgDealtHeuristic(){

    }
    calculateDmgKingHeuristic(){
        
    }
    calculatePawnKillHeuristic(){
        
    }
    calculateKingKillHeuristic(){
        
    }

    // Minimizing Function
    calculatePawnLostHeuristic(){

    }
    calculatePawnHurtHeuristic(){
        
    }
    calculateKingLostHeuristic(){

    }
    calculateKingHurtHeuristic(){
        
    }

    movePawn(targetPosition){

    }
    attackPawn(attackingPawn,targetPawn){
        
    }

}