import _ from 'lodash';
import Board from "./Models/Board.js"
import * as p5 from "p5";
import {Terrains,Player,GameStates} from "./Models/Properties";
import Position from "./Models/Position";

const TileLength = 12;

export {TileLength};
let s = (sk) => {  
    let game;  
    sk.setup = () =>{
        sk.createCanvas(700,700);
        sk.background(0);
        game = new Board(700,700,TileLength);  
        game.createNewGrid();
        game.tryPlaceTerrainTiles(new Position(2,4),2,4,Terrains.LAKE);  
        game.tryPlaceTerrainTiles(new Position(8,4),2,4,Terrains.LAKE);
        game.tryPlaceTerrainTiles(new Position(0,4),1,4,Terrains.TREE);
        game.tryPlaceTerrainTiles(new Position(11,4),1,4,Terrains.TREE)
        
    }

    sk.draw = () =>{
        game.show();
    }
    sk.mouseClicked = () =>{
        if(sk.mouseX <=700 && sk.mouseX >=0){
            if(sk.mouseY <=700 && sk.mouseY >=0){
                if(game.gameStatus == GameStates.MOVE){
                    game.showPawnMoves(sk.mouseX,sk.mouseY);
                }
                else if(game.gameStatus == GameStates.ATTACK){
                    game.showPawnAttack(sk.mouseX,sk.mouseY);
                }
                
            }
                
        }
        
        
    }
}


const P5 = new p5(s);
export {P5};
