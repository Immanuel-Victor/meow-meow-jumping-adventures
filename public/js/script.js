import {Player} from './player.js'
import {InputHandler} from './input.js'

window.addEventListener('load', function(){
    const canva_jogo = document.getElementById('canva_jogo');
    const contexto_jogo = canva_jogo.getContext('2d');
    canva_jogo.width = 160;
    canva_jogo.height = screen.height * 0.638;
    
    
    const player = new Player(canva_jogo.width, canva_jogo.height);
    const input = new InputHandler();
    
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        contexto_jogo.clearRect(0,0, canva_jogo.width,canva_jogo.height)
        player.update(input.lastKey);
        player.desenhar_gato(contexto_jogo,deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});