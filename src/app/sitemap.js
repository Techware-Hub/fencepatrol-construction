import { SERVICES } from "@/content/index.js";

const base = "https://tntfenceco.com";
const staticPaths = [
  "",
  "/about",
  "/services",
  "/fence-styles",
  "/gallery",
  "/service-areas",
  "/contact",
  "/faq",
];

export default function sitemap() {
  const pages = staticPaths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
  const services = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...services];
}
