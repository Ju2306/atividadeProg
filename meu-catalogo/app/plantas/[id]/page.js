import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buscarPlanta } from '@/lib/db';

export default async function DetalhePlanta({ params }) {
  const { id } = await params;
  const planta = buscarPlanta(id);

  if (!planta) {
    notFound();
  }

  return (
    <article className="detalhe">
      <Link href="/plantas">← Voltar para o catálogo</Link>
      <h1>{planta.nome}</h1>
      <span className="etiqueta">{planta.categoria}</span>
      <p>{planta.descricao}</p>
      <dl>
        <dt>Habitat</dt>
        <dd>{planta.habitat}</dd>
        <dt>Altura média</dt>
        <dd>{planta.altura} cm</dd>
        <dt>Origem</dt>
        <dd>{planta.origem}</dd>
      </dl>
    </article>
  );
}
