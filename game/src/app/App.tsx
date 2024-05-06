import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame';
import { Game } from '../game/scenes/Game';




function App() {
  
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const changeScene = () => {

        if(phaserRef.current)
        {
            const scene = phaserRef.current.scene as Game;

            if(scene)
            {
                scene.scene.start('Game');
            }


            
        }
        if (phaserRef.current)
            {
                const scene = phaserRef.current.scene;
    
                if (scene)
                {
                   
                }
            }
    }
    const currentScene = (scene: Phaser.Scene) => {

       

    }
    
    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    )

   
}

export default App
