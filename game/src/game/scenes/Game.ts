import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    occupiedPositions: { x: number, y: number }[];
    

    constructor() {
        super('Game');
        this.occupiedPositions = [];
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        const grid = this.add.grid(512, 384, 1024, 768, 64, 64, 0xffffff);
        grid.setOrigin(0.5);
        grid.setAltFillStyle(0xcccccc);
        grid.setOutlineStyle();
        grid.setAlpha(0.5);  
        // Agregar una imagen en cada cuadrado de la grilla para visualizar mejor las celdas de la grilla
        for (let i = 0; i < grid.width+100; i += 64) {
            for (let j = 0; j < grid.height+100; j += 64) {
                this.add.image(i, j, 'pasto').setAlpha(0.5);
            }
        }
        
        

        

       

        
    }

    update() {
        
    }
}