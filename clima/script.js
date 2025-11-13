document.querySelector('.busca').addEventListener('submit', async (event) => { // previne o comportamento padrao do form ao apertar enter
  event.preventDefault(); // previne o comportamento padrao do form

  let input = document.querySelector('#searchInput').value; // pega o valor do input, .value significa valor do input

    if(input !== '') {
        clearInfo(); // limpa as informacoes anteriores
        showWarning('Carregando...'); // mostra a mensagem de carregando

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid={SUA_API_AQUI}&units=metric&lang=pt_br`; // encodeURI serve para codificar o valor do input, caso tenha espacos ou caracteres especiais
    // units=metric significa que a temperatura sera em Celsius, lang=pt_br significa que a lingua sera em portugues do brasil
        
    let results = await fetch(url); // fetch serve para fazer requisicoes HTTP, await significa esperar a resposta da requisicao
    let json = await results.json(); // .json() converte a resposta para JSON

    if(json.cod === 200) {
        showInfo({
            name: json.name, // nome da cidade
            country: json.sys.country, // pais da cidade
            temp: json.main.temp, // temperatura
            tempIcon: json.weather[0].icon, // icone do clima, o [0] significa o primeiro item do array
            windSpeed: json.wind.speed, // velocidade do vento
            windAngle: json.wind.deg // angulo do vento
        });
    }else{
        clearInfo();
        showWarning('Cidade não encontrada.'); // mostra a mensagem de cidade nao encontrada
    }
    }else{
        clearInfo();
    }
});


function showInfo(json) {
    showWarning(''); // limpa a mensagem de aviso


    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`; // atualiza o titulo com o nome da cidade e pais
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`; // atualiza a temperatura
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`; // atualiza a velocidade do vento

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`; // rotaciona o ponteiro do vento, -90 para ajustar a posicao inicial do ponteiro

    document.querySelector('.resultado').style.display = 'block'; // mostra o resultado, display block 
}


function clearInfo() {
    showWarning(''); // limpa a mensagem de aviso
    document.querySelector('.resultado').style.display = 'none'; // esconde o resultado
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg; // seleciona o elemento com a classe aviso e atualiza o conteudo HTML com a mensagem recebida
} //querySelector serve para selecionar elementos do DOM, dom significa Document Object Model, ou seja, a estrutura do documento HTML