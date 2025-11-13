document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase()); // event.code pega o codigo da tecla apertada, toLowerCase transforma tudo em minusculo
});

document.querySelector('.composer button').addEventListener('click', () => { // seleciona o botao dentro da classe composer, () => significa que e uma funcao anonima que serve pra executar o codigo quando o botao for clicado
    let song = document.querySelector('#input').value;
    
    if(song !== ''){ // verifica se o input nao esta vazio
        let songArray = song.split(''); // split separa a string em um array, cada letra vira um item do array
        playComposition(songArray); // chama a funcao playComposition passando o array de notas
    }
});

function playComposition(songArray) {
    let wait = 0;

    for(let songItem of songArray) { // para cada item da musica ele vai executar o bloco de codigo
        
        setTimeout(()=>{ // ()=> siginifica que e uma funcao anonima, ou seja, sem nome, ela serve para executar o codigo depois de um tempo determinado
            playSound(`key${songItem}`);
        }, wait);
        
        wait += 250; // aumenta o tempo de espera a cada iteração, ou seja, a cada nota da musica ele espera 250 milisegundos para tocar a proxima nota
    }
}

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`); // seleciona o elemento de audio com o id correspondente ao som
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement) {
        audioElement.play();
        audioElement.currentTime = 0; // tira a limitacao de apertar mais de uma tecla
    }

    if(keyElement){
        keyElement.classList.add('active'); // adiciona a classe active ao elemento da tecla

        setTimeout(()=>{ // remove a classe active depois de 300 milisegundos
            keyElement.classList.remove('active');
        }, 300); // 300 milisegundos
    }
}