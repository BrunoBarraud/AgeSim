import { Scene } from "phaser";

//haceme un clase estructura que tenga los atributos tipo, x, y, imagen, costo, beneficio y un constructor que reciba estos atributos y los asigne a los atributos de la clase 
export class Estructura {
    tipo: string;
    x: number;
    y: number;
    imagen: string;
    costo: number;
    beneficio: number;

    constructor(tipo: string, x: number, y: number, imagen: string, costo: number, beneficio: number) {
        this.tipo = tipo;
        this.x = x;
        this.y = y;
        this.imagen = imagen;
        this.costo = costo;
        this.beneficio = beneficio;
    }
    
    
    //como hago para que sea interactive y que cuando haga click en la estructura me diga si la posicion esta ocupada o no
    
    

}
