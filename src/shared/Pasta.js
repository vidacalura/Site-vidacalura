/**
 * Classe representa uma pasta e contém suas sub-pastas e/ou arquivos.
 */
class Pasta {
    /**
     * Cria uma pasta.
     * @param {string} caminho - Caminho da pasta.
     * @param {Arquivo[]} filhos - Filhos (children) da pasta.
     * @param {string} nome - Nome da pasta.
     */
    constructor(caminho, filhos, nome) {
        this.caminho = caminho;
        this.filhos = filhos;
        this.nome = nome;
    }
}

module.exports = Pasta;