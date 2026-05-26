import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/ui-bits";
import { Mail, MessageCircle, MapPin, Send, Instagram, Linkedin, Youtube, CheckCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pallabi Das" },
      {
        name: "description",
        content:
          "Book a call, send a message, or say hi. Let's build something worth scrolling.",
      },
      { property: "og:title", content: "Contact — Pallabi Das" },
      { property: "og:description", content: "Book a call or send a message." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const notifyId = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY_ID as string;
    const confirmId = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    try {
      // Send notification to Pallabi
      await emailjs.sendForm(serviceId, notifyId, formRef.current, publicKey);
      // Send confirmation to user
      await emailjs.sendForm(serviceId, confirmId, formRef.current, publicKey);

      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Section className="!pt-10">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl">
          Let's build something <span className="gradient-text">worth scrolling</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Pick the way that works best for you. I respond within 24 hours on weekdays.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div className="glass-card p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[360px]">
                <CheckCircle className="h-12 w-12 text-primary" />
                <h2 className="font-display text-2xl font-semibold">Message sent!</h2>
                <p className="text-muted-foreground max-w-sm">
                  Thanks for reaching out. I've got your message and a confirmation has been sent to your email. I'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-card p-8 space-y-5"
              >
                <h2 className="font-display text-2xl font-semibold">Send me a message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" name="from_name" />
                  <Field label="Email" name="from_email" type="email" />
                </div>
                <Field label="Subject" name="subject" />
                <div>
                  <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    className="mt-2 w-full rounded-2xl bg-input/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Tell me about your project, goals, timeline..."
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again or email directly.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {status === "sending" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <>Send message <Send className="h-4 w-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <a href="https://wa.me/917003773910" className="glass-card p-6 flex items-center gap-4 group">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">WhatsApp</div>
                <div className="font-display font-semibold">+91 70037 73910</div>
              </div>
            </a>
            <a href="mailto:yourpallabbi@gmail.com" className="glass-card p-6 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">Email</div>
                <div className="font-display font-semibold">yourpallabbi@gmail.com</div>
              </div>
            </a>
            <a href="tel:+917003773910" className="glass-card p-6 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">Phone</div>
                <div className="font-display font-semibold">+91 70037 73910</div>
              </div>
            </a>
            <div className="glass-card p-6 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">Based in</div>
                <div className="font-display font-semibold">India · Working globally</div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="text-xs uppercase tracking-widest text-primary">Socials</div>
              <div className="mt-4 flex gap-3">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/pallabi_talks" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/pallabi-das786/" },
                  { Icon: Youtube, href: "https://youtube.com/@pallabi-talks?si=amUbtoAhydiBsqA8" },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full glass hover:text-primary transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        className="mt-2 w-full rounded-2xl bg-input/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
