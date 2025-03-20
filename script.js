const valor = document.querySelector("#valor");
const input = document.querySelector("#qtdChar");
// Definir valor inicial do range
input.value = 7; // Valor padrão de 7 caracteres
valor.textContent = input.value;

// Atualizar o valor do output sempre que o input mudar
input.addEventListener("input", (evento) => {
    valor.textContent = evento.target.value;
});

// Atualizar o valor do output quando a página carregar
window.addEventListener("load", () => {
    valor.textContent = input.value;
});

function pegarValores() {
    // Garantir que o valor do output esteja sincronizado com o input
    valor.textContent = input.value;
    
    let tamanho = parseInt(input.value);
    
    // Garantir que o tamanho seja válido
    if (isNaN(tamanho) || tamanho < 1) {
        tamanho = 7; // Valor padrão se inválido
    }
    
    const incluirNumeros = document.querySelector("#numeros").checked;
    const incluirSimbolos = document.querySelector("#simbolos").checked;
    const incluirLetras = document.querySelector("#letras").checked; 

    const senha = gerarSenha(incluirNumeros, incluirSimbolos, incluirLetras, tamanho);

    document.querySelector("#senha_txt").innerHTML = `A senha gerada é:<br>${senha}`;
}

function gerarSenha(incluirNumeros, incluirSimbolos, incluirLetras, tamanho) {
    let senhaGerada = "";
    let caracteresDisponiveis = [];

    // Criar array com todos os caracteres disponíveis baseado nas opções selecionadas
    if (incluirNumeros) {
        caracteresDisponiveis = caracteresDisponiveis.concat("0123456789".split(""));
    }
    if (incluirSimbolos) {
        caracteresDisponiveis = caracteresDisponiveis.concat("!@#$%^&*()_+[]{}|;:,.<>?".split(""));
    }
    if (incluirLetras) {
        caracteresDisponiveis = caracteresDisponiveis.concat("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    }

    // Se nenhuma opção foi selecionada, usar letras por padrão
    if (caracteresDisponiveis.length === 0) {
        caracteresDisponiveis = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    }

    // Gerar senha com o tamanho exato solicitado
    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresDisponiveis.length);
        senhaGerada += caracteresDisponiveis[indiceAleatorio];
    }

    return senhaGerada;
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