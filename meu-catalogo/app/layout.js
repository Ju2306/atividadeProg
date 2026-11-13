import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Catálogo de Plantas',
  description: 'Catálogo de espécies de plantas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="topo">
          <Link href="/" className="logo">Catálogo de Plantas</Link>
          <nav>
            <Link href="/">Início</Link>
            <Link href="/plantas">Plantas</Link>
          </nav>
        </header>
        <main className="conteudo">{children}</main>
      </body>
    </html>
  );
}
