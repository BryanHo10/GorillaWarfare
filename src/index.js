import _ from 'lodash';
import Board from "./Models/Board.js"
import * as p5 from "p5";

import {Terrains,Players,GameStates} from "./Models/Properties";
import Position from "./Models/Position";
import KongAI from './Models/Artificial Intelligence/KongAI.js';
import { SlowBuffer } from 'buffer';

const TileLength = 12;

export {TileLength};

let s = (sk) => {  
    let canvas;
    let game; 
    let bgm;
    let img;

    sk.setup = () =>{
        img = sk.createImg('../assets/gorillawarfare-logo.png');
        img.position(sk.windowWidth/4 -45, 0);
        
        
        canvas = sk.createCanvas(700,700);
        canvas.position(0, 510);
        canvas.center('horizontal');
        sk.background(0);
        game = new Board(700,700,TileLength,true);  
        game.createNewGrid();
        game.generateTerrain();
        bgm = sk.createAudio("../assets/Andy's-Theme.m4a");
        bgm.autoplay(true);
        bgm.loop(true);
    }

    sk.draw = () =>{
        if(sk.mouseX <700 && sk.mouseX >0){
            if(sk.mouseY <700 && sk.mouseY >0){
                game.showInfo(sk.mouseX, sk.mouseY);
            }
        }
        game.show();
    }

    sk.mouseClicked = () =>{
        if(sk.mouseX <700 && sk.mouseX >0){
            if(sk.mouseY <700 && sk.mouseY >0){

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

