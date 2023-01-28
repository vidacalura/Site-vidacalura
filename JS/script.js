import { arquivos } from "./arquivos.js";

let terminalTextbox, terminalPathText = "/home/guest", terminalHistory = [], comandosVoltados = 0;
const main = document.querySelector("main");

const dirTree = {
    // "/": {
    "home": {
        "guest": {
            "Desktop": ["bonzitalk.txt", "mybooklist.txt"], 
            "Documents": ["curriculo.pdf", "aboutme.txt"],
            "Downloads": ["truco-cli.txt", "jeek-online.txt"],
            "Music": ["randm.txt"],
            "Pictures": null, // pasta de imgs
            "Public": null,
            "Templates": null,
            "Videos": null // Hello, I'm Linus Torvalds
        }
    },
    // }
};

executarComando("neofetch");
helpTexto();

criarLinha();
focarTerminal();

window.addEventListener("click", () => { 
    focarTerminal();
});


function executarComando(comando){

    const argv = comando.split(" ");

    const comandos = {
        vidacalura() {
            if (argv[1] == "--help" || argv[1] == '-h') {
                printTerminal(" \
                Comandos: <br> <br> \
                ls &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mostra os arquivos e pastas de um diretório <br> \
                cd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Entra em um diretório <br> \
                pwd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retorna o local da árvore de arquivos em que o usuário está <br> \
                echo &nbsp;&nbsp;&nbsp;&nbsp;Retorna algum texto dado pelo usuário <br> \
                cat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retorna os conteúdos de um arquivo (.txt, .md, .pdf) <br> \
                neofetch Retorna algumas informações do sistema operacional <br> \
                history &nbsp;Retorna o histórico de todos os comandos rodados na última sessão <br> \
                clear &nbsp;&nbsp;&nbsp;Limpa o terminal <br> \
                reboot &nbsp;&nbsp;Reinicia o sistema <br> \
                shutdown Desliga o sistema <br> \
                ");
            }
        },

        ls() {
            const caminhoArr = terminalPathText.split("/");

            if (!argv[1] || argv[1][0] == "-" || argv[1] == ".") {
                if (caminhoArr.length == 2) {
                    Object.entries(dirTree[caminhoArr[1]]).forEach((arq) => {
                        printTerminal(arq[0], ["blue", "bold"]);
                    });
                }
                else if (caminhoArr.length == 3) {
                    Object.entries(dirTree["home"][caminhoArr[2]]).forEach((arq) => {
                        printTerminal(arq[0], ["blue", "bold"]);
                    });
                }
                else {
                    if (dirTree["home"]["guest"][caminhoArr[3]] != null) {
                        dirTree["home"]["guest"][caminhoArr[3]].forEach((arq) => {
                            printTerminal(arq, ["green"]);
                        });
                    }
                }
            }
            else {
                let caminho = dirTree;

                if (argv[1][0] != '/') {
                    argv[1] = terminalPathText + "/" + argv[1];
                }

                for (const pasta of argv[1].split("/")) {
                    if (pasta != '')
                        caminho = caminho[pasta];
                }

                if (caminho === undefined) {
                    printTerminal(`ls: não foi possível acessar ${argv[1]}: pasta ou arquivo não existe`);
                }
                else if (caminho === null) {
                    printTerminal("&nbsp;");
                }
                else {
                    if (Array.isArray(caminho)){
                        Object.entries(caminho).forEach((arq) => {
                            printTerminal(arq[1], ["green", "bold"]);
                        });
                    }
                    else {
                        Object.entries(caminho).forEach((arq) => {
                            printTerminal(arq[0], ["blue", "bold"]);
                        });
                    }
                }
            }
        },

        cd() {
            const pastaAtual = terminalPathText.split("/")[terminalPathText.split("/").length - 1];
            
            if (!argv[1]) {
                terminalPathText = "/home/guest";
            }
            else if (argv[1] == "." || argv[1] == "./") { }
            else {
                if (argv[1] == ".." || argv[1] == "../") {
                    if (terminalPathText != "/home"){
                        terminalPathText = terminalPathText.split("/");
                        terminalPathText.pop();
                        terminalPathText = terminalPathText.join("/");
                    }
                    else {
                        printTerminal("Permissão negada");
                    }
                }
                else if (argv[1] == "/") {
                    printTerminal("Permissão negada");
                }
                else {
                    let dirFound = false;
                    const terminalPathTextSave = terminalPathText;

                    // Se o argumento for um caminho absoluto
                    if (argv[1] == "/home") {
                        terminalPathText = "/home";
                        dirFound = true;
                    }
                    else if (argv[1].slice(0, 5) == "/home") {
                        terminalPathText = argv[1].split("/").slice(0, -1).join("/");
                        argv[1] = argv[1].split("/").pop();
                    }

                    const caminhoArr = terminalPathText.split("/");

                    // Se houver 2 argumentos (guest/Document)
                    if (argv[1].split("/").length == 2) {
                        // fazer
                    }

                    // Remove a '/'
                    if (argv[1][argv[1].length - 1] == '/') {
                        argv[1] = argv[1].slice(0, -1);
                    }

                    if (caminhoArr.length == 2) {
                        Object.entries(dirTree[caminhoArr[1]]).forEach((arq) => {
                            if (arq[0] == argv[1]) {
                                terminalPathText += "/" + argv[1];
                                dirFound = true;
                            }
                        });
                    }
                    else if (caminhoArr.length == 3) {
                        Object.entries(dirTree[caminhoArr[1]][caminhoArr[2]]).forEach((arq) => {
                            if (arq[0] == argv[1]) {
                                terminalPathText += "/" + argv[1];
                                dirFound = true;
                            }
                        });
                    }
                    else {
                        Object.entries(dirTree[caminhoArr[1]][caminhoArr[2]][caminhoArr[3]]).forEach((arq) => {
                            if (arq[0] == argv[1]) {
                                terminalPathText += "/" + argv[1];
                                dirFound = true;
                            }
                        });
                    }

                    if (dirFound == false) {
                        printTerminal(`cd: pasta não encontrada: ${argv[1]}`);
                        terminalPathText = terminalPathTextSave;
                    }
                }
            }

        },

        pwd() {
            printTerminal(terminalPathText);
        },

        echo() {
            if (argv[1]){
                if (argv[1][0] == '"' && comando[comando.length - 1] == '"'){
                    printTerminal(comando.slice(comando.indexOf('"') + 1, comando.length - 1));
                }
                else{
                    printTerminal(comando.slice(5).trim());
                }
            }
            else {
                printTerminal("&nbsp;");
            }
        },

        cat() {
            if (argv[1]) {
                let caminhoArquivo = "";

                // Se caminho não for absoluto
                if (argv[1].split("/").length == 1 || argv[1][0] != "/") {
                    caminhoArquivo = `${terminalPathText}/${argv[1]}`;
                }
                else {
                    caminhoArquivo = argv[1];
                }

                // Verificar existência de arquivo na pasta
                let caminho = dirTree;
                for (const pasta of caminhoArquivo.split("/").slice(0, -1)) {
                    if (pasta != '')
                        caminho = caminho[pasta];
                }

                if (!caminho) {
                    printTerminal(`ls: não foi possível acessar ${argv[1]}: pasta ou arquivo não existe`);
                }
                else {
                    const arquivoNome = caminhoArquivo.split("/")[caminhoArquivo.split("/").length - 1]
                    const arquivoExiste = caminho.includes(arquivoNome);

                    if (arquivoExiste){
                        if (arquivoNome == "curriculo.pdf") {
                            window.location.href = "archives/curriculo.pdf";
                        }

                        printTerminal(arquivos[arquivoNome]);
                    }
                    else {
                        printTerminal(`cat: ${argv[1]}: arquivo não existe`);
                    }
                }
                    
            }
            else {
                printTerminal(`cat: ${argv[1]}: arquivo não existe`);
            }
        },

        neofetch() {
            const container = document.createElement("div");
            container.classList.add("flex");

            const imgNeofetch = document.createElement("img");
            imgNeofetch.src = "imgs/arch.webp";
            imgNeofetch.style.width = "25%";

            const textContainer = document.createElement("div");
            textContainer.style.width = "75%";
            textContainer.style.padding = "0rem 1rem";

            textContainer.innerHTML = 
            `guest@vidacaluraportfolio` + "<br>" +
            `-------------------------` + "<br>" +
            `Navegador: ${navigator.userAgent}` + "<br>" +
            `Host: GitHub` + "<br>" +
            `Resolução: ${window.innerWidth}x${window.innerHeight}` + "<br>" +
            `Fonte do terminal: Source Code Pro`;

            container.style.padding = "1rem 0px";
            container.appendChild(imgNeofetch);
            container.appendChild(textContainer);

            main.appendChild(container);
        },

        // mv() { },
        // man() { },
        // htop() / 8top { },
        // feh() / fé { },

        history() {
            for (let i = 0; i < terminalHistory.length - 1; i++){
                printTerminal(`${i} ${terminalHistory[i]}`);
            }
        },

        clear() {
            limparTerminal();
        },

        reboot() {
            comandos.clear();
            window.location.reload();
        },

        shutdown() {
            if (!argv[1]){
                printTerminal("Desligando em 60 segundos");
                setTimeout(() => {
                    window.close();
                }, 60000);
            }
            else if (argv[1] == "now") {
                window.close();
            }
            else {
                const timeOut = Number(argv[1]);
                if (timeOut) {
                    const timeOutEmSegundos = timeOut * 1000;
                    printTerminal(`Desligando em ${timeOutEmSegundos} segundos`);
                    setTimeout(() => {
                        window.close();
                    }, timeOutEmSegundos);
                }
            }
        },

        sudo() {
            printTerminal("Permissão negada");
        }
    }

    if (comandos[argv[0]] != null){
        if (argv[1]){
            argv[1] = argv[1].replace("~", "/home/guest");
            argv[1] = argv[1].replace("./", "");
        }

        comandos[argv[0]]();
    }
    else {
        printTerminal(`Comando não encontrado: ${argv[0]}`);
    }

    comandosVoltados = 0;

}

function criarLinha(){
    const inputTerminalDiv = document.createElement("div");
    inputTerminalDiv.classList.add("flex");
    inputTerminalDiv.classList.add("terminal-input");

    terminalTextbox = "";
    terminalTextbox = document.createElement("input");
    terminalTextbox.type = "text";
    terminalTextbox.spellcheck = false;
    terminalTextbox.classList.add("terminal-textbox");

    terminalTextbox.addEventListener("keydown", (e) => {
        if (e.key == "Enter"){
            terminalHistory.push(terminalTextbox.value);

            // salvarLinha();
            executarComando(terminalTextbox.value);
            criarLinha();
        }
        else if (e.key == "ArrowUp"){
            e.preventDefault();

            voltarComando();
        }
        else if (e.key == "ArrowDown"){
            e.preventDefault();

            avancarComando();
        }
    });

    inputTerminalDiv.innerHTML = ` \
    <label class="terminal-user" for="terminal-textbox"> guest@vidacaluraportfolio </label> \
    <div id="" class="terminal-info flex"> : <p class="terminal-path"> ${terminalPathText.replace("/home/guest", "~")} \
    </p> $ </div> \
    `;

    inputTerminalDiv.appendChild(terminalTextbox);
    main.appendChild(inputTerminalDiv);

    focarTerminal();
}

function focarTerminal(){
    terminalTextbox.focus();
}

function voltarComando(){
    if (comandosVoltados < terminalHistory.length){
        comandosVoltados++;

        terminalTextbox.value = terminalHistory[terminalHistory.length - comandosVoltados];
    }
}

function avancarComando(){
    if (comandosVoltados > 0){
        comandosVoltados--;
        
        terminalTextbox.value = terminalHistory[terminalHistory.length - comandosVoltados];

        if (comandosVoltados == 0){
            terminalTextbox.value = "";
        }
    }
}

function printTerminal(texto, textStyles){
    const p = document.createElement("p");
    p.innerHTML = texto;

    if (Array.isArray(textStyles)) {
        if (textStyles.includes("bold")) {
            p.style.fontWeight = "bold";
        }

        if (textStyles.includes("green")) {
            p.style.color = "#B6E2A1";
        }
        else if (textStyles.includes("blue")) {
            p.style.color = "#A0C3D2";
        }
    }

    main.appendChild(p);
}

function helpTexto() {
    const codigoFonte = document.createElement("a");
    codigoFonte.textContent = "Código fonte - Github";
    codigoFonte.href = "https://github.com/vidacalura/Site-vidacalura";
    codigoFonte.target = "_blank";

    const helpP = document.createElement("p");
    helpP.textContent = "Para mais informações use 'vidacalura --help'";
    helpP.classList.add("help-texto");

    main.appendChild(codigoFonte);
    main.appendChild(helpP);
    main.appendChild(document.createElement("br"));
}

function limparTerminal() {
    while (main.hasChildNodes()){
        main.removeChild(main.firstChild);
    }
}

/* Key bindings */ 
document.addEventListener("keydown", (e) => {
    // ctrl + L
    if (e.ctrlKey && e.key == "l") {
        e.preventDefault();

        limparTerminal();
        criarLinha();
    }

});