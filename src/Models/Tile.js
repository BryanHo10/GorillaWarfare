import * as lib from "../index";
import {Terrains} from "./Properties";


export default class Tile{
    constructor(x,y,w,Occupant){
        this.x=x;
        this.y=y;
        this.w=w; 
        this.Occupant = Occupant;
        this.Terrain = Terrains.GRASSLANDS;
        this.TerrainImg = lib.P5.loadImage("../src/Models/Characters/Sprites/Grasslands.png");
        this.isHighlight=false;
    }
    /**
     * Sets position's terrain property to value
     * @param {Terrains} input 
     */
    setTerrain(input){

        switch(input){
            case Terrains.TREE:
                this.Terrain = Terrains.TREE;
                this.TerrainImg = lib.P5.loadImage("../src/Models/Characters/Sprites/Trees.png");
                break;
            default:
                lib.P5.fill(127);
                break;
        }
    }

    show(){
        if(this.Occupant){
            this.Occupant.show(); 
        }
        lib.P5.stroke(255);
        if(this.isHighlight){
            lib.P5.stroke(0);
        }
        lib.P5.rect(this.x*this.w,this.y*this.w,this.w,this.w);
        lib.P5.image(this.TerrainImg,this.x*this.w,this.y*this.w,this.w,this.w);
        if(this.Occupant){
            lib.P5.image(this.Occupant.sprite,this.x*this.w,this.y*this.w,this.w,this.w);
        }
    }
}