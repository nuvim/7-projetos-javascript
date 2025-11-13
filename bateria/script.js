document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase()); //transforma o nome do evento te tecla em minusculo, importante para o funcionamento dos audios
});

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value;
    
    if(song !== ''){
        let songArray = song.split('');
        playComposition(songArray);
    }
});

function playComposition(songArray) {
    let wait = 0;

    for(let songItem of songArray) { //loop dentro do array, percorre todo item do array
        
        setTimeout(()=>{
            playSound(`key${songItem}`);
        }, wait);
        
        wait += 250;
    }
}

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement) {
        audioElement.play();
        audioElement.currentTime = 0; // tira a limitacao de apertar mais de uma tecla
    }

    if(keyElement){
        keyElement.classList.add('active');

        setTimeout(()=>{
            keyElement.classList.remove('active');
        }, 300); // timeout que define quanto tempo o active fica no elemento, nesse caso ele fica 3 milisegundos
    }
}