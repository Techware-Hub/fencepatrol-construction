export default function SectionHeading({ chip, title, accent, subtitle, center = true }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      {chip && <span className="chip mb-4">{chip}</span>}
      <h2 className="heading-display text-4xl sm:text-5xl text-white">
        {title}{" "}
        {accent && (
          <span className="bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">
            {accent}
          </span>
        )}
      </h2>
      {subtitle && <p className="mt-4 text-white/70">{subtitle}</p>}
    </div>
  );
}
