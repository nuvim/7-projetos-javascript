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
    if(!playing) return; // não permita jogadas se o jogo acabou
    let item = event.target.getAttribute('data-item');
    if(square[item] === '') {
        square[item] = player; 
        renderSquare();          // atualiza o tabuleiro
        checkGame();             // verifica vitória/empate e possivelmente seta `playing = false`
        if(playing) togglePlayer(); // só alterna se ninguém venceu
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


function togglePlayer() {
    //if(player === 'x') {
     //   player = 'o';
   // } else{
    //    player = 'x';
    //}

    player = (player === 'x') ? 'o' : 'x'; // operador ternário para trocar o jogador
    renderInfo();
}

function checkGame() {
    
    if(checkWinnerFor('x')) { 
        warning = 'O "x" venceu!';
        playing = false;
    }else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu!';
        playing = false;
    }else if(isFull()) { //isfull verifica se o tabuleiro está cheio
        warning = 'Deu empate!';
        playing = false;
    } 
    
    if (!playing) {
        renderInfo();
    } // atualiza as informações se o jogo acabou

}

function checkWinnerFor(player) {
    let pos = ['a1,a2,a3',
               'b1,b2,b3',
               'c1,c2,c3', // linhas
                
               'a1,b1,c1',
               'a2,b2,c2',
               'a3,b3,c3', // colunas
               
               'a1,b2,c3',
               'a3,b2,c1']; // diagonais

    for(let w in pos) { // pos significa posições
        let pArray = pos[w].split(','); // split separa a string em um array
        
        // pArray.every((option)=> { // every é uma função usada em array que verifica se todos os elementos do array satisfazem a condição
           // if(square[option] === player) {
          //      return true;
        //    } else{
        //        return false;
         //   }
      //  }); 

        let hasWon = pArray.every(option => square[option] === player); // arrow function para verificar se todos os elementos do array são iguais ao jogador atual
        if(hasWon) {
            return true;
        }
}
return false;
}

function isFull() { // logica de verificacao se o tabuleiro está cheio
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    } 
    return true;
}