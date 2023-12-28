/**
 * Classe representa e contém os dados de um arquivo.
 */
class Arquivo {
    /**
     * Cria um arquivo.
     * @param {string} caminho - Caminho do arquivo.
     * @param {string} nome - Nome do arquivo.
     * @param {string|null} texto - Texto do arquivo (caso seja um arquivo de
     * texto).
     * @param {string} extensao - .png ou .md.
     */
    constructor(caminho, nome, texto, extensao) {
        this.caminho = caminho;
        this.nome = nome;
        this.texto = texto;
        this.extensao = extensao;
    }
}

module.exports = Arquivo;