import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
        Mystic Tarot
      </h1>
      <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
        Una experiencia de lectura de tarot moderna, mística y de acceso libre.
        Explora el mundo del tarot sin registros.
      </p>
      <Link
        href="/dashboard"
        className="inline-block btn-primary text-white text-lg px-8 py-4"
      >
        Entrar a la app
      </Link>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div className="card-surface p-6 rounded-2xl">
          <span className="text-2xl mb-2 block">🎴</span>
          <h2 className="font-semibold text-primary mb-2">78 cartas</h2>
          <p className="text-sm text-white/70">
            Arcanos Mayores y Menores con interpretaciones en español.
          </p>
        </div>
        <div className="card-surface p-6 rounded-2xl">
          <span className="text-2xl mb-2 block">✨</span>
          <h2 className="font-semibold text-accent mb-2">Múltiples spreads</h2>
          <p className="text-sm text-white/70">
            Carta del día, 3 cartas y Cruz Celta.
          </p>
        </div>
        <div className="card-surface p-6 rounded-2xl">
          <span className="text-2xl mb-2 block">🔮</span>
          <h2 className="font-semibold text-secondary mb-2">Sin registro</h2>
          <p className="text-sm text-white/70">
            Acceso libre. Tu historial se guarda en tu navegador.
          </p>
        </div>
      </div>
    </div>
  );
}
