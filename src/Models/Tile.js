import * as lib from "../index";
import {Terrains} from "./Properties";

export default class Tile{
    constructor(x,y,w,Occupant){
        this.x=x;
        this.y=y;
        this.w=w; 
        this.Occupant = Occupant;
        this.Terrain = Terrains.GRASSLANDS;
        this.isHighlight=false;
    }
    /**
     * Sets position's terrain property to value
     * @param {Terrains} input 
     */
    setTerrain(input){
        this.Terrain = input;
    }

    show(){
        
        if(this.Occupant){
            this.Occupant.show();
            lib.P5.stroke(255);
        }
        
        else{
            switch(this.Terrain){
                case Terrains.GRASSLANDS:
                    lib.P5.fill(190, 162, 61);
                    break;
                case Terrains.TREE:
                    lib.P5.fill(79, 172, 79);
                    break;
                case Terrains.LAKE:
                    lib.P5.fill(81, 170, 164);
                    break;
                default:
                    lib.P5.fill(127);
                    break;
            }
            
            lib.P5.stroke(255);
        }
        if(this.isHighlight){
            lib.P5.stroke(0);
        }
        lib.P5.rect(this.x*this.w,this.y*this.w,this.w,this.w);
        
    }
    
}