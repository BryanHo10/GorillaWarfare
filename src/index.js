import _ from 'lodash';
import Board from "./Models/Board.js"
import * as p5 from "p5";

let s = (sk) => {  
    let game;  
    sk.setup = () =>{
        sk.createCanvas(700,700);
        sk.background(0);
        game = new Board(700,700,12);  
        game.createNewGrid();  
    }

    sk.draw = () =>{
        game.show();
        console.log()
    }
}



export const P5 = new p5(s);
