import Player from "../Player"

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
            "KingHurt":-1,
            "KingLost":-1
        }

    } 
    performAction(grid){
        


    }
    /**
     * Returns a heuristic value based on the weights multiplied by delta(P)
     * @function delta(P): The difference between current Player status and previous Player status  
     * @param {*} prevStatus 
     * @param {*} currStatus 
     */
    measureWeights(prevStatus,currStatus){

    }
    calculateDmgDealtHeuristic(){
        for(let i=0;i<)
    }
    movePawn(targetPosition){

    }
    attackPawn(attackingPawn,targetPawn){
        
    }

}