import Tile from "./Tile.js";

export default class Board{
    constructor(boardWidth,boardHeight,rowCount){
        this.grid=[];
        this.ROW_SIZE = rowCount;
        this.COL_SIZE = rowCount;
        this.TILE_WIDTH = boardWidth/this.ROW_SIZE;
    }
    createNewGrid(){

        for(var y=0;y<this.COL_SIZE;y++){
            let row = [];
            for(var x=0;x<this.ROW_SIZE;x++){
                row[x]=new Tile(x,y,this.TILE_WIDTH,null);
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

}