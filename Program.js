let grid=[];
let ROW_SIZE=10;
let COL_SIZE=10;
let TILE_WIDTH;

function setup(){
    createCanvas(700,700);
    background(0);

    TILE_WIDTH = width/10;
    for(var y=0;y<COL_SIZE;y++){
        let row = [];
        for(var x=0;x<ROW_SIZE;x++){
            row[x]=new Tile(x,y,TILE_WIDTH);
        }
        grid.push(row);
    }
}
function draw(){
    
    for(var y=0;y<COL_SIZE;y++){
        for(var x=0;x<ROW_SIZE;x++){
            grid[y][x].show();
        }

    }
}