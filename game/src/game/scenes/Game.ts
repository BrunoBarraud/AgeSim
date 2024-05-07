import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    occupiedPositions: { x: number, y: number }[];

    player: Phaser.Physics.Arcade.Sprite;

    

    constructor() {
        super('Game');
        this.occupiedPositions = [];
    }

    create() {
        this.fondo();

        this.add.image(512, 384, 'dude');


        //sprites 
        this.anims.create({ 
            key: 'idle', 
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), 
            frameRate: 10, 
            repeat: -1 
        });

        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }), 
            frameRate: 10, 
            repeat: -1 
        });

        this.anims.create({ 
            key: 'run', 
            frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }), 
            frameRate: 10, 
            repeat: -1 
        });




        //Input de teclado 
        this.cursors = this.input.keyboard.createCursorKeys(); 
        
    }
    fondo(){
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        


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
        
        if(this.cursors.left.isDown){
            this.camera.scrollX -= 4;
        }
        if(this.cursors.right.isDown){
            this.camera.scrollX += 4;
        }
        if(this.cursors.up.isDown){
            this.camera.scrollY -= 4;
        }
        if(this.cursors.down.isDown){
            this.camera.scrollY += 4;
        }

    }
}