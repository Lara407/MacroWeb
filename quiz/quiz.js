const telaInicio = document.getElementById("tela-inicio");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");
const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnRefazer = document.getElementById("btn-refazer");
const numeroPergunta = document.getElementById("numero-pergunta");
const totalPerguntas = document.getElementById("total-perguntas");
const barraProgresso = document.getElementById("barra-progresso");
const categoriaPergunta = document.getElementById("categoria-pergunta");
const textoPergunta = document.getElementById("texto-pergunta");
const opcoes = document.querySelectorAll(".opcao");
const pontuacaoTela = document.getElementById("pontuacao");
const totalFinal = document.getElementById("total-final");
const mensagemResultado = document.getElementById("mensagem-resultado");
const acertosTela = document.getElementById("acertos");
const errosTela = document.getElementById("erros");

let cardAtual = 0;
let acertos = 0;
let respondeu = false;

//O "CORRETA" NA LISTA É A LOCALIZAÇÃO DA RESPOSTA DA QUESTÃO, (0 = A, 1 = B, 2 = C,...)

const perguntas = [
    {
        categoria: "Carboidratos",
        texto: "Qual é o principal papel dos carboidratos nos seres vivos?",
        alternativas: [
            "Fonte de energia",
            "Transmitir a informação genética",
            "Formar anticorpos",
            "Isolar termicamente o corpo",
            "Catalisar reações químicas"
        ],
        correta: 0
    },
    {
        categoria: "Lipídios",
        texto: "Qual é uma das principais funções dos lipídios?",
        alternativas: [
            "Transportar oxigênio.",
            "Produzir anticorpos.",
            "Armazenar energia.",
            "Formar células sanguíneas.",
            "Nenhuma."
        ],
        correta: 2
    },
    {
        categoria: "Carboidratos",
        texto: "Qual alimento é uma importante fonte de carboidratos?",
        alternativas: [
            "Carne.",
            "Peixe.",
            "Ovo.",
            "Azeite.",
            "Pão."
        ],
        correta: 4
    },
    {
        categoria: "Proteínas",
        texto: "Qual é uma das principais funções das proteínas?",
        alternativas: [
            "Armazenar informações genéticas.",
            "Construir e reparar tecidos.",
            "Formar apenas gorduras.",
            "Produzir água.",
            "Armazenar oxigênio nos alimentos."
        ],
        correta: 1
    },
    {
        categoria: "Polímeros",
        texto: "O que são polímeros?",
        alternativas: [
            "Moléculas formadas apenas por água.",
            "Moléculas grandes formadas pela união de unidades menores.",
            "Substâncias que possuem somente minerais.",
            "Elementos químicos isolados.",
            "Moléculas que não possuem carbono."
        ],
        correta: 1
    },
    {
        categoria: "Polímeros",
        texto: "Qual alternativa apresenta um polímero natural?",
        alternativas: [
            "Polietileno.",
            "PVC.",
            "Nylon.",
            "Celulose.",
            "Poliestireno."
        ],
        correta: 3
    },
    {
        categoria: "Ácidos nucleicos",
        texto: "Quais são os dois principais tipos de ácidos nucleicos?",
        alternativas: [
            "Glicose e frutose.",
            "DNA e RNA.",
            "Amido e celulose.",
            "Proteínas e lipídios.",
            "Água e sais minerais."
        ],
        correta: 1
    },
    {
        categoria: "Ácidos nucleicos",
        texto: "Qual é a principal função do DNA?",
        alternativas: [
            "Fornecer energia.",
            "Construir músculos.",
            "Armazenar informações genéticas.",
            "Transportar gorduras.",
            "Produzir vitaminas."
        ],
        correta: 2
    },
    {
        categoria: "Ácidos nucleicos",
        texto: "Qual base nitrogenada está presente no RNA e não no DNA?",
        alternativas: [
            "Adenina.",
            "Timina.",
            "Citosina.",
            "Guanina.",
            "Uracila."
        ],
        correta: 4
    },
    {
        categoria: "Lipídios",
        texto: "Por que os lipídios não se misturam facilmente com a água?",
        alternativas: [
            "Porque são hidrofóbicos.",
            "Porque são açúcares.",
            "Porque são proteínas.",
            "Porque são minerais.",
            "Porque são solúveis em água."
        ],
        correta: 0
    },
]

function iniciarQuiz(){
    cardAtual = 0;
    acertos = 0;

    perguntas.sort(function(){
        return Math.random()-0.5;
    });

    telaInicio.classList.add("escondido");
    telaResultado.classList.add("escondido");
    telaQuiz.classList.remove("escondido");

    mostrarPergunta();

    window.scrollTo(0, 0);
}

btnIniciar.addEventListener("click", iniciarQuiz);
btnRefazer.addEventListener("click", iniciarQuiz);


function mostrarPergunta(){
    const pergunta = perguntas[cardAtual];
    respondeu = false;

    numeroPergunta.textContent = cardAtual + 1;
    totalPerguntas.textContent = perguntas.length;
    categoriaPergunta.textContent = pergunta.categoria;
    textoPergunta.textContent = pergunta.texto;

    barraProgresso.style.width = ((cardAtual + 1) / perguntas.length * 100) + "%";

    opcoes.forEach(function(opcao, indice){
        opcao.querySelector(".texto-opcao").textContent = pergunta.alternativas[indice];
        opcao.classList.remove("correta");
        opcao.classList.remove("errada");
    });

    btnProxima.classList.add("escondido");
}

function responder(indiceEscolhido){
    if(respondeu){return}  
    respondeu = true;

    const pergunta = perguntas[cardAtual];

    if(indiceEscolhido === pergunta.correta){
        acertos++;
        opcoes[indiceEscolhido].classList.add("correta");
    }
    else{
        opcoes[indiceEscolhido].classList.add("errada");
        opcoes[pergunta.correta].classList.add("correta");
    }

    btnProxima.classList.remove("escondido");
}


opcoes.forEach(function(opcao, indice){
    opcao.addEventListener("click", function(){
        responder(indice);
    });
});

btnProxima.addEventListener("click", function(){
    cardAtual++;

    if(cardAtual < perguntas.length){
        mostrarPergunta();
    }
    else{
        mostrarResultado();
    }
});

function mostrarResultado(){
    telaQuiz.classList.add("escondido");
    telaResultado.classList.remove("escondido");

    const erros = perguntas.length - acertos;

    pontuacaoTela.textContent = acertos;
    totalFinal.textContent = perguntas.length;
    acertosTela.textContent = acertos;
    errosTela.textContent = erros;

    if(acertos === perguntas.length){
        mensagemResultado.textContent = "Perfeito! Você acertou tudo!";
    }
    else if(acertos >= perguntas.length / 2){
        mensagemResultado.textContent = "Muito bem! Mas vale revisar alguns temas.";
    }
    else{
        mensagemResultado.textContent = "Continue estudando, você chega lá!";
    }
}
opcoes.forEach(function(opcao, indice){
    opcao.addEventListener("click", function(){
        responder(indice);
    });
});

btnProxima.addEventListener("click", function(){
    cardAtual++;

    if(cardAtual < perguntas.length){
        mostrarPergunta();
    }
    else{
        mostrarResultado();
    }
});