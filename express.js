import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const basePath = path.join(__dirname, 'templates');

const app = express();
const port = 3000;

const data = fs.readFileSync('ranking.json');
let ranking = (JSON.parse(data));


app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// Carregando arquivos estáticos (CSS e JS) utilizando o express

app.use(express.static('public'));

// Carregando arquivos HTML utilizando o express

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

app.get('/game', (req, res) => {
    res.sendFile(`${basePath}/game.html`);
});

app.get('/result', (req, res) => {
    res.sendFile(`${basePath}/result.html`);
});

// Obtendo nome e pontos do jogador a partir dos forms, e escrevendo no ranking.json

app.post('/addPlayer', (req, res) => {

    let newPlayer = req.body;

    ranking.playerList.push(newPlayer);

    console.log(ranking);

    fs.writeFile('ranking.json', JSON.stringify(ranking, null, 4), function (err) {
        console.log("All set");
    });
    
    console.log(ranking.playerList);

    res.sendFile(`${basePath}/result.html`);
});

// Respondendo requisição de ranking com as informações contidas no JSON

app.get('/ranking', (req, res) => {
    res.send(ranking);
    console.log(ranking);
});

app.listen(port, () => {
    console.log(`Executando na porta ${port}`);
});