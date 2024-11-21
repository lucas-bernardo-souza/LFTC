const automato = {
    estados: [],
    transicoes: {},
    estadoInicial: '',
    estadosFinais: []
};

// Captura dos estados
document.getElementById('adicionar-estado').addEventListener('click',()=>{

    const selectInitialState = document.getElementById('initialState');
    const selectFinalState = document.getElementById('finalState');

    const estado = document.getElementById('state');
    let nomeEstado = estado.value;
    automato.estados.push(nomeEstado);

    const optionElement = document.createElement('option');
    const element = document.createElement('option');
    element.value = nomeEstado;
    element.textContent = nomeEstado; 
    optionElement.value = nomeEstado;
    optionElement.textContent = nomeEstado;
    selectInitialState.appendChild(element);
    selectFinalState.appendChild(optionElement);

    estado.value = '';
    alert("Estado adicionado");
});

// Captura das transições
document.getElementById('adicionar-transicao').addEventListener('click', ()=>{
    
    const estadoInicial = document.getElementById('fromState');
    const estadoFinal = document.getElementById('toState');
    const simbolo = document.getElementById('symbol');

    let valorEstadoInicial = estadoInicial.value;
    let valorProximoEstado = estadoFinal.value;
    let valorSimbolo = simbolo.value;
    // Inicializa a tabela de transições para o estado inicial
    if (!automato.transicoes[valorEstadoInicial]) {
        automato.transicoes[valorEstadoInicial] = {};
    }
    automato.transicoes[valorEstadoInicial][valorSimbolo] = valorProximoEstado;
    estadoInicial.value = '';
    estadoFinal.value = '';
    simbolo.value = '';
    alert("Transição adicionada");
    console.log(automato);
});

function exibeAutomato(){
    const container = document.getElementById('container');

    const title = document.createElement("div");
    title.className = "automaton-title";
    title.textContent = "Autômato Finito";

    const statesSection = document.createElement("div");
    statesSection.className = "automaton-section";
    statesSection.innerHTML = `<div class="automaton-section-title">Estados:</div><ul>${automato.estados.map(estado => `<li>${estado}</li>`).join("")}</ul>`;
    
    const transitionsSection = document.createElement("div");
    transitionsSection.className = "automaton-section";
    const transitionsList = Object.entries(automato.transicoes).map(([estado, transicao]) =>
        `<li>${estado} ➝ ${Object.entries(transicao).map(([input, nextState])=> `${input}: ${nextState}`).join(",")}</li>`).join("");
    transitionsSection.innerHTML = `<div class="automaton-section-title">Transições:</div>
                                       <ul>${transitionsList}</ul>`;
    
    const initialStateSection = document.createElement("div");
    initialStateSection.className = "automaton-section";
    initialStateSection.innerHTML = `<div class="automaton-section-title">Estado Inicial:</div>
                                        <p>${automato.estadoInicial}</p>`;
    
    const finalStatesSection = document.createElement("div");
    finalStatesSection.className = "automaton-section";
    finalStatesSection.innerHTML = `<div class="automaton-section-title">Estados Finais:</div>
                                       <ul>${automato.estadosFinais.map(state => `<li>${state}</li>`).join("")}</ul>`;

    container.append(title, statesSection, transitionsSection, initialStateSection, finalStatesSection);

}

document.getElementById('adicionar-props').addEventListener('click', ()=>{
    const selectInitialState = document.getElementById('initialState');
    const selectFinalState = document.getElementById('finalState');

    const selectElements = Array.from(selectFinalState.selectedOptions).map(option => option.value);
    const selectElement = selectInitialState.value
    automato.estadoInicial = selectElement;
    automato.estadosFinais = selectElements;

    exibeAutomato();
    console.log(automato);
});

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
    if (automato.estadosFinais.includes(estadoAtual)){
        return true;
    } else {
        return false;
    }
}

document.getElementById('test-chain').addEventListener('click', ()=>{
    const characters = document.getElementById('characters');
    let chain = characters.value;
    console.log(chain);
    if(validarCadeia(chain)){
        alert("Cadeia aceita");
    } else {
        alert("Cadeia recusada");
    }
    characters.value = '';
})