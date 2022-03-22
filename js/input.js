export class InputHandler {
    constructor(){
        this.lastKey = '';
        window.addEventListener('keydown', (e) => {
            console.log(e.key);
            switch(e.key){
                case "ArrowUp":
                    this.lastKey = "PRESS up";
                    break;
            }
        });
        window.addEventListener('keyup',(e) => {
            switch(e.key){
                case "ArrowUp":
                    this.lastKey = "RELEASE up";
                    break;
            }
        });
    }
}