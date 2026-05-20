import Breadcrumb from "./Breadcrumb.jsx";
import SafeImage from "./SafeImage.jsx";

export default function PageHero({ chip, title, accent, intro, image, trail }) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        {image && (
          <SafeImage src={image} alt="" fill className="object-cover opacity-20" sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/90 to-brand-dark" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:60px_60px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>
      <div className="container-x relative">
        {trail && <Breadcrumb trail={trail} />}
        {chip && <span className="chip mb-4">{chip}</span>}
        <h1 className="heading-display text-5xl sm:text-6xl lg:text-7xl text-white">
          {title}{" "}
          {accent && (
            <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
              {accent}
            </span>
          )}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/70">{intro}</p>}
      </div>
    </section>
  );
}
