"use client";
import { useState } from "react";
import { FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import { BUSINESS, SERVICES } from "@/content/index.js";

export default function ContactForm({ compact = false }) {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  const input =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-orange focus:outline-none";
  return (
    <section id="contact-form" className="relative py-16">
      <div className="container-x">
        <div className={`grid gap-10 ${compact ? "" : "lg:grid-cols-2"}`}>
          {!compact && (
            <div>
              <span className="chip mb-4">Get a Free Estimate</span>
              <h2 className="heading-display text-4xl sm:text-5xl text-white">
                Tell us about{" "}
                <span className="bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">
                  your project
                </span>
              </h2>
              <p className="mt-4 text-white/70">
                Free, no-obligation on-site estimates across Greeley & Northern Colorado. Fastest response is a call.
              </p>
              <a href={BUSINESS.phoneHref} className="btn-primary mt-6">
                <FaPhoneAlt /> Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          )}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-brand-panel to-brand-dark p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-10">
                <FaCheckCircle className="text-brand-green text-5xl mx-auto mb-4" />
                <h3 className="heading-display text-2xl text-white">Thanks &mdash; we&rsquo;ll be in touch.</h3>
                <p className="text-white/60 mt-2">
                  For the fastest response, call {BUSINESS.phoneDisplay}.
                </p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={submit}>
                <input className={input} placeholder="Your name" required value={f.name} onChange={set("name")} />
                <input className={input} placeholder="Phone" type="tel" required value={f.phone} onChange={set("phone")} />
                <input className={input} placeholder="Email" type="email" value={f.email} onChange={set("email")} />
                <select className={input} required value={f.service} onChange={set("service")}>
                  <option value="">Service needed…</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <textarea
                  className={input}
                  rows={4}
                  placeholder="Project details (footage, style, location)"
                  value={f.message}
                  onChange={set("message")}
                />
                <button type="submit" className="btn-primary w-full">
                  Request My Free Estimate
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
