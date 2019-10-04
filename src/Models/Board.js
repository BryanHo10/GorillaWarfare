import Tile from "./Tile.js";
import Monkey from "./Characters/Monkey"
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
     * Attempts to set a box of tiles as specified Terrain
     * @param {number}  startX  Upper Left index of box (x,y)
     * @param {number}  startY  Upper Left index of box (x,y) 
     * @param {number}  width   Width of Box 
     * @param {number}  height  Height of Box
     * @param {Terrain} terrain 
     */
    tryPlaceTerrainTiles(startX,startY,width,height,terrain){
        if(!this.isWithinBoardBoundaries)
            return false;
            
        for(let x = startX ; x < startX + width ; x++){
            for(let y = startY ; y < startY + height ; y++){
                this.grid[x][y].setTerrain(terrain);
            }
        }
        return true;
    }

    isWithinBoardBoundaries(startX,startY,endX,endY){
        if(startX > endX || startY > endY)
            return false;
        else if(startX < 0 || startX > this.ROW_SIZE)
            return false;
        else if(startY < 0 || startY > this.COL_SIZE)
            return false;
        else if(endX < 0 || endX > this.ROW_SIZE)
            return false;
        else if(endY < 0 || endY > this.COL_SIZE)
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
        console.log(this.grid[tileX][tileY]);
        try{
            this.grid[tileX][tileY].Occupant.changeColor();
        }
        catch(exception){
            console.log("No Occupants in location")
        }
    }

}