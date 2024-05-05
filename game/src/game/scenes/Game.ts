import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    ocupiedPositions: { x: number, y: number }[];
    constructor ()
    {
        super('Game');
        this.ocupiedPositions = [];
    }
    
    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        // Agregar una grilla
        const grid = this.add.grid(512, 384, 1024, 768, 64, 64, 0xffffff);
        grid.setOrigin(0.5);
        grid.setAltFillStyle(0xcccccc);
        grid.setOutlineStyle();
        grid.setAlpha(0.5);

        // Agregar un texto
        this.gameText = this.add.text(512, 50, 'Game Scene', { color: '#00ff00' });
        this.gameText.setOrigin(0.5);

        // Manejar evento de toque
        this.input.on('pointerdown', this.handlePointerDown, this);

        EventBus.emit('current-scene-ready', this);
    }

    handlePointerDown(pointer: Phaser.Input.Pointer) {
        // Obtener las coordenadas del puntero en relación con la grilla
        const gridX = Math.floor(pointer.x / 64) * 64 + 32; // 64 es el ancho de cada celda de la grilla
        const gridY = Math.floor(pointer.y / 64) * 64 + 32; // 64 es el alto de cada celda de la grilla

        // Verificar si la posición está ocupada
        const isOccupied = this.ocupiedPositions.some(pos => pos.x === gridX && pos.y === gridY);

        // Si la posición no está ocupada, agregar la imagen
        if (!isOccupied) {
            this.add.image(gridX, gridY, 'edificio');
            this.ocupiedPositions.push({ x: gridX, y: gridY });
        }

        

    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
