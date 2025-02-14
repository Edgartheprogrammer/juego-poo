//Class

class Game {
    constructor(){
        this.container = document.getElementById("game-container");
        this.Personaje = null;
        this.Monedas = [];
        this.puntuación = 0;
        this.crearEsceneario();
        this.agregarEventos();
        this.sonidoPersonaje = new Audio (`sounds/mouseSound.mp3`)
        this.sonidoMoneda = new Audio (`sounds/mordida.wav`)
        this.puntosElement = document.getElementById("puntos");
        this.checkColisiones();
    }

    reproducirSonidoPersonaje(){
        this.sonidoPersonaje.currentTime = 0;
        this.sonidoPersonaje.play();
    }

    reproducirSonidoMoneda(){
        this.sonidoMoneda.currentTime = 0;
        this.sonidoMoneda.play();
    }
        

    crearEsceneario(){
        this.Personaje = new Personaje();
        this.container.appendChild(this.Personaje.element);
        for(let i=0; i < 8; i++){
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
                    this.reproducirSonidoMoneda();
                    this.actualizarPosicion(100);
                    
                }
            })
        },
            50);
    }
    actualizarPosicion(puntos){
        this.puntuación += puntos;
        this.puntosElement.textContent = `${this.puntuación}`
    }
}
class Personaje {       
    constructor(){
        this.x = 50;
        this.y = 500;
        this.width = 50;
        this.height = 50;
        this.velocidad = 10;
        this.saltando = false;
        this.element = document.createElement("img");
        this.element.src = "images/rat.png"
        this.element.classList.add("personaje");
        this.actualizarPosicion();
    }
    mover(evento){
        const container = document.getElementById("game-container")
        const containerWidth = container.offsetWidth;
        let seMovio = false;

        if(evento.key === "ArrowRight" && (this.x + this.width + this.velocidad) <= containerWidth){
            this.x += this.velocidad;
            seMovio = true
        }else if(evento.key === "ArrowLeft" && (this.x - this.velocidad) >= 0 ){
            this.x -= this.velocidad
            seMovio = true
        }else if(evento.key === "ArrowUp" && !this.saltando){
            this.saltar();
        }
        if(seMovio) {
            juego.reproducirSonidoPersonaje();
        }
        this.actualizarPosicion();
    }
    saltar(){
        this.saltando = true;
        let alturaMaxima = this.y-465;
        const salto = setInterval(()=> {
            if(this.y > alturaMaxima){
                this.y -= 10; //redondeo de la gravedad
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
                if(this.y < 500){
                    this.y += 4;
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
        this.x = Math.random() * 1300 + 7;
        this.y = Math.random() * 500 + 10;
        this.width = 30;
        this.height = 30;
        this.element = document.createElement("img");
        this.element.classList.add("moneda");
        this.actualizarPosicion();
        this.element.src = "images/bad-cheese.png"
    }
    actualizarPosicion(){
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}
const juego = new Game()




        
        
                

