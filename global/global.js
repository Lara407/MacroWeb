const escuro = document.getElementById("escuro");
const botaoHamburguer = document.getElementById("btn-hamburguer");
const menu = document.getElementById("menu");
const pagina = document.getElementById("pagina");
const painelConfig = document.getElementById("painel-config");
const botaoConfig = document.getElementById("btn-config");
const verCard = document.querySelectorAll(".card-ver")
const botaoVer = document.querySelectorAll(".btn-ver-mais-texto");
const botaoVerMenos = document.querySelectorAll(".btn-ver-menos-texto");
const paragrafoContainer = document.querySelectorAll(".paragrafo-container")

if(localStorage.getItem("tema") === "escuro"){
    pagina.classList.add("modo-escuro");
}

if(escuro){
    escuro.addEventListener("click", function(){
        const ativo = pagina.classList.toggle("modo-escuro");
        localStorage.setItem("tema", ativo ? "escuro" : "claro");
    });
}

botaoHamburguer.addEventListener("click", function(){
    menu.classList.toggle("aberto")
})

botaoConfig.addEventListener("click", function(){
    painelConfig.classList.toggle("aberto")
})

verCard.forEach(function(card){
    const container = card.querySelector(".paragrafo-container");
    const verMais = card.querySelector(".btn-ver-mais-texto");
    const verMenos = card.querySelector(".btn-ver-menos-texto");

    verMais.addEventListener("click", function(){
        container.classList.add("ver");
        verMais.classList.add("escondido");
        verMenos.classList.add("ver");
        verCard.classList.add("ver")
    });

    verMenos.addEventListener("click", function(){
        container.classList.remove("ver");
        verMais.classList.remove("escondido");
        verMenos.classList.remove("ver");
        verCard.classList.remove("ver")
    });
});