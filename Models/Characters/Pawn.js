import {Terrain,Movesets} from 'Models/Properties.js';
class Pawn{
    constructor(HealthPoints,Damage,Moveset,AllowedTerrains){

        this.HealthPoints = HealthPoints;
        this.Damage = Damage;
        this.Moveset = Moveset;
        this.AllowedTerrains = AllowedTerrains;

    }

}