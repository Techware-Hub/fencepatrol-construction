import { BUSINESS, SERVICE_AREAS, SERVICES } from "@/content/index.js";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    areaServed: SERVICE_AREAS.map((a) => a.name),
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      addressCountry: "US",
    },
    description:
      "Fence installation, automatic gates, deer & pool fencing, and repair across Greeley & Northern Colorado.",
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
