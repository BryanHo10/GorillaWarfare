import * as lib from "../index";

export default class Tile{
    constructor(x,y,w,Occupant){
        this.x=x;
        this.y=y;
        this.w=w; 
        this.Occupant = Occupant;
    }
    
    show(){
        if(this.Occupant){
            this.Occupant.show();
        }
        else{
            lib.P5.fill(255, 204, 0);
            
        }
        lib.P5.stroke(255);
        lib.P5.rect(this.x*this.w,this.y*this.w,this.w-1,this.w-1);
        
    }
    
}