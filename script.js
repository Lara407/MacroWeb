const listaCards = document.getElementById("cards-container");
const cards = document.querySelectorAll(".card");
const btnDireita = document.getElementById("btn-direita");
const btnEsquerda = document.getElementById("btn-esquerda");
const botoesFiltro = document.querySelectorAll(".btn-filtro");
const botoesModal = document.querySelectorAll(".btn-saiba-mais");
const modais = document.querySelectorAll(".modal");
let pesquisa = document.querySelector("#pesquisa")
const semResultado = document.getElementById("sem-resultado");


const GAP_CARDS = 30;
const LARGURA_CARD = 270 + GAP_CARDS;

let posicao = 0

function maximoCarrossel(){
    const visiveis = listaCards.querySelectorAll(".card:not(.escondido)").length;
    return visiveis * LARGURA_CARD - GAP_CARDS - listaCards.clientWidth;
}

function moverCards(direcao){
    const maximo = maximoCarrossel()
    posicao += direcao * LARGURA_CARD;
    
    if(posicao > maximo){posicao = maximo}
    if(posicao < 0){posicao = 0}
    
    cards.forEach(function(c){
        c.style.transform = `translateX(${-posicao}px)`
    })
    verificarSetas();
}

function verificarSetas(){
    const maximo = maximoCarrossel();

    if(posicao <= 0){btnEsquerda.style.display = "none"} 
    else{btnEsquerda.style.display = "block"}

    if(posicao >= maximo){btnDireita.style.display = "none"}
    else{btnDireita.style.display = "block"}
}

btnDireita.addEventListener("click", function(){ moverCards(1)});
btnEsquerda.addEventListener("click", function() {moverCards(-1)});

verificarSetas()

botoesFiltro.forEach(function(botao){
    botao.addEventListener("click", function(){
        botoesFiltro.forEach(function(botaoFiltro){
            botaoFiltro.classList.remove("ativo")
        })
        botao.classList.add("ativo")

        cards.forEach(function(card){
        if(botao.id === "todos" || card.classList.contains(botao.id)){
            card.classList.remove("escondido")
        }
        else{
            card.classList.add("escondido")}
        })
        
        posicao = 0;
        
        cards.forEach(function(c){
            c.style.transform = "translateX(0)";
        });
        verificarSetas();
    })
})

botoesModal.forEach(function(botao){
    botao.addEventListener("click", function(){
        modais.forEach(function(modal){
            if(modal.classList.contains(botao.id)){
                modal.classList.add("aberto");
            }
        });
    });
});

modais.forEach(function(modal){
    modal.querySelector(".modal-fechar").addEventListener("click", function(){
        modal.classList.remove("aberto");
    });
    modal.querySelector(".modal-fundo").addEventListener("click", function(){
        modal.classList.remove("aberto");
    });
});

pesquisa.addEventListener("input", function(){
    let texto = pesquisa.value.toLowerCase()
    let encontrados = 0;

    botoesFiltro.forEach(function(botao){
        botao.classList.remove("ativo");
    });
    document.getElementById("todos").classList.add("ativo");

    cards.forEach(function(card){
        
        const idBotao = card.querySelector(".btn-saiba-mais").id;
        const modal = document.querySelector("." + idBotao);

        const conteudo = (card.innerHTML + modal.innerHTML).toLowerCase();

        if(conteudo.includes(texto)){
            card.classList.remove("escondido");
            encontrados++;
        }
        else{
            card.classList.add("escondido");
        }
    });

    if(encontrados === 0){
        semResultado.classList.remove("escondido")
    }
    else{
        semResultado.classList.add("escondido")
    }

    posicao = 0;
    cards.forEach(function(c){
        c.style.transform = "translateX(0)";
    });
    verificarSetas();

})