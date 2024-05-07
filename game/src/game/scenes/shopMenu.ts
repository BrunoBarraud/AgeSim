import { Scene } from 'phaser';
import { Game } from 'phaser';
export class shopMenu extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;

    constructor() {
        super('shopMenu');
    }
    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);
        //
        const tituloShop = this.add.image(this.scale.width/2, 50, 'tituloShop');


        const gameText = this.add.text(this.scale.width-20, 10, 'X', { color: '#ffff' });
        gameText.setInteractive();
        gameText.on('pointerdown', () => {
            
            this.scene.stop('shopMenu');
            
        });
    }
}