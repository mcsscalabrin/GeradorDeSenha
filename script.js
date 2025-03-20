const valor = document.querySelector("#valor");
const input = document.querySelector("#qtdChar");
// Definir valor inicial para o centro do slider (8)
input.value = 8;
valor.textContent = input.value;

// Função para atualizar o preenchimento do slider
function atualizarSlider(e) {
    const target = e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;
    
    // Atualiza o background com o gradiente
    const percentage = (val - min) * 100 / (max - min);
    target.style.background = `linear-gradient(to right, #667eea ${percentage}%, #e2e8f0 ${percentage}%)`;
}

// Atualizar o valor do output e o preenchimento sempre que o input mudar
input.addEventListener("input", (evento) => {
    valor.textContent = evento.target.value;
    atualizarSlider(evento);
});

// Atualizar o valor do output e o preenchimento quando a página carregar
window.addEventListener("load", () => {
    valor.textContent = input.value;
    atualizarSlider({ target: input });
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

    const senhaDisplay = document.querySelector(".password-display");
    senhaDisplay.textContent = senha;
    document.querySelector("#senha_txt").querySelector("button").classList.remove("copied");
}

async function copiarSenha() {
    const senhaDisplay = document.querySelector(".password-display");
    const senha = senhaDisplay.textContent;
    
    if (senha) {
        try {
            await navigator.clipboard.writeText(senha);
            const btnCopiar = document.querySelector(".copy-btn");
            btnCopiar.classList.add("copied");
            btnCopiar.textContent = "Copiado!";
            
            // Reverter o botão após 2 segundos
            setTimeout(() => {
                btnCopiar.classList.remove("copied");
                btnCopiar.textContent = "Copiar Senha";
            }, 2000);
        } catch (err) {
            console.error('Erro ao copiar senha:', err);
        }
    }
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