import _ from 'lodash';
import Board from "./Models/Board.js"
import * as p5 from "p5";
import {Terrains,Players,GameStates} from "./Models/Properties";
import Position from "./Models/Position";
import KongAI from './Models/Artificial Intelligence/KongAI.js';

const TileLength = 12;

export {TileLength};
let s = (sk) => {  
    let game;  
    sk.setup = () =>{
        sk.createCanvas(700,700);
        sk.background(0);
        game = new Board(700,700,TileLength,true);  
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

                switch(game.gameStatus){
                    case GameStates.HIGHLIGHT_MOVE:
                    case GameStates.MOVE:
                        game.showPawnMoves(sk.mouseX,sk.mouseY);
                        break;
                    case GameStates.HIGHLIGHT_ATTACK:
                        game.showPawnAttack(sk.mouseX,sk.mouseY);
                        break;
                    case GameStates.ATTACK:
                        game.attackTargetPawn(sk.mouseX,sk.mouseY);
                        break;
                    default:
                        break;
                }
                
            }
                
        }
        
        
    }
}


const P5 = new p5(s);
export {P5};
