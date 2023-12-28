const Arquivo = require("../shared/Arquivo");
const Pasta = require("../shared/Pasta");

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public/")));
app.listen(5000);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

app.get("/fs/assets", (req, res) => {
    const assetsPath = path.join(__dirname, "../../public/assets/");
    res.json(readFilesFromDir(assetsPath));
});

/**
 * Reads all files and directories from a given directory.
 * @param {string} dirPath - Path to directory.
 * @returns {object|NodeJS.ErrnoException} - Returns either an object with 
 * the data of all files and directories or a Node.js exception.
 */
function readFilesFromDir(dirPath) {
    let fileTree = {};

    const files = fs.readdirSync(dirPath);

    files.forEach((f) => {
        const stats = fs.statSync(path.join(dirPath, f))

        if (stats.isFile()) {
            // Faz novo objeto Arquivo e o coloca em fileTree.
            const dadosArquivo = new Arquivo(
                path.join(dirPath, f),
                f,
                null,
                "." + f.split(".")[f.split(".").length-1]
            );

            fileTree[f] = dadosArquivo;
        } else if (stats.isDirectory()) {
            const dadosPasta = new Pasta(
                path.join(dirPath, f),
                readFilesFromDir(path.join(dirPath, f)),
                f
            );

            fileTree[f] = dadosPasta;
        }
    });

    return fileTree;
}