const paginas = document.querySelectorAll(".pagina");
const links = document.querySelectorAll("nav a");

let progresso = 0;
let tempo = 1500;
let intervalo;
let premium = false;

/* DESAFIOS */
const desafios = [
    "Foque por 25 minutos sem distrações.",
    "Beba 2 litros de água hoje.",
    "Leia por 20 minutos.",
    "Evite redes sociais por 1 hora.",
    "Faça 15 minutos de alongamento.",
    "Organize suas tarefas da semana.",
    "Durma mais cedo hoje."
];

/* NAVEGAÇÃO */
function abrirPagina(id) {
    paginas.forEach(pagina => pagina.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");

    if (id === "dashboard") {
        gerarDesafio();
    }
}

links.forEach(link => {
    link.addEventListener("click", () => {
        const pagina = link.getAttribute("data-pagina");
        abrirPagina(pagina);
    });
});

/* LOGIN */
function login() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const idade = document.getElementById("idade").value;

    if (!nome || !email || !idade) {
        document.getElementById("mensagemLogin").innerText =
            "Preencha todos os campos.";
        return;
    }

    document.getElementById("mensagemLogin").innerText =
        `Bem-vinda, ${nome}!`;

    document.getElementById("usuarioLogado").innerText =
        `Usuária: ${nome} | ${email}`;

    abrirPagina("dashboard");
}

/* DESAFIO DIÁRIO */
function gerarDesafio() {
    const aleatorio = Math.floor(Math.random() * desafios.length);

    document.getElementById("desafio").innerText =
        desafios[aleatorio];
}

/* HUMOR */
function registrarHumor() {
    const humor = document.getElementById("humor").value;

    document.getElementById("resultadoHumor").innerText =
        `Humor registrado: ${humor}`;
}

/* TAREFAS */
function adicionarTarefa() {
    const tarefa = document.getElementById("novaTarefa").value;

    if (tarefa === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox" onchange="atualizarProgresso()">
        ${tarefa}
    `;

    document.getElementById("listaTarefas").appendChild(li);

    document.getElementById("novaTarefa").value = "";
}

/* PROGRESSO */
function atualizarProgresso() {
    const checks = document.querySelectorAll("#listaTarefas input");
    const concluidas = document.querySelectorAll("#listaTarefas input:checked");

    if (checks.length === 0) {
        document.getElementById("porcentagem").innerText =
            "Nenhuma tarefa concluída ainda";
        return;
    }

    progresso = Math.round((concluidas.length / checks.length) * 100);

    document.getElementById("barraProgresso").style.width =
        progresso + "%";

    document.getElementById("porcentagem").innerText =
        progresso + "% concluído";
}

/* TIMER */
function atualizarTimer() {
    let minutos = Math.floor(tempo / 60);
    let segundos = tempo % 60;

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    document.getElementById("timer").innerText =
        `${minutos}:${segundos}`;

    if (tempo > 0) {
        tempo--;
    } else {
        clearInterval(intervalo);
        alert("Tempo finalizado!");
    }
}

function iniciarTimer() {
    clearInterval(intervalo);
    intervalo = setInterval(atualizarTimer, 1000);
}

function pausarTimer() {
    clearInterval(intervalo);
}

function resetarTimer() {
    clearInterval(intervalo);
    tempo = 1500;
    atualizarTimer();
}

/* HÁBITOS */
function salvarHabitos() {
    const habitos = document.querySelectorAll(".habito");
    let feitos = 0;

    habitos.forEach(h => {
        if (h.checked) feitos++;
    });

    document.getElementById("resultadoHabitos").innerText =
        `${feitos} hábitos concluídos hoje.`;
}

/* PREMIUM */
function assinarPremium() {
    premium = true;

    document.getElementById("mensagemPremium").innerText =
        "Plano Premium ativado com sucesso!";
}

/* MODO ESCURO */
document.getElementById("modoBtn").addEventListener("click", () => {
    document.body.classList.toggle("escuro");
});

/* INICIALIZAÇÃO */
atualizarTimer();
gerarDesafio();