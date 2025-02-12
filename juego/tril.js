//Class

class Game {
    constructor(){
        this.container = document.getElementById("game-container");
        this.Personaje = null;
        this.Monedas = [];
        this.puntuación = 0;
        this.crearEsceneario();
        this.agregarEventos();
    }
    crearEsceneario(){
        this.Personaje = new Personaje();
        this.container.appendChild(this.Personaje.element);
        for(let i=0; i < 5; i++){
            const moneda = new Moneda();
            this.Monedas.push(moneda);
            this.container.appendChild(moneda.element);
        }
    }
    agregarEventos(){
        window.addEventListener("keydown", (e) => this.Personaje.mover(e));
        this.checkColisiones();
    }
    checkColisiones(){
        setInterval(() => {
            this.Monedas.forEach((moneda, index) => {
                if(this.Personaje.colisionaCon(moneda)){
                    this.container.removeChild(moneda.element);
                    this.Monedas.splice(index,1)
                }
            })
        },
            100)
    }
}
class Personaje {       
    constructor(){
        this.x = 50;
        this.y = 300;
        this.width = 50;
        this.height = 50;
        this.velocidad = 10;
        this.saltando = false;
        this.element = document.createElement("div");
        this.element.classList.add("personaje");
        this.actualizarPosicion();
    }
    mover(evento){
        if(evento.key === "ArrowRight"){
            this.x += this.velocidad;
        }else if(evento.key === "ArrowLeft"){
            this.x -= this.velocidad
        }else if(evento.key === "ArrowUp" && !this.saltando){
            this.saltar();
        }
        this.actualizarPosicion();
    }
    saltar(){
        this.saltando = true;
        let alturaMaxima = this.y-100;
        const salto = setInterval(()=> {
            if(this.y > alturaMaxima){
                this.y -= 250; //redondeo de la gravedad
            }else{
                clearInterval(salto);
                this.caer()
            }
            this.actualizarPosicion();
        },
            20)
    }
        caer(){
            const gravedad = setInterval(() => {
                if(this.y < 300){
                    this.y += 10;
                }else {
                    clearInterval(gravedad);
                    this.saltando = false;
                }
                this.actualizarPosicion();
            },
                20)
        }
      actualizarPosicion(){
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

    }
    colisionaCon(objeto) {
        return (
            this.x < objeto.x + objeto.width &&
            this.x + this.width > objeto.x &&
            this.y < objeto.y + objeto.height &&
            this.y + this.height > objeto.y
        );
    }
}
class Moneda {
    constructor(){
        this.x = Math.random() * 700 + 50;
        this.y = Math.random() * 250 + 50;
        this.width = 30;
        this.height = 30;
        this.element = document.createElement("div");
        this.element.classList.add("moneda");
        this.actualizarPosicion();
    }
    actualizarPosicion(){
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}
const juego = new Game()




        
        
                

