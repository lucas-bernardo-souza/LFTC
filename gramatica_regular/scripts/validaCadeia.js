function validarCadeia(automato, cadeia){
    let estadoAtual = automato.estadoInicial;
    let proximoEstado;
    // Percorre a cadeia e verifica se a cadeia tem transições validas
    for(let i = 0; i < cadeia.length; i++){
        const simbolo = cadeia[i];
        proximoEstado = automato.transicoes[estadoAtual]?.[simbolo];
        console.log(proximoEstado);
        if(!proximoEstado){
            return false;
        } 
        estadoAtual = proximoEstado;
    }

    // Ao percorrer a cadeia e não retornar então 
    let simbolo = cadeia[cadeia.length - 1];
    if (automato.transicoes[proximoEstado][simbolo] === "final"){
        return true;
    } else {
        return false;
    }
}

export {validarCadeia};