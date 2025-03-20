const valor = document.querySelector("#valor");
const input = document.querySelector("#qtdChar");
valor.textContent = input.value;

input.addEventListener("input", (evento) => {
    valor.textContent = evento.target.value;
});


function pegarValores() {
    const tamanho = parseInt(valor.textContent); 
    const incluirNumeros = document.querySelector("#numeros").checked;
    const incluirSimbolos = document.querySelector("#simbolos").checked;
    const incluirLetras = document.querySelector("#letras").checked; 

    const senha = gerarSenha(incluirNumeros, incluirSimbolos, incluirLetras, tamanho);

    document.querySelector("#senha_txt").innerHTML = `A senha gerada é:<br>${senha}`;
}

function gerarSenha(incluirNumeros, incluirSimbolos, incluirLetras, tamanho) {
    let senhaGerada = "";

    while (senhaGerada.length < tamanho) {
        if (incluirNumeros && senhaGerada.length < tamanho) {
            senhaGerada += gerarNumeroAleatorio();
        }
        if (incluirSimbolos && senhaGerada.length < tamanho) {
            senhaGerada += gerarSimboloAleatorio();
        }
        if (incluirLetras && senhaGerada.length < tamanho) {
            senhaGerada += gerarLetraAleatoria(); 
        }
    }

    return senhaGerada.slice(0, tamanho);
}

function gerarNumeroAleatorio() {
    const numeros = "0123456789";
    return numeros[Math.floor(Math.random() * numeros.length)];
}

function gerarSimboloAleatorio() {
    const simbolos = "!@#$%^&*()_+[]{}|;:,.<>?";
    return simbolos[Math.floor(Math.random() * simbolos.length)];
}

function gerarLetraAleatoria() {
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    return letras[Math.floor(Math.random() * letras.length)];
}