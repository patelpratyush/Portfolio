"use client";

import { useState } from "react";
import { GridField } from "./grid-field";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORM_ID";

export function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-2xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">Contact</span>
        <h2 className="font-serif-display mt-4 text-3xl text-[var(--ink)]">
          Get in touch.
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input
            name="name"
            required
            placeholder="Name"
            className="rounded border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="rounded border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message"
            className="rounded border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "success" && (
            <p className="text-sm text-[var(--accent)]">Message sent — I&apos;ll reply soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Try again, or email me directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
