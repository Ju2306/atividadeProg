import Link from 'next/link';
 
export default function Home() {
  return (
    <section>
      <h1>Bem-vindo ao Catálogo de Plantas</h1>
      <p>Conheça diferentes espécies de plantas e suas características.</p>
      <p><Link href="/plantas">Ver o catálogo de plantas →</Link></p>
    </section>
  );
}
