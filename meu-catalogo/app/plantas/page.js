import Link from 'next/link';
import { connection } from 'next/server';
import { listarPlantas, listarCategorias } from '@/lib/db';

export default async function ListaPlantas({ searchParams }) {
  await connection();

  const { q = '', categoria = '' } = await searchParams;

  const plantas = listarPlantas(q, categoria);
  const categorias = listarCategorias();

  return (
    <section>
      <h1>Catálogo de Plantas</h1>

      <form className="filtros">
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

        <button type="submit">Filtrar</button>
      </form>

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
