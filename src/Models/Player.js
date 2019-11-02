import Pawn from "./Characters/Pawn"

export default class Player{
    constructor(label){
        this.Label = label;
        this.PawnStatus = {
            "Chicken":8,
            "Monkey":2,
            "Cheetah":2,
            "Gorilla":1,
            "Lion":1,
            "Elephant":2
        };
        this.PawnCount = 18;
        this.ActivePawns=[];
    } 
    
    AddPawn(target){
        target.Owner = this.Label;
        this.ActivePawns.push(target);
    }
    movePawn(){

    }
    attackPawn(){
        
    }
}