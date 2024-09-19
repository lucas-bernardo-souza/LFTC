function criarGramatica(tabela){
    const linhas = tabela.querySelectorAll('tbody tr');
    
    let gramatica = {};

    for(let i = 0; i < linhas.length; i++){
        let colunas = linhas[i].getElementsByTagName('td');

        let lhs = colunas[0].getElementsByTagName('input')[0].value.trim();

        let rhs = colunas[1].getElementsByTagName('input')[0].value.split('|').map(regra => regra.trim());
        gramatica[lhs] = rhs;
    }

    return gramatica;
}

export {criarGramatica};