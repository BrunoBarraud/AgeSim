import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    occupiedPositions: { x: number, y: number }[];
    maderaText: Phaser.GameObjects.Text; // Texto para mostrar la cantidad de madera
    maderaCount: number = 100; // Inicializar madera en 100
    botonRestarMadera: Phaser.GameObjects.Text; // Botón para restar madera

    constructor() {
        super('Game');
        this.occupiedPositions = [];
    }

    create() {
        this.fondo();

        // Crear el texto para mostrar la cantidad de madera
        this.maderaText = this.add.text(this.sys.canvas.width - 200, 50, 'Madera: 100', { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' });
        this.maderaText.setOrigin(1, 0);

        // Crear el botón para restar madera
        this.botonRestarMadera = this.add.text(this.sys.canvas.width - 200, 100, '-5 Madera', { 
            fontFamily: 'Arial', 
            fontSize: '24px', 
            color: '#000000', // Color del texto
            backgroundColor: '#ffffff', // Fondo blanco
            padding: { x: 10, y: 5 }, // Espaciado interno del botón
            stroke: '#000000', // Borde negro
            strokeThickness: 2 // Grosor del borde
        });
        this.botonRestarMadera.setOrigin(1, 0);
        this.botonRestarMadera.setInteractive(); // Hacer que el botón sea interactivo

        // Agregar evento al botón para restar madera
        this.botonRestarMadera.on('pointerdown', () => {
            this.mostrarPestanaConfirmacion();
        });
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

    // Función para restar madera
    restarMadera(cantidad: number) {
        if (this.maderaCount >= cantidad) {
            this.maderaCount -= cantidad;
        } else {
            // Si la cantidad de madera no es suficiente, mostrar un mensaje de saldo insuficiente
            this.mostrarMensaje('Saldo insuficiente');
        }
    }

    // Función para mostrar un mensaje temporal en la pantalla
    mostrarMensaje(mensaje: string) {
        const mensajeText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, mensaje, { fontFamily: 'Arial', fontSize: '36px', color: '#ffffff' });
        mensajeText.setOrigin(0.5);
        this.time.delayedCall(2000, () => {
            mensajeText.destroy();
        });
    }

    // Función para mostrar la pestaña de confirmación
    mostrarPestanaConfirmacion() {
        const confirmacionText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 50, '¿Estás seguro de restar 5 de madera?', { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' });
        confirmacionText.setOrigin(0.5);

        const botonSi = this.add.text(this.sys.canvas.width / 2 - 50, this.sys.canvas.height / 2 + 50, 'Sí', { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' });
        botonSi.setOrigin(0.5);
        botonSi.setInteractive();
        botonSi.on('pointerdown', () => {
            this.restarMadera(5);
            confirmacionText.destroy();
            botonSi.destroy();
            botonNo.destroy();
        });

        const botonNo = this.add.text(this.sys.canvas.width / 2 + 50, this.sys.canvas.height / 2 + 50, 'No', { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' });
        botonNo.setOrigin(0.5);
        botonNo.setInteractive();
        botonNo.on('pointerdown', () => {
            confirmacionText.destroy();
            botonSi.destroy();
            botonNo.destroy();
        });
    }
}
