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
            // Minimize
            "PawnLost":-1,
            "PawnHurt":-1,
            "KingHurt":-1,
            "KingLost":-1
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
    calculateDmgDealtHeuristic(){

    }
    calculateDmgKingHeuristic(){
        
    }
    calculatePawnKillHeuristic(prevPlayerStatus,currPlayerStatus,activeAI){
        let opponent = this.boardStatus.PlayerTwo;
        if(activeAI){
            opponent = this.boardStatus.PlayerOne;
        }

        
        let score = 0;
        let pawnCount = Object.keys(opponent.PawnStatus).length;
        Object.keys(opponent.PawnStatus).map((pawnName)=>{
            if(pawnName != "Gorilla"){
                if(prevPlayerStatus[pawnName] > currPlayerStatus[pawnCount]){
                    score++;
                }
            }
        });
        return score * this.heuristicWeights["PawnKill"];

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