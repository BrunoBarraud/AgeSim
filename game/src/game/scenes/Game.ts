import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    occupiedPositions: { x: number, y: number }[];
    player: any;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('Game');
        this.occupiedPositions = [];
    }

    preload(){
        this.load.image('pasto', 'assets/pasto.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.fondo();
        this.constPlayer();
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

    constPlayer(){
        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });





    }

    


    update() {
        
        if (this.cursors && this.cursors.left?.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors && this.cursors.right?.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        
        if (this.cursors && this.cursors.up?.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

    }
}