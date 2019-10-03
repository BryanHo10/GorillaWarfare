import _ from 'lodash';
import Board from "./Models/Board.js"
import * as p5 from "p5";

const TileLength = 12;

export {TileLength};
let s = (sk) => {  
    let game;  
    sk.setup = () =>{
        sk.createCanvas(700,700);
        sk.background(0);
        game = new Board(700,700,TileLength);  
        game.createNewGrid();  
    }

    sk.draw = () =>{
        game.show();
    }
    sk.mouseClicked = () =>{
        game.showPawn(sk.mouseX,sk.mouseY);
    }
}


const P5 = new p5(s);
export {P5};
