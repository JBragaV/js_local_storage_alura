const html = document.querySelector('html');
const imagemFocoDescanso = document.querySelector('.app__image');
const fraseContexto = document.querySelector('.app__title');
const displayTempo = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');

const focuBtn = document.querySelector('.app__card-button--foco');
const descansoCurtoBtn = document.querySelector('.app__card-button--curto');
const descansoLongoBtn = document.querySelector('.app__card-button--longo');
const playPauseBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector("#start-pause span");
const iniciarOuPausarImagem = document.querySelector("#start-pause img")

const botoes = document.querySelectorAll('.app__card-button');

let tempoEmSegundos = 1500;


let intervaloId = null;

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somFinalTempo = new Audio('./sons/beep.mp3');

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }else {
        musica.pause();
    }
})

descansoLongoBtn.addEventListener('click', () => {
    tempoEmSegundos = 900;
    modificadorAtributosContexto('descanso-longo');
    descansoLongoBtn.classList.add('active');
    
});

descansoCurtoBtn.addEventListener('click', () => {
    tempoEmSegundos = 60//300;
    modificadorAtributosContexto('descanso-curto');
    descansoCurtoBtn.classList.add('active');
});

focuBtn.addEventListener('click', () => {
    tempoEmSegundos = 1500;
    modificadorAtributosContexto('foco')
    focuBtn.classList.add('active');
});


function modificadorAtributosContexto(contexto) {
    mostrarTempo();
    botoes.forEach(contexto => {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imagemFocoDescanso.setAttribute('src', `imagens/${contexto}.png`);
    mostrarTempo();
    switch (contexto) {
        case "foco":
            fraseContexto.innerHTML = `Otimize sua produtividade,<br><strong class = "app__title-strong">mergulher no que importa.</strong>`;
            break;
        case "descanso-curto":
            fraseContexto.innerHTML = `Que tal dar uma respirada?<br><strong class = "app__title-strong">Faça uma pausa curta.</strong>`;
            break;
        case "descanso-longo":
            fraseContexto.innerHTML = `Hora de voltar à superfície.<br><strong class = "app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}
playPauseBtn.addEventListener('click', () => {
    if (intervaloId) {
        somPause.play();
        iniciarOuPausarBtn.textContent = "Começar";
        iniciarOuPausarImagem.setAttribute('src', './imagens/play_arrow.png')
        zerar();
        return
    }
    somPlay.play()
    intervaloId = setInterval(() => {
        tempoEmSegundos -= 1;
        mostrarTempo()
        if (tempoEmSegundos <= 0){
            somFinalTempo.play();
            zerar();
        }
    }, 1000);
    iniciarOuPausarBtn.textContent = "Pausar";
    iniciarOuPausarImagem.setAttribute('src', './imagens/pause.png')
});

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}


function mostrarTempo() {
    const tempoEmMinutos = new Date(tempoEmSegundos*1000);
    const tempoConfigurado = tempoEmMinutos.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    displayTempo.innerHTML = `${tempoConfigurado}`;
}

mostrarTempo()