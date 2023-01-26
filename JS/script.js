let terminalTextbox, terminalPathText = "/home/guest", terminalHistory = [], comandosVoltados = 0;
const main = document.querySelector("main");

const dirTree = {
    // "/": {
    "home": {
        "guest": {
            "Desktop": null, 
            "Documents": null, // currículo
            "Downloads": null, // Jeek Online / Truco-cli
            "Music": null, // randm.rs
            "Pictures": null, // pasta de imgs
            "Public": null,
            "Templates": null,
            "Videos": null
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
                cat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retorna os conteúdos de um arquivo \
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

            if (caminhoArr.length == 2) {
                Object.entries(dirTree[caminhoArr[1]]).forEach((arq) => {
                    printTerminal(arq[0]);
                });
            }
            else if (caminhoArr.length == 3) {
                Object.entries(dirTree["home"][caminhoArr[2]]).forEach((arq) => {
                    printTerminal(arq[0]);
                });
            }
            else {
                if (dirTree["home"]["guest"][caminhoArr[3]] != null) {
                    dirTree["home"]["guest"][caminhoArr[3]].forEach((arq) => {
                        printTerminal(arq);
                    });
                }
            }
        },

        cd() {
            const pastaAtual = terminalPathText.split("/")[terminalPathText.split("/").length - 1];
            
            if (!argv[1]) {
                terminalPathText = "/home/guest";
            }
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
            if (argv[1][0] == '"' && comando[comando.length - 1] == '"'){
                printTerminal(comando.slice(comando.indexOf('"') + 1, comando.length - 1));
            }
            else{
                printTerminal(comando.slice(5).trim());
            }
        },

        cat() {

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
            `Resolution: ${window.innerWidth}x${window.innerHeight}` + "<br>" +
            `Terminal font: Source Code Pro`;

            container.style.padding = "1rem 0px";
            container.appendChild(imgNeofetch);
            container.appendChild(textContainer);

            main.appendChild(container);
        },

        // mv() { },
        // man() { },

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
            if (argv[1] != null){
                if (comandos[argv[1]] != null){
                    comandos[argv[1]](true);
                }
                else {
                    printTerminal(`sudo: comando não encontrado: ${argv[1]}`);
                }
            }
        }
    }

    if (comandos[argv[0]] != null){
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

function printTerminal(texto){
    const p = document.createElement("p");
    p.innerHTML = texto;

    main.appendChild(p);
}

function helpTexto() {
    const helpP = document.createElement("p");
    helpP.textContent = "Para mais informações use 'vidacalura --help'";
    helpP.classList.add("help-texto");
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