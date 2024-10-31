import { criarGramatica } from "./scripts/capturarDados.js";
import { converterParaAutomato } from "./scripts/automato.js";
import { validarCadeia } from "./scripts/validaCadeia.js";

let gramatica;
let automato;

document.getElementById('gerar-gramatica').addEventListener('click', function() {
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    gramatica = criarGramatica(tabela);
    automato = converterParaAutomato(gramatica);
    const variaveis = document.getElementById('variaveis');
    const terminais = document.getElementById('terminais');

    variaveis.value = '';
    terminais.value = '';

    variaveis.value = automato.estados;

    Object.keys(automato.transicoes).forEach(transicao => {
        const chaves = Object.keys(automato.transicoes[transicao]);
        if (transicao !== '')
            terminais.value += chaves + ' , ';
        
    })

    //console.log(gramatica);
    //console.log(automato);
});

document.getElementById('capturar-cadeia').addEventListener('click', function(){
    let input = document.getElementById('cadeia');
    let cadeia = input.value;
    console.log(validarCadeia(automato, cadeia));
    if(validarCadeia(automato, cadeia)){
        input.classList.remove('invalido');
        input.classList.add('valido');
    } else {
        input.classList.remove('valido');
        input.classList.add('invalido');
    }
});

window.verificarUltimaLinha = function(input) {
    const linhaAtual = input.parentElement.parentElement;
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    const linhas = tabela.getElementsByTagName('tr');
    // Verifica se o input pertence à última linha
    if (linhaAtual === linhas[linhas.length - 1]) {
        adicionarNovaLinha();
    }
}

window.adicionarNovaLinha = function () {
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    const novaLinha = document.createElement('tr');
    
    // Cria duas colunas com inputs
    for (let i = 0; i < 2; i++) {
        const novaColuna = document.createElement('td');
        const novoInput = document.createElement('input');
        novoInput.type = 'text';
        novoInput.onfocus = function() { verificarUltimaLinha(this); };
        novaColuna.appendChild(novoInput);
        novaLinha.appendChild(novaColuna);
    }

    tabela.appendChild(novaLinha);
}