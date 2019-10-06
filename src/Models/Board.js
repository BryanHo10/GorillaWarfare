import Tile from "./Tile.js";
import Monkey from "./Characters/Monkey";
import Position from "./Position";
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
                console.log(currentAdjacent);
                // Remove duplicate positions  
                adjacentTiles = adjacentTiles.concat(currentAdjacent.filter( (elem) => {
                    return !adjacentTiles.includes( elem );
                  } ));
                  console.log(adjacentTiles);

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
            console.log(currentPos);
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
    /**
     * Creates a Grid of [ROW_SIZE] by [COL_SIZE] Tiles
     */
    createNewGrid(){
        let occupant;
        for(var x=0;x<this.COL_SIZE;x++){
            let row = [];
            for(var y=0;y<this.ROW_SIZE;y++){
                if(y >this.ROW_SIZE-3 || y < 2)
                    occupant = new Monkey(x,y);
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
    showPawn(x,y){
        let tileX = Math.floor(x/this.TILE_WIDTH);
        let tileY = Math.floor(y/this.TILE_WIDTH);
        let currentOccupant = this.grid[tileX][tileY].Occupant; 
        if(currentOccupant){
            currentOccupant.changeColor();
            let availablePos = this.getAvailableMoves(currentOccupant);
            console.log(availablePos);
            for(let pos of availablePos){
                this.grid[pos.x][pos.y].isHighlight = true;
            }
        }
        this.show();
    }

}