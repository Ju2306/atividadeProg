import Link from 'next/link';

export default function NaoEncontrado() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <p>A planta que você procura não existe.</p>
      <p><Link href="/plantas">Voltar para o catálogo</Link></p>
    </section>
  );
}
