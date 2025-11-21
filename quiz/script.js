// initial data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


// functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        // calcula a porcentagem pra barra
        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`; // atualiza a barra de progresso

        document.querySelector('.scoreArea').style.display = 'none'; // esconde a área de pontuação
        document.querySelector('.questionArea').style.display = 'block'; // mostra a área da pergunta

        document.querySelector('.question').innerHTML = q.question; // mostra a pergunta


        let optionsHtml = ''; // variável para guardar as opções
        for(let i in q.options) { // percorre as opções
            
            // cria o html da opção. o data-op guarda o índice
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`; 

        } 
        document.querySelector('.options').innerHTML = optionsHtml; // mostra as opções


        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        }); // adiciona o evento de clique em cada opção

    } else {
        // acabou as questões
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op')); // mostra no console a opção clicada, data-op siginifica "data-option"

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++; // conta os acertos
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    // calcula a pontuação
    let points = Math.floor((correctAnswers / questions.length) * 100);
    
    // aqui eu ajustei pra usar as classes que existem no seu html (scorePct e scoreText2)
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`; // mostra a porcentagem
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} perguntas e acertou ${correctAnswers}.`; // resumo

    // lógica das mensagens usando o scoreText1 que existe no html
    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Ruim, volta a estudar!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Mais ou menos';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70 && points < 100) {
        // adicionei o < 100 pra não conflitar com a perfeição
        document.querySelector('.scoreText1').innerHTML = 'Brabo demais!';
        document.querySelector('.scorePct').style.color = '#92d100ff';
    } else if(points === 100) {
        document.querySelector('.scoreText1').innerHTML = 'PERFEIÇÃO TOTAL!!!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scoreArea').style.display = 'block'; // mostra a área de pontuação
    document.querySelector('.questionArea').style.display = 'none'; // esconde a área da pergunta
    document.querySelector('.progress--bar').style.width = `100%`; // atualiza a barra de progresso para 100% no final
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}