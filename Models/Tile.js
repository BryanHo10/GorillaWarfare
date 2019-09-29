class Tile{
    constructor(x,y,w){
        this.x=x;
        this.y=y;
        this.w=w; 
    }
           
    
    show(){
        fill(0);
        stroke(255);
        rect(this.x*this.w,this.y*this.w,this.w-1,this.w-1);
    }
    
}