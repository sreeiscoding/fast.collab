"use client";

import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  }

  return (
    <main className="fc-shell">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl rounded-[32px] border border-border bg-surface p-8 shadow-medium md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Talk to the FastCollab team.
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Use this form for sales, support, privacy, or security questions.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-success/20 bg-success-subtle px-4 py-3 text-sm text-success">
              Thanks, {name}. Your message is captured in this workspace session and ready for backend wiring.
            </div>
          ) : null}

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="contact-name">Name</label>
              <input
                className="fc-input"
                id="contact-name"
                onChange={(event) => setName(event.target.value)}
                type="text"
                value={name}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="contact-email">Email</label>
              <input
                className="fc-input"
                id="contact-email"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                value={email}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="contact-message">Message</label>
              <textarea
                className="fc-input min-h-28 resize-none py-3"
                id="contact-message"
                onChange={(event) => setMessage(event.target.value)}
                value={message}
              />
            </div>
            <button className="fc-button-primary w-full justify-center" type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

