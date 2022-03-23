import {Running, Jumping, Falling} from "./state.js";

export class Player{
      constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.image = document.getElementById('imagem_gato');
        this.CAT_SPRITE_WIDTH = 160;
        this.CAT_SPRITE_HEIGHT = 120;
        this.x = this.gameWidth/2 - this.gameWidth/2;
        this.y = 350;
        this.jumpingHeight = 500;
        this.velocidadeY = 0;
        this.forca_gravid = 0.7;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrames = 3;
        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
    };

    desenhar_gato(contexto_gato, deltaTime) {
      if(this.frameTimer > this.frameInterval){
        if(this.frameX < this.maxFrames){
          this.frameX ++;
        }else{
          this.frameX = 0;
        }
        this.frameTimer = 0;
      }else {
        this.frameTimer += deltaTime;
      }
      contexto_gato.drawImage(this.image, this.CAT_SPRITE_WIDTH * this.frameX, this.CAT_SPRITE_HEIGHT * this.frameY, this.CAT_SPRITE_WIDTH, this.CAT_SPRITE_HEIGHT,this.x,this.y, this.CAT_SPRITE_WIDTH,this.CAT_SPRITE_HEIGHT);
    };
    update(input){
      this.currentState.handleInput(input);
      //movimento vertical
      this.y += this.velocidadeY;
      if(!this.onGround()){
        this.velocidadeY += this.forca_gravid;
      }else{
        this.velocidadeY = 0;
      }
      
    }
    setState(state){
      this.currentState = this.states[state];
      this.currentState.enter();
    }
    onGround(){
      return this.y >= this.jumpingHeight - this.CAT_SPRITE_HEIGHT;
    }     
}

