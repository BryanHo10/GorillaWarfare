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
    identifyDifference(prevStatus,currStatus){
        for(let i=0;i<prevStatus.length;i++){
            if(prevStatus[i].Position.x != currStatus[i].Position.x && 
                prevStatus[i].Position.y != currStatus[i].Position.y){
                    console.log(prevStatus[i].Position,currStatus[i].Position);
                    return true;
                }
        }
    }
    findOptimalState(){
        let searchSpace = this.GetActionStates();
        // Apply Score based on minimax 
        this.applyMiniMaxScore(searchSpace,true);
        
        let indicesOfMax = [];
        let currMax = searchSpace["score"];
        // Locate the Optimal Board State
        searchSpace = searchSpace["children"];
        for(let i = 0; i < searchSpace.length; i++){
            if(searchSpace[i]["score"] == currMax){
                indicesOfMax.push(i);
            }else if(searchSpace[i]["score"] > currMax){
                indicesOfMax = [];
                indicesOfMax.push(i);
                currMax = searchSpace[i]["score"];
            }
            if (this.identifyDifference(this.boardStatus.PlayerTwo.ActivePawns,searchSpace[i]["board"].PlayerTwo.ActivePawns)){
                return searchSpace[i]["board"];
            }
        }
        // this.identifyDifference(this.boardStatus.PlayerTwo.ActivePawns,searchSpace[indicesOfMax[Math.floor(Math.random()*(indicesOfMax.length-1))]]["board"].PlayerTwo.ActivePawns);
        return searchSpace[indicesOfMax[Math.floor(Math.random()*(indicesOfMax.length-1))]]["board"];
        
    }
    applyMiniMaxScore(root,toMaximize){
        if(!root["children"])
            return;

        if(toMaximize){
            for(let state of root["children"]){
                this.applyMiniMaxScore(state,false);
                // this.identifyDifference(this.boardStatus.PlayerTwo.ActivePawns,state["board"].PlayerTwo.ActivePawns);
                if(state["children"])
                    root["score"] = this.getMaxScore(state["children"]);
            }
                
        }
        else{
            for(let state of root["children"]){
                this.applyMiniMaxScore(state,true);
                // this.identifyDifference(this.boardStatus.PlayerTwo.ActivePawns,state["board"].PlayerTwo.ActivePawns);
                if(state["children"])
                    root["score"] = this.getMinScore(state["children"]);
            }
        }
        return;
        
    }
    getMaxScore(childrenStates){

        let currMax = childrenStates[0]["score"];
        
        // Locate the Optimal Board State
        for(let i = 1; i < childrenStates.length-1; i++){
            if(childrenStates[i]["score"] > currMax){
                currMax = childrenStates[i]["score"];
            }
        }
        return currMax;
    }
    getMinScore(childrenStates){

        let currMin = childrenStates[0]["score"];
        
        // Locate the Optimal Board State
        for(let i = 1; i < childrenStates.length-1; i++){
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
                // this.identifyDifference(this.boardStatus.PlayerTwo.ActivePawns,state["board"].PlayerTwo.ActivePawns);
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
        // for(let state of boardStates["children"]){
        //     this.identifyDifference(boardStates.PlayerTwo.ActivePawns,state["board"].PlayerTwo.ActivePawns);
        // }
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
            movePieceBoard.unhighlightTiles();
            // this.identifyDifference(this.boardStatus.PlayerTwo.ActivePawns,movePieceBoard["board"].PlayerTwo.ActivePawns);
            let targets = movePieceBoard.selectedPawn.getTargets(movePieceBoard.grid);

            // Account for Attack Moves
            for(let enemy of targets){
                let stateSpace = {};
                let attackPieceBoard = clonedeep(movePieceBoard);
                attackPieceBoard.showPawnAttack(pawnClone.Position.x,pawnClone.Position.y);
                attackPieceBoard.attackTargetPawn(enemy.Position.x,enemy.Position.y);

                stateSpace["board"] = attackPieceBoard;
                stateSpace["score"] = this.measureWeights(this.boardStatus.PlayerTwo,movePieceBoard.PlayerTwo);
                
                newBoardPieceMoves.push(stateSpace);
            }
            // Account for no-Attack Moves
            stateSpaceOrigin["board"] = movePieceBoard;
            stateSpaceOrigin["score"] = this.measureWeights(this.boardStatus.PlayerTwo,movePieceBoard.PlayerTwo);
            // console.log("Add",pawn.Position,pos);
            // this.identifyDifference(this.boardStatus.PlayerTwo.ActivePawns,stateSpaceOrigin["board"].PlayerTwo.ActivePawns);
            newBoardPieceMoves.push(stateSpaceOrigin);
            
        }
        // console.log(newBoardPieceMoves);
        // for(let state of newBoardPieceMoves){
        //     this.identifyDifference(this.boardStatus.PlayerTwo.ActivePawns,state["board"].PlayerTwo.ActivePawns);
        // }
        // console.log("finish");
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