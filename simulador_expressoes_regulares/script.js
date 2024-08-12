var inputExpressaoRegular;
var inputLinguagem;

function capturarDados() {
    inputExpressaoRegular = document.getElementById("campoExpressaoRegular")
    inputLinguagem = document.getElementById("campoLinguagem")
    if(inputExpressaoRegular.value == ""){
        return;
    }
    const expressaoRegular = new RegExp(inputExpressaoRegular.value);
    const linguagem = inputLinguagem.value;
    //console.log(expressaoRegular + "  " + linguagem);
    const valido = validarExpressao(expressaoRegular, linguagem);
    console.log(valido);
    if(valido){
        inputLinguagem.classList.remove("invalido");
        inputLinguagem.classList.add("valido");
    } else{
        inputLinguagem.classList.remove("valido");
        inputLinguagem.classList.add("invalido");
    }
}

function validarExpressao(valorExpressao, linguagem){
    //return valorExpressao == linguagem;
    const result = valorExpressao.test(linguagem);
    return result;
    /*
    if(valorExpressao.test(linguagem)){
        return true;
    } else {
        return false;
    }

    */
    
}

function mostrarVariaveis() {
    console.log(expressaoRegular + "  " + linguagem);
}