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
    }
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