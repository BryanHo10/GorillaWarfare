import Tile from "./Tile.js";
import Monkey from "./Characters/Monkey";
import Lion from "./Characters/Lion"
import Gorilla from "./Characters/Gorilla";
import Elephant from "./Characters/Elephant"
import Chicken from "./Characters/Chicken";
import Cheetah from "./Characters/Cheetah"
import Position from "./Position";
import {Direction,Players,GameStates, Terrains} from "./Properties";
import Player from "./Player";
import * as lib from "../index";
import KongAI from "./Artificial Intelligence/KongAI.js";

export default class Board{
    constructor(boardWidth,boardHeight,rowCount,playAI){
        this.grid=[];
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.ROW_SIZE = rowCount;
        this.COL_SIZE = rowCount;
        this.TILE_WIDTH = boardWidth/this.ROW_SIZE;
        this.playAI = playAI;

        // Terrain Placements
        this.LakePositions = null;
        this.TreePositions = null;   
        
        // Current States
        this.highlightedTiles=[];
        this.selectedPawn=null;
        this.selectedTile = null;

        // Player Status
        this.PlayerOne = new Player(Players.ONE);
        if(playAI){
            this.PlayerTwo = new KongAI(Players.TWO,this);
        }
        else {
            this.PlayerTwo = new Player(Players.TWO);
        }
        
        
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
    /**
     * Checks if a Piece is able to move to the current Position
     * @param {Position} currentPos 
     */
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

    generateTerrain(){
        // generate a random number of trees
        let numTrees = Math.floor(Math.random() * 30) + 15;
        for(let i = 0; i < numTrees; i++){
            this.grid[Math.floor(Math.random() * this.ROW_SIZE)][Math.floor(Math.random() * this.COL_SIZE)].setTerrain(Terrains.TREE);
        }

    }
    /**
     * Checks if the Position is within Board boundaries
     * @param {Position} position 
     */
    isWithinBoardBoundaries(position){

        if(position.x < 0 || position.x >= this.ROW_SIZE)
            return false;
        else if(position.y < 0 || position.y >= this.COL_SIZE)
            return false;
        return true;

    }


    generateBasicPieces(y,player_){
        for(var x = 2; x < this.COL_SIZE - 2; x++){
            this.grid[x][y].Occupant = new Chicken(x,y);
            this.grid[x][y].Occupant.Owner = player_;
        }
    }

    generateSpecialPieces(y,player_){
            let x = 2;
            
            this.grid[x][y].Occupant = new Cheetah(x,y);
            this.grid[x][y].Occupant.Owner = player_;
            x++;
            this.grid[x][y].Occupant = new Monkey(x,y);
            this.grid[x][y].Occupant.Owner = player_;
            x++;
            this.grid[x][y].Occupant = new Elephant(x,y);
            this.grid[x][y].Occupant.Owner = player_;
            x++;
            this.grid[x][y].Occupant = new Lion(x,y);
            this.grid[x][y].Occupant.Owner = player_;
            x++;
            this.grid[x][y].Occupant = new Gorilla(x,y);
            this.grid[x][y].Occupant.Owner = player_;
            x++;
            this.grid[x][y].Occupant = new Elephant(x,y);
            this.grid[x][y].Occupant.Owner = player_;
            x++;
            this.grid[x][y].Occupant = new Monkey(x,y);
            this.grid[x][y].Occupant.Owner = player_;
            x++;
            this.grid[x][y].Occupant = new Cheetah(x,y);
            this.grid[x][y].Occupant.Owner = player_;
            x++; 
    }
    /**
     * Creates a Grid of [ROW_SIZE] by [COL_SIZE] Tiles
     */
    createNewGrid(){
        for(var x=0;x<this.COL_SIZE;x++){
            let row = [];
            for(var y=0;y<this.ROW_SIZE;y++){
                row[y]=new Tile(x,y,this.TILE_WIDTH,null);
            }
            this.grid.push(row);
        }

        this.generateSpecialPieces(0,Players.ONE);
        this.generateBasicPieces(1,Players.ONE);
        this.generateBasicPieces(this.ROW_SIZE - 2,Players.TWO);
        this.generateSpecialPieces(this.ROW_SIZE - 1,Players.TWO);
        // generate pieces for top player

        for(let x = 2;x<this.COL_SIZE-2;x++){
            this.PlayerOne.AddPawn(this.grid[x][0].Occupant);
            this.PlayerOne.AddPawn(this.grid[x][1].Occupant);
            this.PlayerTwo.AddPawn(this.grid[x][this.ROW_SIZE-2].Occupant);
            this.PlayerTwo.AddPawn(this.grid[x][this.ROW_SIZE-1].Occupant);
        }
        if(this.playAI){
            this.PlayerTwo.updateBoard(this);
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
    /**
     * Handles mouse click on Game Status : ATTACK
     * @param {number} x 
     * @param {number} y 
     */
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
                        this.checkPawnDeath(tile.x,tile.y,tile.Occupant.constructor.name);
                    }
                }
            }
            else{
                this.grid[tileX][tileY].Occupant.HealthPoints -= this.selectedPawn.Damage;
                this.checkPawnDeath(tileX,tileY,currentTile.Occupant.constructor.name);
            }
            this.unhighlightTiles();
            
            this.gameStatus = GameStates.HIGHLIGHT_MOVE;

            // Switch Player Turn
            this.togglePlayerTurn();

            this.show();
            
        }
        
    }
    /**
     * Removes Pawn if Health Points are depleted, updating Player's Pawn Status
     * @param {number} tileX 
     * @param {number} tileY 
     * @param {string} pawnName 
     */
    checkPawnDeath(tileX,tileY,pawnName){
        if(this.grid[tileX][tileY].Occupant.HealthPoints <= 0){
            if(this.currentPlayer.Label == Players.ONE){
                this.PlayerTwo.PawnCount--;
                this.PlayerTwo.PawnStatus[pawnName]--;
            }
            else{
                this.PlayerOne.PawnCount--;
                this.PlayerOne.PawnStatus[pawnName]--;
            }
            this.grid[tileX][tileY].Occupant = null;

        }
    }
    /**
     * Switches Player
     */
    togglePlayerTurn(){
        this.unhighlightTiles();
        if(this.playAI){
            this.currentPlayer = this.PlayerTwo;
            this.PlayerTwo.updateBoard(this);
            this.PlayerTwo.performAction();
            this.currentPlayer = this.PlayerOne;
        }
        else if(this.currentPlayer.Label == Players.ONE)
            this.currentPlayer = this.PlayerTwo;
        else
            this.currentPlayer = this.PlayerOne;
    }
    /**
     * Handles mouse clicks during Game State : HIGHLIGH_ATTACK
     * @param {number} x 
     * @param {number} y 
     */
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
        

    }
    /**
     * Identify Tile location with respect to selected Tile
     * @param {Tile} tile 
     */
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
    /**
     * Handles mouse clicks during Game State : MOVE
     * @param {number} x 
     * @param {number} y 
     */
    showPawnMoves(x,y){
        let tileX = Math.floor(x/this.TILE_WIDTH);
        let tileY = Math.floor(y/this.TILE_WIDTH);
        let currentTile = this.grid[tileX][tileY];

        if(currentTile.Occupant!=null && currentTile.Occupant.Owner != this.currentPlayer.Label){
            return;
        }

        if(this.highlightedTiles.includes(currentTile)){
            this.movePawn(currentTile);

        }
        else if(!currentTile.Occupant){
            this.unhighlightTiles();
            this.selectedPawn = null;
            this.selectedTile = null;
        }
        else if(currentTile.Occupant != this.selectedPawn){
            this.highlightNewPawn(currentTile);
        }
        else{
            this.unhighlightTiles();
            this.selectedPawn = null;
            this.selectedTile = null;
        }


        
        this.show();
    }
    /**
     * Clears Highlight on Tiles
     */
    unhighlightTiles(){
        
        for(let i=this.highlightedTiles.length-1;i>=0;i--){

            this.highlightedTiles[i].isHighlight = false;
            this.highlightedTiles.splice(i,1);
            
        }
    }
    /**
     * Move previously selected Pawn to selected Tile
     * @param {Tile} currentTile 
     */
    movePawn(currentTile){
        this.gameStatus = GameStates.HIGHLIGHT_ATTACK;
        this.unhighlightTiles();
        if(currentTile.x != this.selectedTile.x || currentTile.y != this.selectedTile.y){
            currentTile.Occupant = this.grid[this.selectedTile.x][this.selectedTile.y].Occupant;
            currentTile.Occupant.Position.x = currentTile.x;
            currentTile.Occupant.Position.y = currentTile.y;
            this.grid[this.selectedTile.x][this.selectedTile.y].Occupant = null;
        }
        this.selectedPawn = currentTile.Occupant;
        this.selectedTile = currentTile;
        this.showPawnAttackDirection();
       
        
    }
    /**
     * Shows Available Movements for selected Occupant of the Tile
     * @param {Tile} currentTile 
     */
    highlightNewPawn(currentTile){
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


}