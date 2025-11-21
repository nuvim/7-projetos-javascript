// dados iniciais pra controlar o que tem em cada área
let areas = {
    a: null,
    b: null,
    c: null
};

// adiciona os eventos nos itens (os números 1, 2, 3)
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// adiciona os eventos nas áreas de destino (a, b, c)
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

// eventos da área neutra (onde os itens começam)
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// funções dos itens
function dragStart(e) {
    e.currentTarget.classList.add('dragging'); // adiciona opacidade visual quando começa a arrastar
}
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging'); // volta ao normal quando solta
}

// funções das áreas de destino
function dragOver(e) {
    // só deixa soltar se a área estiver vazia
    if(e.currentTarget.querySelector('.item') === null) {
        e.preventDefault(); // libera o drop (comportamento padrão é bloquear)
        e.currentTarget.classList.add('hover'); // dá feedback visual (fundo escuro)
    }
}
function dragLeave(e) {
    e.currentTarget.classList.remove('hover'); // tira o feedback visual quando sai de cima
}
function drop(e) {
    e.currentTarget.classList.remove('hover');

    // se estiver vazio, faz a movimentação
    if(e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging'); // pega o item que tá sendo arrastado
        e.currentTarget.appendChild(dragItem); // move o elemento html pra dentro da área
        updateAreas(); // atualiza a lógica pra verificar se ganhou
    }
}

// funções da área neutra
function dragOverNeutral(e) {
    e.preventDefault(); // libera pra soltar de volta na caixa inicial
    e.currentTarget.classList.add('hover');
}
function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem); // devolve o item pra caixa inicial
    updateAreas();
}

// lógica pra validar o desafio
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML; // salva qual número tá em qual área
        } else {
            areas[name] = null;
        }
    });

    // verifica se a ordem é a, b, c => 1, 2, 3
    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct'); // pinta as bordas de verde
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}