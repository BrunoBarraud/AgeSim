import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    occupiedPositions: { x: number, y: number }[];
    gridX: number;
    gridY: number;
    addImageOnClick: boolean;
    Money: number;

    constructor() {
        super('Game');
        this.occupiedPositions = [];
        this.addImageOnClick = false;
        this.Money = 100; // Inicializamos la variable Money en 0
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

        this.gameText = this.add.text(512, 50, 'Money: 0', { color: '#000' });
        this.gameText.setOrigin(0.5);
        
        // Agregar una imagen en cada cuadrado de la grilla para visualizar mejor las celdas de la grilla
        for (let i = 0; i < grid.width+100; i += 64) {
            for (let j = 0; j < grid.height+100; j += 64) {
                this.add.image(i, j, 'pasto').setAlpha(0.5);
            }
        }
        
        

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
           
                this.gridX = Math.floor(pointer.x / 64) * 64 + 32;
                this.gridY = Math.floor(pointer.y / 64) * 64 + 32;

                const isOccupied = this.occupiedPositions.some(pos => pos.x === this.gridX && pos.y === this.gridY);

                if (!isOccupied) {
                    const A = this.registry.get('variableA');
                    if (A !== 0) {
                        if (A === 1 ) {
                            if (this.Money >= 30) {
                            this.Money -= 30;
                            const button = this.add.text(this.cameras.main.width - 1000, this.cameras.main.height - 100, 'Edificio $30 +$1', {
                                fontSize: '32px',
                                color: '#000',
                                backgroundColor: '#fff',
                            });
                            const image = this.add.image(this.gridX, this.gridY, 'edificio');
                            image.setInteractive();
                            image.setDepth(0); // Ajustamos la profundidad de la imagen para que esté detrás del texto
                            image.on('pointerdown', () => {
                                const A = this.registry.get('variableA');
                                if (A === 0) {
                                    this.Money += 1;
                                }
                            });
                        }
                        
                            
                    } else if (A === 2  ) {
                        if (this.Money >= 50) {
                            this.Money -= 50;
                            const button = this.add.text(this.cameras.main.width - 1000, this.cameras.main.height - 100, 'Fabrica $50 +$3', {
                                fontSize: '32px',
                                color: '#000',
                                backgroundColor: '#fff',
                            });
                            const fabrica = this.add.image(this.gridX, this.gridY, 'Fabrica');
                            fabrica.setInteractive();
                            fabrica.on('pointerdown', () => {
                                const A = this.registry.get('variableA');
                                if (A === 0) {
                                    this.Money += 3;
                                }
                            });
                            fabrica.setDepth(0); // Ajustamos la profundidad de la imagen para que esté detrás del texto
                        }}
                        this.occupiedPositions.push({ x: this.gridX, y: this.gridY });
                    }
                }
            
        });

        const button = this.add.text(this.cameras.main.width - 50, this.cameras.main.height - 50, 'Cambiar Estructura', {
            fontSize: '32px',
            color: '#000',
            backgroundColor: '#fff',
        });
        button.setOrigin(1, 1);
        button.setInteractive();
        button.setDepth(1); // Establecemos la profundidad del botón por encima del texto

        button.on('pointerdown', () => {
            const A = this.registry.get('variableA');
            if (A < 2) {
               
                this.registry.set('variableA', A + 1);
            } else {
                const button = this.add.text(this.cameras.main.width - 1000, this.cameras.main.height - 100, '   RECOLECTOR   ', {
                    fontSize: '32px',
                    color: '#000',
                    backgroundColor: '#fff',
                });
                this.registry.set('variableA', 0);
            }
        });

        button.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
        });

        button.on('pointerout', () => {
            this.input.setDefaultCursor('');
        });
    }

    update() {
        this.gameText.setText(`Money: ${this.Money}`);
    }
}