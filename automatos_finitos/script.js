import {jsPlumb} from "jsplumb";

// Inicializando jsPlumb na div container
jsPlumb.ready(() => {
    const instance = jsPlumb.getInstance({
        Connector: "Straight",
        Endpoint: "Dot",
        PaintStyle: {stroke: "#5c96bc", strokeWidth: 2},
        EndpointHoverStyle: {fill: "5c96bc", radius: 5},
    });

    instance.setContainer("container");
});

function createState(id){
    const state = document.createElement("div");
    state.id = id;
    state.classList.add("state");
    state.style.position = "absolute"; // Necessário para mover no container
    state.innerText = id; // Nome do estado
    document.getElementById("container").appendChild(state);

    // Tornar o estado conectável
    jsPlumb.getInstance().draggable(state);
    jsPlumb.getInstance().makeSource(state, { filter: ".state", anchor: "Continuous" });
    jsPlumb.getInstance().makeTarget(state, { anchor: "Continuous" });
}

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("adicionar-estado");
    botao.addEventListener("click", addState());
});

function addState(){
    const nameState = document.getElementById("state").value;
    createState(nameState);
}
