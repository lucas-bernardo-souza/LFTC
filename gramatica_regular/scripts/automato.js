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
                automato.estadosFinais.push('final');
            }
        }
    }

    return automato;
}

export {converterParaAutomato};