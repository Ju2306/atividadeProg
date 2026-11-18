import Link from 'next/link';
import { connection } from 'next/server';
import { listarPlantas, listarCategorias } from '@/lib/db';

export default async function ListaPlantas({ searchParams }) {
  await connection();

  const {
    q = '',
    categoria = '',
    ordem = 'asc'
  } = await searchParams;

  const plantas = listarPlantas(q, categoria, ordem);
  const categorias = listarCategorias();

  const proximaOrdem = ordem === 'asc' ? 'desc' : 'asc';

  return (
    <section>
      <h1>Catálogo de Plantas</h1>

      <form className="filtros" action="/plantas">
        <input
          name="q"
          placeholder="Buscar pelo nome..."
          defaultValue={q}
        />

        <select name="categoria" defaultValue={categoria}>
          <option value="">Todas as categorias</option>

          {categorias.map((c) => (
            <option key={c.categoria} value={c.categoria}>
              {c.categoria}
            </option>
          ))}
        </select>

        <input type="hidden" name="ordem" value={ordem} />

        <button type="submit">Filtrar</button>
      </form>

      <div className="ordenacao">
        <span>
          Ordem atual: {ordem === 'asc' ? 'A – Z' : 'Z – A'}
        </span>

        <form action="/plantas">
          <input type="hidden" name="q" value={q} />
          <input type="hidden" name="categoria" value={categoria} />

          <button type="submit" name="ordem" value={proximaOrdem}>
            {ordem === 'asc' ? 'Ordenar: Z – A' : 'Ordenar: A – Z'}
          </button>
        </form>
      </div>

      {plantas.length === 0 && (
        <p>Nenhuma planta encontrada.</p>
      )}

      <ul className="grade">
        {plantas.map((planta) => (
          <li key={planta.id}>
            <Link href={`/plantas/${planta.id}`} className="card">
              <h2>{planta.nome}</h2>
              <p>{planta.habitat}</p>
              <span className="etiqueta">{planta.categoria}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
