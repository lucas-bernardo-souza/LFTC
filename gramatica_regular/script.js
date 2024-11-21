let gramatica;

const automato = {
    estados: [],
    transicoes: {},
    estadoInicial: '',
    estadosFinais: []
};

// A gramática que é recebida como parâmetro deve ser um objeto
function converterParaAutomato(gramatica){
    const lhsKeys = Object.keys(gramatica);
    automato.estadoInicial = lhsKeys[0];  // O estado inicial é o primeiro LHS
  
    for (let i = 0; i < lhsKeys.length; i++) {
        const lhs = lhsKeys[i];
        
        // Adiciona o LHS (não-terminal) à lista de estados
        automato.estados.push(lhs);
        
        const rhsProducoes = gramatica[lhs];
        for (let j = 0; j < rhsProducoes.length; j++) {
            const producao = rhsProducoes[j];
            // A gramática deve ser linear a direita
            const simbolo = producao[0];  // O primeiro símbolo é o terminal

            // Verifica se a produção leva a um estado (não-terminal)
            let proximoEstado;
            if(producao.length > 1){
                proximoEstado = producao[1];
            } else {
                proximoEstado = null;
            }
            
            // Inicializa a tabela de transições para o estado atual (lhs)
            if (!automato.transicoes[lhs]) {
                automato.transicoes[lhs] = {};
            }
            
            // Adiciona a transição para o próximo estado (se houver)
            if (proximoEstado) {
                automato.transicoes[lhs][simbolo] = proximoEstado;
            } else {
                // Se não há próximo estado, o próximo estado é final
                automato.transicoes[lhs][simbolo] = 'final';
                automato.estadosFinais.push(lhs);
            }
        }
    }

    return;
}

function criarGramatica(tabela){
    const linhas = tabela.querySelectorAll('tbody tr');
    
    let gramatica = {};

    for(let i = 0; i < linhas.length; i++){
        let colunas = linhas[i].getElementsByTagName('td');
        // LHS são os não terminais
        let lhs = colunas[0].getElementsByTagName('input')[0].value.trim();
        
        let rhs = colunas[1].getElementsByTagName('input')[0].value.split('|').map(regra => regra.trim());
        gramatica[lhs] = rhs;
    }

    return gramatica;
}

function validarCadeia(cadeia){
    let estadoAtual = automato.estadoInicial;
    let proximoEstado;
    // Percorre a cadeia e verifica se a cadeia tem transições validas
    for(let i = 0; i < cadeia.length; i++){
        const simbolo = cadeia[i];
        proximoEstado = automato.transicoes[estadoAtual]?.[simbolo];
        //console.log(proximoEstado);
        if(!proximoEstado){
            return false;
        } 
        estadoAtual = proximoEstado;
    }

    console.log(estadoAtual);
    // Ao percorrer a cadeia e não retornar então 
    let simbolo = cadeia[cadeia.length - 1];
    if (estadoAtual == "final"){
        return true;
    } else {
        return false;
    }
}

document.getElementById('gerar-gramatica').addEventListener('click', function() {
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    gramatica = criarGramatica(tabela);
    converterParaAutomato(gramatica);
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
    if(validarCadeia(cadeia)){
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