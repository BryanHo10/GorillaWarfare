import Player from "../Player"
import clonedeep from "lodash"

export default class KongAI extends Player{
    constructor(label,gameBoard){
        super(label);
        this.heuristicWeights={
            // Maximize
            "DmgDealt":1,
            "DmgKing":1,
            "PawnKill":1,
            "KingKill":1,
        }
        this.boardStatus = gameBoard;



    } 
    updateBoard(gameBoard){
        this.boardStatus = gameBoard;
    }

    performAction(board){
        
    }
    /**
     * Returns a heuristic value based on the weights multiplied by delta(P)
     * @function delta(P): The difference between current Player status and previous Player status  
     * @param {*} prevStatus 
     * @param {*} currStatus 
     */
    measureWeights(prevPlayerStatus,currPlayerStatus){
        
    }

    // Maximizing Function
    calculateDmgDealtHeuristic(prevPlayerStatus,currPlayerStatus){
        let total = 0;
        for(var i = 0; i < prevPlayerStatus.pawnCount; i++){
            
            total += prevPlayerStatus.activePawn[i].HealthPoints - currPlayerStatus.activePawn[i].HealthPoints;
        }
        return total * this.heuristicWeights["DmgDealt"];
    }
    calculateDmgKingHeuristic(prevPlayerStatus,currPlayerStatus){
        let total = 0;
        for(var i = 0; i < prevPlayerStatus.pawnCount; i++){
            if(prevPlayerStatus.activePawn[i].pawnName == "Lion"){
                total += prevPlayerStatus.activePawn[i].HealthPoints - currPlayerStatus.activePawn[i].HealthPoints;
                break;
            }

        }
        return total * this.heuristicWeights["DmgKing"];
    }
    calculatePawnKillHeuristic(prevPlayerStatus,currPlayerStatus){

        let score = 0;
        Object.keys(currPlayerStatus.PawnStatus).map((pawnName)=>{
            if(pawnName != "Lion"){
                if(prevPlayerStatus[pawnName] > currPlayerStatus[pawnName]){
                    score++;
                }
            }
        });
        return score * this.heuristicWeights["PawnKill"];

    }
    calculateKingKillHeuristic(prevPlayerStatus,currPlayerStatus){
        let score = 0;

        if(prevPlayerStatus["Lion"] > currPlayerStatus["Lion"]){
            score++;
        }

        return score * this.heuristicWeights["KingKill"];
    }


    movePawn(targetPosition){

    }
    attackPawn(attackingPawn,targetPawn){
        
    }

}