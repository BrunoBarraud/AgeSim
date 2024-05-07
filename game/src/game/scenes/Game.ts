import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    occupiedPositions: { x: number, y: number }[];
    maderaText: Phaser.GameObjects.Text; // Texto para mostrar la cantidad de madera

    // Variable para almacenar la cantidad de madera
    maderaCount: number = 0;

    constructor() {
        super('Game');
        this.occupiedPositions = [];
    }

    create() {
        this.fondo();

        // Crear el texto para mostrar la cantidad de madera
        this.maderaText = this.add.text(this.sys.canvas.width - 50, 25, 'Madera: 0', { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' });
        this.maderaText.setOrigin(1, 0);
    }

    fondo(){
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        
        const grid = this.add.grid(512, 384, 1024, 768, 64, 64, 0xffffff);
        grid.setOrigin(0.5);
        grid.setAltFillStyle(0xcccccc);
        grid.setOutlineStyle();
        grid.setAlpha(0.5);  

        for (let i = 0; i < grid.width+100; i += 64) {
            for (let j = 0; j < grid.height+100; j += 64) {
                this.add.image(i, j, 'pasto').setAlpha(0.5);
            }
        }
    }

    update() {
        // Actualizar el texto de la cantidad de madera
        this.maderaText.setText(`Madera: ${this.maderaCount}`);
    }
}
