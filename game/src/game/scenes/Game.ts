
import { Scene } from 'phaser';
import {shopMenu} from './shopMenu';
import { Estructura } from '../service/Estructura';
export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    occupiedPositions: { x: number, y: number }[];
    grillaActivada: boolean = false;
    grid : Phaser.GameObjects.Grid
    menuactivo: boolean = false;
    estructuras = [
        new Estructura('inis', 0, 0, 'inis', 150, 20),
        new Estructura('edificio', 0, 0, 'edificio', 100, 10)
    ];
    constructor() {
        super('Game');
        this.occupiedPositions = [];
    }

    create() {
       
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.grid= this.add.grid(512, 384, 1024, 768, 64, 64, 0xffffff);
        this.grid.setOrigin(0.5);
        this.grid.setAltFillStyle(0xcccccc); // Color de relleno alternativo
        this.grid.setOutlineStyle(0x000000, 1);
        this.grid.setAlpha(0.5);
         // Agregar una imagen en cada cuadrado de la grilla para visualizar mejor las celdas de la grilla
         for (let i = 0; i < this.grid.width+100; i += this.grid.cellWidth) {
            for (let j = 0; j < this.grid.height+100; j += this.grid.cellHeight) {
                // Calcula las coordenadas de cada celda de la grilla
                const cellX = this.grid.x - this.grid.displayOriginX + i + this.grid.cellWidth / 2;
                const cellY = this.grid.y - this.grid.displayOriginY + j + this.grid.cellHeight / 2;
    
                // Agrega una imagen en las coordenadas de la celda
                this.add.image(cellX, cellY, 'pasto').setOrigin(0.5).alpha = 0.8;
            }
        }
        const button = this.add.text(100, 100, 'Abrir menu', { color: '#ffff' });
        button.setInteractive();
        button.on('pointerdown', () => {
            this.menuactivo = !this.menuactivo;
            if(this.menuactivo){
                this.scene.add('shopMenu', shopMenu, false,this.estructuras);
                shopMenu.prototype.create();
            }
            else{
                this.scene.stop('shopMenu');
            }
           
        });
        
    }
    

    getEstructuraporTipo(tipoE: string){
        return this.estructuras.find(e => e.tipo === tipoE);
    }
    crearEstructuras(tipoE:string){
       
        if(this.grillaActivada){
            
        // Hacer la grilla interactiva para detectar clics

        this.grid.setInteractive();
        const e = this.getEstructuraporTipo(tipoE);
        if (e) {
            this.grid.on('pointerdown', (pointer: Phaser.Input.Pointer, localX: number, localY: number) => {
                // Convertir las coordenadas locales del clic a las coordenadas de la grilla
                const gridX = Math.floor(localX / this.grid.cellWidth) * this.grid.cellWidth + this.grid.cellWidth / 2;
                const gridY = Math.floor(localY / this.grid.cellHeight) * this.grid.cellHeight + this.grid.cellHeight / 2;

                // Agregar la casa en las coordenadas de la grilla donde se hizo clic
                this.Estructura(e.tipo, gridX, gridY, e.imagen);
            });
        }
    }
        
    }
    Estructura(tipo: string, x: number=0, y: number=0, imagen: string){
        const estructura = this.add.image(x, y, imagen);
        estructura.setInteractive();
        estructura.on('pointerdown', () => {
            if(this.occupiedPositions.some(pos => pos.x === x && pos.y === y)){
                console.log('Posicion ocupada');
            }else{
                console.log('Posicion libre');
                this.occupiedPositions.push({ x, y });
            }
        });
    }
   
    update() {
        
    }
}


