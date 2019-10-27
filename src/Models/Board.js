import Tile from "./Tile.js";
import Monkey from "./Characters/Monkey";
import Lion from "./Characters/Lion"
import Gorilla from "./Characters/Gorilla";
import Elephant from "./Characters/Elephant"
import Chicken from "./Characters/Chicken";
import Cheetah from "./Characters/Cheetah"
import Position from "./Position";
import {Direction,Players,GameStates} from "./Properties";
import Player from "./Player";
import * as lib from "../index";

export default class Board{
    constructor(boardWidth,boardHeight,rowCount){
        this.grid=[];
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.ROW_SIZE = rowCount;
        this.COL_SIZE = rowCount;
        this.TILE_WIDTH = boardWidth/this.ROW_SIZE;

        // Terrain Placements
        this.LakePositions = null;
        this.TreePositions = null;   
        
        // Current States
        this.highlightedTiles=[];
        this.selectedPawn=null;
        this.selectedTile = null;

        // Player Status
        this.PlayerOne = new Player(Players.ONE);
        this.PlayerTwo = new Player(Players.TWO);
        
        // Game States
        this.gameStatus=GameStates.MOVE;
        this.currentPlayer = this.PlayerOne;
                                                
    }
    /**
     * Retrieves List of valid positions on turn
     * @return {Position[]} List of board positions
     */
    getAvailableMoves(piece){
        let stepCounter = 1;
        let possiblePositions=[piece.Position];
        let queue = [piece.Position];
        while(stepCounter <= piece.StepCount && queue.length != 0){
            let adjacentTiles = [];
            for(let pos of queue){
                let currentAdjacent = this.checkAdjacentCells(pos);
                // Remove duplicate positions  
                adjacentTiles = adjacentTiles.concat(currentAdjacent.filter( (elem) => {
                    return !adjacentTiles.includes( elem );
                  } ));

            }

            queue = adjacentTiles;
            possiblePositions = possiblePositions.concat(adjacentTiles);

            stepCounter+=1;
            // console.log(possiblePositions,stepCounter,queue,adjacentTiles);
        }
        return possiblePositions;
    }
    /**
     * Returns available adjacent positions from input position
     * @param {Position} currentPos
     * @return {Position[]} list of positions 
     */
    checkAdjacentCells(currentPos){
        let adjacentTiles = [];
        let newPos1 = new Position(currentPos.x-1,currentPos.y);
        if(this.isValidPosition(newPos1))
            adjacentTiles.push(newPos1);
        let newPos2 = new Position(currentPos.x+1,currentPos.y);
        if(this.isValidPosition(newPos2))
            adjacentTiles.push(newPos2);
        let newPos3 = new Position(currentPos.x,currentPos.y-1);
        if(this.isValidPosition(newPos3))
            adjacentTiles.push(newPos3);
        let newPos4 = new Position(currentPos.x,currentPos.y+1);
        if(this.isValidPosition(newPos4))
            adjacentTiles.push(newPos4);
        
        return adjacentTiles;
        
    }
    isValidPosition(currentPos){
        if(this.isWithinBoardBoundaries(currentPos)){
            if(this.grid[currentPos.x][currentPos.y].Occupant != null){
                return false;
            }
            return true;
        }
        return false;
    }

    /**
     * Attempts to set a box of tiles as specified Terrain
     * @param {Position}  currentPos  Upper Left Position of box (x,y)
     * @param {number}  width   Width of Box 
     * @param {number}  height  Height of Box
     * @param {Terrain} terrain 
     */
    tryPlaceTerrainTiles(currentPos,width,height,terrain){
        if(!this.isWithinBoardBoundaries(currentPos) || !this.isWithinBoardBoundaries(new Position(currentPos.x+width,currentPos.y+height))){
            return false;
        }
            
        for(let x = currentPos.x ; x < currentPos.x + width ; x++){
            for(let y = currentPos.y ; y < currentPos.y + height ; y++){
                this.grid[x][y].setTerrain(terrain);
            }
        }
        return true;
    }

    isWithinBoardBoundaries(position){

        if(position.x < 0 || position.x >= this.ROW_SIZE)
            return false;
        else if(position.y < 0 || position.y >= this.COL_SIZE)
            return false;
        return true;

    }
    generateRandomPawn(x,y){
        let randNum = Math.floor(Math.random() * Math.floor(6));
        switch(randNum){
            case 0:
                return new Monkey(x,y);
            case 1:
                return new Chicken(x,y);
            case 2:
                return new Lion(x,y);
            case 3:
                return new Gorilla(x,y);
            case 4:
                return new Elephant(x,y);
            case 5:
                return new Cheetah(x,y);
        }
        return null;

    }
    /**
     * Creates a Grid of [ROW_SIZE] by [COL_SIZE] Tiles
     */
    createNewGrid(){
        let occupant;
        for(var x=0;x<this.COL_SIZE;x++){
            let row = [];
            for(var y=0;y<this.ROW_SIZE;y++){
                if(y < 2){
                    occupant = this.generateRandomPawn(x,y);
                    occupant.Owner = Players.ONE;
                }
                else if(y >this.ROW_SIZE-3 || y < 2){
                    occupant = this.generateRandomPawn(x,y);
                    occupant.Owner = Players.TWO;
                }
                else
                    occupant = null;

                row[y]=new Tile(x,y,this.TILE_WIDTH,occupant);
            }
            this.grid.push(row);
        }
        
    }
    show(){
        for(var y=0;y<this.COL_SIZE;y++){
            for(var x=0;x<this.ROW_SIZE;x++){
                this.grid[y][x].show();
            }
    
        }
    }
    /**
     * Highlights current Pawn's available move
     * @param {number} x 
     * @param {number} y 
     */
    showPawnAttackDirection(){

        let availablePos = [new Position(this.selectedPawn.Position.x-1,this.selectedPawn.Position.y),
                            new Position(this.selectedPawn.Position.x+1,this.selectedPawn.Position.y),
                            new Position(this.selectedPawn.Position.x,this.selectedPawn.Position.y-1),
                            new Position(this.selectedPawn.Position.x,this.selectedPawn.Position.y+1)];

        availablePos = availablePos.filter( (elem) => {
            return this.isWithinBoardBoundaries( elem );
            } );

        for(let pos of availablePos){
            this.highlightedTiles.push(this.grid[pos.x][pos.y]);
            this.grid[pos.x][pos.y].isHighlight = true;
        }





        this.gameStatus = GameStates.HIGHLIGHT_ATTACK;
        this.show();
    }
    attackTargetPawn(x,y){
        let tileX = Math.floor(x/this.TILE_WIDTH);
        let tileY = Math.floor(y/this.TILE_WIDTH);
        let currentTile = this.grid[tileX][tileY];

        if(!currentTile.Occupant)
            return;
        else if(currentTile == this.selectedTile){
            this.gameStatus = GameStates.MOVE;
            this.togglePlayerTurn();
        }
        else if(this.highlightedTiles.includes(currentTile) && currentTile.Occupant.Owner != this.currentPlayer.Label){
            
            if(this.selectedPawn instanceof Elephant){

                for(let tile of this.highlightedTiles){
                    if(tile.Occupant && tile.Occupant.Owner != this.currentPlayer.Label){
                        this.grid[tile.x][tile.y].Occupant.HealthPoints -= this.selectedPawn.Damage;
                        this.checkPawnDeath(tile.x,tile.y);
                    }
                }
            }
            else{
                this.grid[tileX][tileY].Occupant.HealthPoints -= this.selectedPawn.Damage;
                this.checkPawnDeath(tileX,tileY);
            }
            this.unhighlightTiles();
            

            

            
            this.gameStatus = GameStates.HIGHLIGHT_MOVE;

            // Switch Player Turn
            this.togglePlayerTurn();

            this.show();
            
        }
        
    }
    checkPawnDeath(tileX,tileY){
        if(this.grid[tileX][tileY].Occupant.HealthPoints <= 0){
            if(this.currentPlayer.Label == Players.ONE){
                this.PlayerTwo.PawnCount--;
            }
            else{
                this.PlayerOne.PawnCount--;
            }
            this.grid[tileX][tileY].Occupant = null;

        }
    }
    togglePlayerTurn(){
        console.log(this.PlayerTwo,this.PlayerOne,this.currentPlayer);
        this.unhighlightTiles();
        if(this.currentPlayer.Label == Players.ONE)
            this.currentPlayer = this.PlayerTwo;
        else
            this.currentPlayer = this.PlayerOne;
    }
    showPawnAttack(x,y){
        let tileX = Math.floor(x/this.TILE_WIDTH);
        let tileY = Math.floor(y/this.TILE_WIDTH);
        let currentTile = this.grid[tileX][tileY];

        if(currentTile == this.selectedTile){
            this.gameStatus = GameStates.MOVE;
            this.togglePlayerTurn();
        }
        else if(this.highlightedTiles.includes(currentTile)){
            this.unhighlightTiles();
            let attackDir = this.locateDirection(currentTile);
            let availableAttack = this.selectedPawn.getAvailableAttacks(attackDir);
        
            availableAttack = availableAttack.filter( (elem) => {
                return this.isWithinBoardBoundaries( elem );
                } );
    
            for(let pos of availableAttack){
                this.highlightedTiles.push(this.grid[pos.x][pos.y]);
                this.grid[pos.x][pos.y].isHighlight = true;
            }

            
            this.gameStatus = GameStates.ATTACK;
        }
        
         // Switch Player Turn
        // if(this.currentPlayer == Player.ONE)
        //     this.currentPlayer = Player.TWO;
        // else
        //     this.currentPlayer = Player.ONE;
        

    }
    locateDirection(tile){
        if(this.selectedPawn.Position.x-1 == tile.x){
            return Direction.WEST;
        }
        else if(this.selectedPawn.Position.x+1 == tile.x){
            return Direction.EAST;
        }
        else if(this.selectedPawn.Position.y+1 == tile.y){
            return Direction.SOUTH;
        }
        else if(this.selectedPawn.Position.y-1 == tile.y){
            return Direction.NORTH;
        }
        return;
    }
    showPawnMoves(x,y){
        let tileX = Math.floor(x/this.TILE_WIDTH);
        let tileY = Math.floor(y/this.TILE_WIDTH);
        let currentTile = this.grid[tileX][tileY];

        if(currentTile.Occupant!=null && currentTile.Occupant.Owner != this.currentPlayer.Label){
            return;
        }

        if(this.highlightedTiles.includes(currentTile)){
            this.movePawn(tileX,tileY);

        }
        else if(!currentTile.Occupant){
            this.unhighlightTiles();
            this.selectedPawn = null;
            this.selectedTile = null;
        }
        else if(currentTile.Occupant != this.selectedPawn){
            this.highlightNewPawn(tileX,tileY);
        }
        else{
            this.unhighlightTiles();
            this.selectedPawn = null;
            this.selectedTile = null;
        }


        
        this.show();
    }
    unhighlightTiles(){
        
        for(let i=this.highlightedTiles.length-1;i>=0;i--){

            this.highlightedTiles[i].isHighlight = false;
            this.highlightedTiles.splice(i,1);
            
        }
    }
    movePawn(tileX,tileY){
        this.gameStatus = GameStates.HIGHLIGHT_ATTACK;
        this.unhighlightTiles();
        if(tileX != this.selectedTile.x || tileY != this.selectedTile.y){
            this.grid[tileX][tileY].Occupant = this.grid[this.selectedTile.x][this.selectedTile.y].Occupant;
            this.grid[tileX][tileY].Occupant.Position.x = tileX;
            this.grid[tileX][tileY].Occupant.Position.y = tileY;
            this.grid[this.selectedTile.x][this.selectedTile.y].Occupant = null;
        }
        this.selectedPawn = this.grid[tileX][tileY].Occupant;
        this.selectedTile = this.grid[tileX][tileY];
        this.showPawnAttackDirection();
       
        
    }
    highlightNewPawn(tileX,tileY){
        this.unhighlightTiles();
        let currentTile = this.grid[tileX][tileY];
        let availablePos = this.getAvailableMoves(currentTile.Occupant);
        
        availablePos = availablePos.filter( (elem) => {
            return this.isWithinBoardBoundaries( elem );
            } );

        for(let pos of availablePos){
            this.highlightedTiles.push(this.grid[pos.x][pos.y]);
            this.grid[pos.x][pos.y].isHighlight = true;
        }
        this.selectedPawn = currentTile.Occupant;
        this.selectedTile = currentTile;
    }
}