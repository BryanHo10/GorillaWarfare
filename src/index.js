import _ from 'lodash';
import Board from "./Models/Board.js"
import * as p5 from "p5";
import {Terrains,Players,GameStates} from "./Models/Properties";
import Position from "./Models/Position";
import KongAI from './Models/Artificial Intelligence/KongAI.js';

const TileLength = 12;

export {TileLength};



let s = (sk) => {  
    let canvas;
    let game; 
    let infoBox;
    let bgm;
    //let endTurnButton;
    sk.setup = () =>{
        canvas = sk.createCanvas(700,700);
        canvas.position(300, 300);
        sk.background(0);
        game = new Board(700,700,TileLength,true);  
        game.createNewGrid();
        game.generateTerrain();
        bgm = sk.createAudio("../assets/Andy's-Theme.m4a");
        bgm.autoplay(true);
        bgm.loop(true);

        // endTurnButton = createButton('End Turn');
        // endTurnButton.position(800, 600);
        // endTurnButton.mousePressed(endTurn);
    }

    sk.endTurn = () =>{
        game.togglePlayerTurn();
    }

    sk.draw = () =>{
        game.show();
        //sk.image(infoBox,100,100);
        //endTurnButton.show();
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

//p5 object for the infoBox
let i = (ik) => {
    let canvas;
    let img;
    setup = () =>{
        canvas = ik.createCanvas(700,700);
        canvas.position(300, 1000);
        background(0);
        img = ik.rect(0,0,700,300);
    }
    draw = () => {
        ik.image(img);
    }
}


const P5 = new p5(s);
export {P5};
