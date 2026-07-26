"use client";

import { useId, useState } from "react";
import { Reveal } from "./reveal";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORM_ID";

export function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

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
    <section id="contact" className="px-6 py-20">
      <Reveal className="mx-auto max-w-2xl">
        <span className="font-mono-label text-xs text-[var(--primary)]">Contact</span>
        <h2 className="font-serif-display mt-4 text-3xl italic text-[var(--foreground)]">
          Get in touch.
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={nameId} className="font-mono-label text-[11px] text-[var(--muted-foreground)]">
              Name
            </label>
            <input
              id={nameId}
              name="name"
              required
              className="rounded border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={emailId} className="font-mono-label text-[11px] text-[var(--muted-foreground)]">
              Email
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              className="rounded border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={messageId} className="font-mono-label text-[11px] text-[var(--muted-foreground)]">
              Message
            </label>
            <textarea
              id={messageId}
              name="message"
              required
              rows={5}
              className="rounded border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "success" && (
            <p className="text-sm text-[var(--primary)]">Message sent — I&apos;ll reply soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Try again, or email me directly.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
