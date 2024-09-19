function validarCadeia(automato, cadeia){
    let estadoAtual = automato.estadoInicial;

    for(let i = 0; i < cadeia.length; i++){
        const simbolo = cadeia[i];
        const proximoEstado = automato.transicoes[estadoAtual]?.[simbolo];
        if(!proximoEstado){
            return false;
        } 
        estadoAtual = proximoEstado;
    }

    return automato.estadosFinais.has(estadoAtual);
}

export {validarCadeia};