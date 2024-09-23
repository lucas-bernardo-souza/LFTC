import { criarGramatica } from "./scripts/capturarDados.js";
import { converterParaAutomato } from "./scripts/automato.js";
import { validarCadeia } from "./scripts/validaCadeia.js";

let gramatica;
let automato;

document.getElementById('botao-enviar').addEventListener('click', function() {
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    gramatica = criarGramatica(tabela);
    automato = converterParaAutomato(gramatica);
    console.log(gramatica);
    console.log(automato);
});

document.getElementById('capturar-cadeia').addEventListener('click', function(){
    let inputCadeia = document.getElementById('cadeia').value;
    console.log(validarCadeia(automato, inputCadeia));
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