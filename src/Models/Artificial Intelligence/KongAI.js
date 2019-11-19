import Player from "../Player"
import clonedeep from "lodash.clonedeep";
import { Direction } from "../Properties";

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
        this.lookAheadDepth = 2;
        this.boardStatus = gameBoard;
        this.KingPawn = "Lion";


    } 
    updateBoard(gameBoard){
        this.boardStatus = gameBoard;

    }

    findOptimalState(){
        let searchSpace = this.GetActionStates();
        // Apply Score based on minimax 
        this.applyMiniMaxScore(searchSpace,true);
        
        let indexOfMax = 0;
        let currMax = searchSpace["score"];
        // Locate the Optimal Board State
        for(let i = 0; i < searchSpace.length; i++){
            if(searchSpace[i]["score"] > currMax){
                indexOfMax = i;
                currMax = searchSpace[i]["score"];
            }
        }
        delete searchSpace["children"][indexOfMax]["children"];
        console.log(searchSpace["children"],indexOfMax);
        return searchSpace["children"][indexOfMax]["board"];
        
    }
    applyMiniMaxScore(root,toMaximize){
        if(!root["children"])
            return;

        if(toMaximize){
            for(let state of root["children"]){
                this.applyMiniMaxScore(state,false);
                if(state["children"])
                    root["score"] = this.getMaxScore(state["children"]);
            }
                
        }
        else{
            for(let state of root["children"]){
                this.applyMiniMaxScore(state,true);
                if(state["children"])
                    root["score"] = this.getMinScore(state["children"]);
            }
        }
        return;
        
    }
    getMaxScore(childrenStates){

        let currMax = childrenStates[0]["score"];
        
        // Locate the Optimal Board State
        for(let i = 0; i < childrenStates.length; i++){
            if(childrenStates[i]["score"] > currMax){
                currMax = childrenStates[i]["score"];
            }
        }
        return currMax;
    }
    getMinScore(childrenStates){

        let currMin = childrenStates[0]["score"];
        
        // Locate the Optimal Board State
        for(let i = 0; i < childrenStates.length; i++){
            if(childrenStates[i]["score"] < currMin){
                currMin = childrenStates[i]["score"];
            }
        }
        return currMin;
    }
    GetActionStates(){
        let depth = 0;
        // Root Layer
        let boardStates=clonedeep(this.boardStatus);
        boardStates["children"]=[];

        // First Layer 
        for( let pawn of this.boardStatus.PlayerTwo.ActivePawns){
            boardStates["children"] = boardStates["children"].concat(this.getBoardStatePawnMove(pawn,this.boardStatus));
        } 

        let currentQueue = boardStates["children"];
        // Successive Layers
        while(depth+1 < this.lookAheadDepth){
            let nextQueue = [];

            for(let state of currentQueue){
                let childrenStates = [];
                for( let pawn of state["board"].PlayerTwo.ActivePawns){
                    childrenStates = childrenStates.concat(this.getBoardStatePawnMove(pawn,state["board"]));
                } 

                state["children"] = childrenStates;
                nextQueue = nextQueue.concat(childrenStates);
            }
            currentQueue = nextQueue;
            depth++;
        }
        return boardStates;
    }
    getBoardStatePawnMove(pawn,board){
        let newBoardPieceMoves=[]
        for(let pos of board.getAvailableMoves(pawn)){
            let stateSpaceOrigin = {};
            let movePieceBoard = clonedeep(board);
            let pawnClone = clonedeep(pawn);
            movePieceBoard.selectedPawn = pawnClone;
            movePieceBoard.selectedTile = movePieceBoard.grid[pawnClone.Position.x][pawnClone.Position.y];
            movePieceBoard.movePawn(movePieceBoard.grid[pos.x][pos.y]);

            let targets = movePieceBoard.selectedPawn.getTargets(movePieceBoard.grid);

            // Account for Attack Moves
            for(let enemy of targets){
                let stateSpace = {};
                let attackPieceBoard = clonedeep(movePieceBoard);

                attackPieceBoard.attackTargetPawn(enemy.Position.x,enemy.Position.y);

                stateSpace["board"] = attackPieceBoard;
                stateSpace["score"] = this.measureWeights(this.boardStatus.PlayerTwo,movePieceBoard.PlayerTwo);
                newBoardPieceMoves.push(stateSpace);
            }
            // Account for no-Attack Moves
            stateSpaceOrigin["board"] = movePieceBoard;
            stateSpaceOrigin["score"] = this.measureWeights(this.boardStatus.PlayerTwo,movePieceBoard.PlayerTwo);
            newBoardPieceMoves.push(stateSpaceOrigin);
            
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
            if(prevPlayerStatus.activePawn[i].pawnName == this.KingPawn){
                total += prevPlayerStatus.activePawn[i].HealthPoints - currPlayerStatus.activePawn[i].HealthPoints;
                break;
            }

        }
        return total * this.heuristicWeights["DmgKing"];
    }
    calculatePawnKillHeuristic(prevPlayerStatus,currPlayerStatus){

        let score = 0;
        Object.keys(currPlayerStatus.PawnStatus).map((pawnName)=>{
            if(pawnName != this.KingPawn){
                if(prevPlayerStatus[pawnName] > currPlayerStatus[pawnName]){
                    score++;
                }
            }
        });
        return score * this.heuristicWeights["PawnKill"];

    }
    calculateKingKillHeuristic(prevPlayerStatus,currPlayerStatus){
        let score = 0;

        if(prevPlayerStatus[this.KingPawn] > currPlayerStatus[this.KingPawn]){
            score++;
        }

        return score * this.heuristicWeights["KingKill"];
    }


    movePawn(targetPosition){

    }
    attackPawn(attackingPawn,targetPawn){
        
    }

}