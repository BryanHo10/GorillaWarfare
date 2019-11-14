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
        console.log("AI Active");


    } 
    updateBoard(gameBoard){
        this.boardStatus = gameBoard;

    }

    performAction(){
        let depth = 0;
        // let queue=[];
        // while(depth < 3){
        for( let pawn of this.boardStatus.PlayerTwo.ActivePawns){
            console.log(this.getBoardStatePawnMove(pawn.Occupant,this.boardStatus));
        }
        // }
    }
    getBoardStatePawnMove(pawn,board){
        let newBoardPieceMoves=[]
        console.log(board.getAvailableMoves(pawn));
        for(let pos of board.getAvailableMoves(pawn)){
            let movePieceBoard = clonedeep(this.boardStatus);
            console.log(movePieceBoard);
            movePieceBoard.selectedPawn = pawn;
            movePieceBoard.selectedTile = movePieceBoard.grid[pawn.Position.x][pawn.Position.y];
            movePieceBoard.movePawn(movePieceBoard.grid[pos.x][pos.y]);
            newBoardPieceMoves.push(movePieceBoard);

        }
        return newBoardPieceMoves;
    }

    /**
     * Returns a heuristic value based on the weights multiplied by delta(P)
     * @function delta(P): The difference between current Player status and previous Player status  
     * @param {*} prevStatus 
     * @param {*} currStatus 
     */
    measureWeights(prevPlayerStatus,currPlayerStatus){
        return (
            this.calculateDmgDealtHeuristic(prevPlayerStatus,currPlayerStatus)+
            this.calculateDmgKingHeuristic(prevPlayerStatus,currPlayerStatus)+
            this.calculatePawnKillHeuristic(prevPlayerStatus,currPlayerStatus)+
            this.calculateKingKillHeuristic(prevPlayerStatus,currPlayerStatus)
        );
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