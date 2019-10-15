import Tile from "./Tile.js";
import Monkey from "./Characters/Monkey";
import Lion from "./Characters/Lion"
import Gorilla from "./Characters/Gorilla";
import Elephant from "./Characters/Elephant"
import Chicken from "./Characters/Chicken";
import Cheetah from "./Characters/Cheetah"
import Position from "./Position";
import {Direction,Player,GameStates} from "./Properties";
import Pawn from "./Characters/Pawn";
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

        // Game States
        this.gameStatus=GameStates.MOVE;
                                                
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
                if(y >this.ROW_SIZE-3 || y < 2)
                    occupant = this.generateRandomPawn(x,y);
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
    showPawnMoves(x,y){
        let tileX = Math.floor(x/this.TILE_WIDTH);
        let tileY = Math.floor(y/this.TILE_WIDTH);
        let currentTile = this.grid[tileX][tileY];

        

        if(this.highlightedTiles.includes(currentTile)){
            // this.gameStatus = GameStates.ATTACK;
            this.unhighlightTiles();
            if(tileX != this.selectedTile.x || tileY != this.selectedTile.y){
                this.grid[tileX][tileY].Occupant = this.grid[this.selectedTile.x][this.selectedTile.y].Occupant;
                this.grid[tileX][tileY].Occupant.Position.x = tileX;
                this.grid[tileX][tileY].Occupant.Position.y = tileY;
                this.grid[this.selectedTile.x][this.selectedTile.y].Occupant = null;
            }
            this.selectedPawn = null;
            this.selectedTile = null;
        }
        else if(!currentTile.Occupant){
            this.unhighlightTiles();
            this.selectedPawn = null;
            this.selectedTile = null;
        }
        else if(currentTile.Occupant != this.selectedPawn){
            this.unhighlightTiles();
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

}