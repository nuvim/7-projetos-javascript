let digitalElement = document.querySelector('.digital'); // elemento do relógio digital
let sElement = document.querySelector('.p_s'); // elemento do ponteiro dos segundos
let mElement = document.querySelector('.p_m'); // elemento do ponteiro dos minutos
let hElement = document.querySelector('.p_h'); // elemento do ponteiro das horas

function updateClock() {
    let now = new Date(); // obtém a data e hora atual
    
    let hour = now.getHours(); // now.getHours() significa obter a hora atual, assim como os minutos e segundos
    let minute = now.getMinutes();
    let second = now.getSeconds();

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`; // atualiza o relógio digital com zeros à esquerda

    let sDeg = ((360 / 60) * second) - 90; // calcula o ângulo do ponteiro dos segundos
    let mDeg = ((360 / 60) * minute) - 90; // calcula o ângulo do ponteiro dos minutos
    let hDeg = ((360 / 12) * hour) - 90; // calcula o ângulo do ponteiro das horas

    sElement.style.transform = `rotate(${sDeg}deg)`; // aplica a rotação ao ponteiro dos segundos
    mElement.style.transform = `rotate(${mDeg}deg)`; // aplica a rotação ao ponteiro dos minutos
    hElement.style.transform = `rotate(${hDeg}deg)`; // aplica a rotação ao ponteiro das horas

    // .style.transform significa estilo de transformação, ou seja, aplicar uma transformação CSS ao elemento selecionado
}

function fixZero(time) {

//  if(time < 10) {
//      return '0' + time;  Retorna o valor com um zero à esquerda
//   } else {
//      return time;  Retorna o valor original se for 10 ou maior
// }

    return time < 10 ? '0' + time : time; // operador ternário para adicionar zero à esquerda, operador ternario é uma forma mais curta de escrever um if/else

}


setInterval(updateClock, 1000); // atualiza o relógio a cada 1 segundo
updateClock(); // chama a função imediatamente apra nao atrasar a execucao