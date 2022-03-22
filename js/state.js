export const states = {
    RUNNING: 0,
    JUMPING: 1,
    FALLING: 2,
};

class State {
    constructor(state){
        this.state = state;
    }
}

export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){  
        if(this.player.onGround()){
            this.player.frameY = 0;
            this.player.maxFrames = 3;
        }
    }
    handleInput(input){
        if(input === 'PRESS up'){
            this.player.setState(states.JUMPING);
        }
    }
}


export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        this.player.frameY = 1;
        this.player.velocidadeY -= 8;
        this.player.maxFrames = 5;
    }
    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.RUNNING);
        }else if(this.player.velocidadeY > 0){
            this.player.setState(states.FALLING);
        }
    }
}

export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.frameY = 2;
        this.player.maxFrames = 7;
    }
    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.RUNNING);
        }
    }
}