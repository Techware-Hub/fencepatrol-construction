import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <main className="pt-40 pb-28 container-x text-center">
      <div className="heading-display text-7xl text-brand-orange">404</div>
      <h1 className="heading-display text-3xl text-white mt-2">That page wandered off.</h1>
      <p className="text-white/60 mt-3">Let&rsquo;s get you back on track.</p>
      <div className="flex gap-3 justify-center mt-6">
        <Link href="/" className="btn-primary">
          Back Home
        </Link>
        <Link href="/contact" className="btn-outline">
          Free Estimate
        </Link>
      </div>
    </main>
  );
}
