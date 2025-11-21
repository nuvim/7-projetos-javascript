// initial state
let currentColor = 'black'; // cor padrão inicial
let canDraw = false; // estado inicial de desenho
let mouseX = 0; // posição X inicial do mouse
let mouseY = 0; // posição Y inicial do mouse

let screen = document.querySelector('#tela'); // seleciona a tela de desenho
let ctx = screen.getContext('2d'); // obtém o contexto 2D da tela, o getContext é uma função nativa do canvas

let drawing = false; // estado de desenho (se o mouse está pressionado ou não)

// events
document.querySelectorAll('.colorArea .color').forEach(item => { // seleciona todos os itens de cor
    item.addEventListener('click', colorClickEvent); // adiciona o evento de clique para todos os itens de cor
});

document.querySelector('.clear').addEventListener('click', clearScreen); // evento de clique do botão limpar tela

screen.addEventListener('mousedown', mousedownEvent); // evento de clique do mouse
screen.addEventListener('mousemove', mousemoveEvent); // evento de movimento do mouse
screen.addEventListener('mouseup', mouseupEvent); // evento de soltar o clique do mouse


/*
Passo a passo do desenho em canvas:
- quando o clique do mouse for pressionado, iniciar o desenho
- quando o mouse se mover, ativar o modo de desenho
- quando o clique do mouse for solto, parar o modo de desenho
*/

// functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color'); // obtém a cor selecionada
    currentColor = color; // atualiza a cor atual selecionada

    // Remove a classe 'active' da cor anteriormente selecionada e adiciona à nova
    document.querySelector('.color.active').classList.remove('active'); // remove a classe 'active' da cor anteriormente selecionada
    e.target.classList.add('active'); // adiciona a classe 'active' à cor clicada
}

function mousedownEvent(e) {
    canDraw = true; // ativa o modo de desenho
    mouseX = e.pageX - screen.offsetLeft; // obtém a posição X do mouse na tela
    mouseY = e.pageY - screen.offsetTop; // obtém a posição Y do mouse na tela
}

function mousemoveEvent(e) {
   // if(canDraw) {
    //    let pointX = e.pageX - screen.offsetLeft; // obtém a posição X do mouse na tela
    //    let pointY = e.pageY - screen.offsetTop; // obtém a posição Y do mouse na tela
   // } // e.page - screen.offset a operação obtém a posição correta do mouse na tela de desenho, subtraindo a posição da tela em relação à página

    if(canDraw) {
        draw(e.pageX, e.pageY); // chama a função de desenho passando as posições X e Y do mouse
    }

}

function mouseupEvent() {
    canDraw = false; // desativa o modo de desenho
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft; // obtém a posição X do mouse na tela
    let pointY = y - screen.offsetTop; // obtém a posição Y do mouse na tela

    ctx.beginPath(); // inicia um novo caminho de desenho
    ctx.lineWidth = 5; // define a largura da linha
    ctx.lineJoin = "round"; // define o estilo da junção da linha
    ctx.moveTo(mouseX, mouseY); // move o ponto inicial para a posição anterior do mouse
    ctx.lineTo(pointX, pointY); // desenha uma linha até a nova posição do mouse
    ctx.closePath(); // fecha o caminho de desenho
    ctx.strokeStyle = currentColor; // define a cor da linha
    ctx.stroke(); // desenha a linha na tela

    mouseX = pointX; // atualiza a posição X do mouse
    mouseY = pointY; // atualiza a posição Y do mouse
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reseta qualquer transformação aplicada ao contexto
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // limpa toda a tela de desenho
}