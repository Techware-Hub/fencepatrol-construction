import Link from "next/link";

export default function Breadcrumb({ trail }) {
  return (
    <nav className="text-sm text-white/50 mb-4" aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={i}>
          {t.to ? (
            <Link href={t.to} className="hover:text-white">
              {t.label}
            </Link>
          ) : (
            <span className="text-white/80">{t.label}</span>
          )}
          {i < trail.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
