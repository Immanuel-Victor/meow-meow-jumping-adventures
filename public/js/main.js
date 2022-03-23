// ELEMENTOS HTML

let qS = identificador => document.querySelector(identificador);

const modal = qS(".modal");
const scoreInput = qS("#score_input");
const scoreIndicator = qS("#score");
const scoreMeter = qS("#scoreMeter");
const corpo = qS("body");
const gato = qS("#canva_jogo");
const chao = qS("#chao");

// OBSTÁCULOS

let velocidade = 20, comprimentoDoGato = gato.clientWidth;

async function fimDeJogo(...nada) {
    mudancaDoChao = new Function();
    aQuedaDoGato = new Function();
    clearInterval(scoreInterval);
    toggleModal();
}

async function colisao(gato, obstaculo, funcao) {
    let posicaoDoElemento = elemento => elemento.getBoundingClientRect();

    let posicaoGato = posicaoDoElemento(gato), posicaoObstaculo = posicaoDoElemento(obstaculo);

    if (posicaoGato.left < posicaoObstaculo.right && posicaoGato.right > posicaoObstaculo.left &&
        posicaoGato.top < posicaoObstaculo.bottom && posicaoGato.bottom > posicaoObstaculo.top) {
            funcao(posicaoGato, posicaoObstaculo);
        }
    else {
        if (posicaoObstaculo.right > 30) setTimeout(() => colisao(gato, obstaculo, funcao), velocidade);
    }

}

async function adicionaAntena(quantidade, largura, ancestral){
    let i = 0;
    let distancia = 50;

    while (i < quantidade){
        let espacamento = Math.floor(Math.random() * (((largura - 50) / (quantidade - i)) - distancia + 1) ) + distancia;
        distancia = espacamento + 50;
        let antena = document.createElement("img");
        antena.setAttribute("class", "antena");
        antena.setAttribute("src", "../assets/images/antena.png");
        ancestral.appendChild(antena);
        antena.style.left = `${espacamento}vw`
        i++;

        let tempoBase = (velocidade * 100) + (screen.width * (espacamento / 100));
        setTimeout(() => colisao(gato, antena, fimDeJogo), tempoBase + (comprimentoDoGato * i));
    }

}

async function adicionaBuraco(largura, ancestral) {
    let buraco = document.createElement("div");
    buraco.setAttribute("class", "buraco");
    ancestral.appendChild(buraco);

    let tempoColisao = (velocidade * 100) + (screen.width * ((largura + 40) / 100));
    setTimeout(() => colisao(gato, buraco, function caiuNoBuraco(posicaoGato, posicaoObstaculo) {
        if (posicaoObstaculo.left - posicaoGato.left <= comprimentoDoGato * 0.7 && posicaoGato.right - posicaoObstaculo.right <= comprimentoDoGato * 0.5){
            fimDeJogo();
        } else {
            setTimeout(() => colisao(gato, buraco, caiuNoBuraco), velocidade);
        }
    }), tempoColisao);
}

async function mudancaDoChao(elemento, atual, total, decremento, intervalo){
    atual -= decremento;
    setTimeout(() => {
        elemento.style.left = `${atual}vw`;

        if (total + atual > -10) mudancaDoChao(elemento, atual, total, decremento, intervalo);
        else chao.removeChild(elemento);

        if (total + atual === 100) oBuraco();
    }, intervalo);
}

async function oBuraco(){
    let largura = Math.floor(Math.random() * (400 - 100 + 1) ) + 100
    let tempo = largura * 10 * 2, vwPorVelocidade = (largura / tempo) * velocidade;

    // elemento ao qual a mudança de posição é aplicada. contém base e antenas
    let ancestral = document.createElement("div");
    ancestral.setAttribute("class", "ancestral");
    ancestral.style.left = "100vw";
    
    // elemento que contém os componentes do chao: tileset e buraco
    let base = document.createElement("div");
    base.setAttribute("class", "tileset");
    base.style.minWidth = `${largura + 40}vw`;

    // div com tileset como imagem de fundo
    let imagem = document.createElement("div");
    imagem.setAttribute("class", "imagem");
    imagem.style.minWidth = `${largura}vw`;
     
    // organiza a hierarquia dos elementos criados e os adiciona ao HTML
    base.appendChild(imagem);
    await adicionaBuraco(largura, base);
    ancestral.appendChild(base);
    adicionaAntena(Math.floor(largura / 110), largura, ancestral);
    chao.appendChild(ancestral);
    
    // adiciona o comportamento de scroll ao jogo (aplicado na div ancestral)
    mudancaDoChao(ancestral, 100, largura + 40, vwPorVelocidade, velocidade);
}
oBuraco();

// PULO

let tempo = new Date();
let finalizado = true;
let sequencia = [];

function oPuloDoGato(distancia){
    gato.style.bottom = `${distancia}px`;
    setTimeout(() => gato.style.bottom = `${100 - distancia}px`, 500);

    if (distancia < 100){
        setTimeout(() => oPuloDoGato(distancia+4), 20);
    }

}

function aQuedaDoGato(){
    tempo = new Date();

    if (sequencia.length > 0 && finalizado === true){
        oPuloDoGato(0);
        finalizado = false;
        setTimeout(() => {
            finalizado = true;
            aQuedaDoGato();
        }, 1000);
        sequencia.shift();
    }

}

corpo.addEventListener("keydown", (tecla) => {
    if (tecla.key === "ArrowUp"){

        if (new Date() - tempo >= 700 || finalizado === true){
            sequencia.push(true);
            aQuedaDoGato();
        }

    }
});

// PONTUAÇÃO

let score = 0;

const scoreInterval = setInterval(() => {
        score+=10;
        scoreMeter.textContent = score;
}, 1000);

function toggleModal() {

    scoreInput.value = score;
    scoreIndicator.textContent = score;

    modal.classList.toggle("visible_modal");
}