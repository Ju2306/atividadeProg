import 'server-only';
import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'data', 'plantas.db'));

export function listarPlantas(busca = '', categoria = '', ordem = 'asc') {
  let sql = 'SELECT id, nome, categoria, habitat FROM plantas WHERE nome LIKE ?';
  const valores = [`%${busca}%`];

  if (categoria) {
    sql += ' AND categoria = ?';
    valores.push(categoria);
  }

  const direcao = ordem === 'desc' ? 'DESC' : 'ASC';

  sql += ` ORDER BY nome COLLATE NOCASE ${direcao}`;

  return db.prepare(sql).all(...valores);
}

export function listarCategorias() {
  return db.prepare(
    'SELECT DISTINCT categoria FROM plantas ORDER BY categoria'
  ).all();
}

export function buscarPlanta(id) {
  return db.prepare(
    'SELECT * FROM plantas WHERE id = ?'
  ).get(id);
}
