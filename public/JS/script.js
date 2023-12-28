fetch("/fs/assets")
.then((res) => res.json())
.then((fileTree) => {
    const fileExplorer = document.getElementById("files-explorer");
    renderFileExplorer(fileTree, fileExplorer);
});

/**
 * Controla a renderização de arquivos e pastas na navbar.
 * @param {object} fileTree - Objeto com os dados de todos os arquivos e pastas
 * a serem renderizados.
 * @param {HTMLElement} containerElement - Div em que os arquivos/pastas devem
 * ser incluídos.
 */
async function renderFileExplorer(fileTree, containerElement) {
    Object.keys(fileTree).forEach((key) => {
        if (fileTree[key].extensao) {
            renderArquivo(fileTree[key], containerElement);
        } else {
            const pastaContainer = renderPasta(fileTree[key], containerElement);
            renderFileExplorer(fileTree[key].filhos, pastaContainer);
        }
    });
}

/**
 * Cria e adiciona um elemento representando visualmente um arquivo na navbar.
 * @param {Arquivo} arq - Dados do arquivo a ser renderizado.
 * @param {HTMLElement} containerElement - Div em que o arquivo deve ser
 * incluído.
 */
function renderArquivo(arq, containerElement) {
    const arquivoElement = document.createElement("div");
    arquivoElement.classList.add("arquivo");

    // arquivoElement.addEventListener("click", ); -> Mostrar dados do arquivo

    const arqIcon = document.createElement("img");
    if (arq.extensao === ".md") {
        arqIcon.src = "imgs/text-markdown.svg";
    } else {
        arqIcon.src = "imgs/image-x-generic.svg";
    }

    const arqNome = document.createElement("p");
    arqNome.textContent = arq.nome;

    arquivoElement.appendChild(arqIcon);
    arquivoElement.appendChild(arqNome);

    containerElement.appendChild(arquivoElement);
}

/**
 * Cria e adiciona um elemento representando visualmente uma pasta na navbar.
 * @param {Pasta} pasta - Pasta a ser renderizada.
 * @param {HTMLElement} containerElement - Div em que a pasta deve ser incluída.
 * @returns {HTMLElement} - Div para incluir filhos (children) da pasta.
 */
function renderPasta(pasta, containerElement) {
    const pastaElement = document.createElement("div");
    pastaElement.classList.add("pasta");

    const pastaDadosElement = document.createElement("div");
    pastaDadosElement.classList.add("pasta-dados");

    const pastaIcon = document.createElement("img");
    pastaIcon.src = "imgs/folder.svg";

    const pastaNome = document.createElement("p");
    pastaNome.textContent = pasta.nome;

    pastaDadosElement.appendChild(pastaIcon);
    pastaDadosElement.appendChild(pastaNome);

    const pastaFilhosContainer = document.createElement("div");
    pastaFilhosContainer.classList.add("pasta-filhos");
    pastaFilhosContainer.style.display = "none";

    pastaDadosElement.addEventListener("click", () => {
        mostrarPasta(pastaFilhosContainer)
    });
    
    pastaElement.appendChild(pastaDadosElement);
    pastaElement.appendChild(pastaFilhosContainer);

    containerElement.appendChild(pastaElement);

    return pastaFilhosContainer;
}

/**
 * Abre ou fecha pastas.
 * @param {HTMLElement} pastaFilhos - Div contendo os filhos da pasta.
 */
function mostrarPasta(pastaFilhos) {
    if (pastaFilhos.style.display != "none") {
        pastaFilhos.style.display = "none";
    } else {
        pastaFilhos.style.display = "block";
    }
}