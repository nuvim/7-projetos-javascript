// Dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let vez = ''; // 'x' ou 'o'
let warning = ''; // mensagem de aviso
let playing = false; // indica se o jogo está em andamento

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset); // serve para reiniciar o jogo

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
}); // adiciona o evento de clique para todos os itens ao inves de adicionar um por um, ele percorre todos os elementos com a classe item e adiciona o evento de clique


// Funções

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(square[item] === '') {
        square[item] = player;
        renderSquare();
    }
}

function reset() {
    warning = '';

    //let random = Math.floor(Math.random() * 2); aqui ele escolhe aleatoriamente quem começa
    //if(random === 0) {
   //     vez = 'x';
    //} else {
   //     vez = 'o';
   // } esse if serve para definir quem começa o jogo

   // podemos fazer assim também:
   let random = Math.floor(Math.random() * 2); // aqui ele escolhe aleatoriamente quem começa
   player = (random === 0) ? 'x' : 'o'; // operador ternário para definir quem começa o jogo , os tres sinais de igual são para comparar valor e tipo

   for(let i in square) { // for let i in square significa que para cada posição em square faça...
        square[i] = ''; // limpa o square
    }

    playing = true; // o jogo está em andamento

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML= square[i];
    }
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

// 29:45

function togglePlayer() {
    
}