const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const pasta = path.join(__dirname, '..', 'data');
fs.mkdirSync(pasta, { recursive: true });

const db = new Database(path.join(pasta, 'plantas.db'));

db.exec(`
  DROP TABLE IF EXISTS plantas;
  CREATE TABLE plantas (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nome      TEXT NOT NULL,
    categoria TEXT NOT NULL,
    habitat   TEXT NOT NULL,
    altura    INTEGER,
    origem    TEXT NOT NULL,
    descricao TEXT NOT NULL
  );
`);

const plantas = [
  ['Girassol', 'Flor', 'Campos e jardins', 200, 'América do Norte',
    'Planta conhecida por suas grandes flores amarelas que acompanham a direção do sol.'],

  ['Rosa', 'Flor', 'Jardins e regiões de clima temperado', 100, 'Ásia',
    'Flor ornamental conhecida por suas pétalas variadas e perfume característico.'],

  ['Lavanda', 'Aromática', 'Regiões ensolaradas', 60, 'Região do Mediterrâneo',
    'Planta aromática de flores roxas, muito utilizada em jardins e na produção de óleos essenciais.'],

  ['Cacto-mandacaru', 'Cacto', 'Regiões semiáridas', 600, 'Brasil',
    'Cacto típico da Caatinga, adaptado a ambientes quentes e com pouca disponibilidade de água.'],

  ['Costela-de-adão', 'Tropical', 'Florestas tropicais', 300, 'América Central',
    'Planta de folhas grandes e recortadas, bastante utilizada na decoração de ambientes.'],

  ['Samambaia', 'Samambaia', 'Locais úmidos e sombreados', 80, 'Regiões tropicais',
    'Planta sem flores e sementes, conhecida por suas folhas longas e delicadas.'],

  ['Orquídea', 'Flor', 'Florestas tropicais', 50, 'Diversas regiões do mundo',
    'Planta ornamental conhecida pela variedade de formatos e cores de suas flores.'],

  ['Ipê-amarelo', 'Árvore', 'Florestas e áreas abertas', 1200, 'América do Sul',
    'Árvore conhecida pela floração amarela intensa, que costuma ocorrer em períodos mais secos.'],

  ['Suculenta Echeveria', 'Suculenta', 'Regiões áridas e jardins', 20, 'México',
    'Planta de folhas carnudas que armazenam água e geralmente crescem em formato de roseta.'],

  ['Vitória-régia', 'Aquática', 'Lagos e águas calmas', 50, 'Região Amazônica',
    'Planta aquática conhecida por suas grandes folhas flutuantes e flores características.']
];

const inserir = db.prepare(
  'INSERT INTO plantas (nome, categoria, habitat, altura, origem, descricao) VALUES (?, ?, ?, ?, ?, ?)'
);

for (const planta of plantas) {
  inserir.run(...planta);
}

console.log(`${plantas.length} plantas inseridas!`);
db.close();
