import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    occupiedPositions: { x: number, y: number }[];
    building: Phaser.GameObjects.Image;
    startBuilding: any;
    moveBuilding: any;
    

    constructor() {
        super('Game');
        this.occupiedPositions = [];
    }

    create() {
        this.fondo();
        this.createInterface();
        
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

    createInterface(){

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(0, 0, 1024, 100);
        graphics.setDepth(1);

        this.gameText = this.add.text(10, 10, 'Game Scene', { color: 'white', fontSize: '32px' });

        const buildingButton = this.add.text(200, 10, 'Construir', { color: 'white', fontSize: '24px' })
        .setInteractive()
        .on('pointerdown', () => {
            // Aquí deberías mostrar las opciones de edificios
            this.showBuildingOptions();
        });
    }

    showBuildingOptions() {
        // Aquí deberías mostrar las opciones de edificios
        const buildingOptions = ['edificio1', 'edificio2', 'edificio3'];

    // Muestra cada opción de edificio en una fila horizontal
    buildingOptions.forEach((building, index) => {
        const buildingSprite = this.add.image(100 + index * 150, 50, building)
            .setInteractive()
            .on('pointerdown', () => {
                // Cuando se hace clic en un edificio, llama a la función para comenzar a construirlo
                this.startBuilding(building);
            });
    });

    this.startBuilding(this.building) {
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            const {x, y} = pointer;
            // Mueve el edificio a la posición del puntero
            this.moveBuilding(x, y, this.building);

    }



    update() {
        
    }
}