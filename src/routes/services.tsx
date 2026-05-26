import { createFileRoute } from "@tanstack/react-router";
import { Section, GradientButton, Eyebrow } from "@/components/ui-bits";
import { Search, Megaphone, Users, Sparkles, PenTool, Image, Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Pallabi Das" },
      {
        name: "description",
        content:
          "Digital marketing, branding and graphic design services — strategy and execution under one roof.",
      },
      { property: "og:title", content: "Services — Pallabi Das" },
      {
        property: "og:description",
        content: "SEO, performance marketing, branding and design.",
      },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const groups = [
  {
    label: "Digital Marketing",
    items: [
      {
        icon: Search,
        title: "SEO",

        bullets: ["On-page & technical audit", "Off-page authority building", "Content roadmap"],
      },
      {
        icon: Megaphone,
        title: "Performance Marketing",

        bullets: ["Meta & Google Ads", "Funnel & creative testing", "Weekly reporting"],
      },
      {
        icon: Users,
        title: "Social Media Growth",

        bullets: ["Content strategy", "Community building", "Influencer collabs"],
      },
    ],
  },
  {
    label: "Branding",
    items: [
      {
        icon: Sparkles,
        title: "Brand Strategy",
        bullets: ["Positioning & voice", "Audience clarity", "Messaging architecture"],
      },
      {
        icon: PenTool,
        title: "Identity Design",
        bullets: ["Logo system", "Typography & color", "Brand guidelines"],
      },
    ],
  },
  {
    label: "Graphic Design",
    items: [
      {
        icon: Image,
        title: "Creatives & Ads",
        bullets: ["Static & motion ads", "Social creatives", "Campaign packs"],
      },
    ],
  },
];

function ServicesPage() {
  return (
    <>
      <Section className="!pt-10">
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl">
          A full-stack toolkit for <span className="gradient-text">brands going somewhere</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Pick a single service or build a custom retainer. Every engagement starts
          with strategy and ends with measurable growth.
        </p>
        <div className="mt-8">
          <GradientButton to="/contact">Book a consultation</GradientButton>
        </div>
      </Section>

      {groups.map((g) => (
        <Section key={g.label} className="!py-14">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              {g.label}
            </h2>
            <div className="text-sm text-muted-foreground">
              {g.items.length} offerings
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {g.items.map((s) => (
              <div key={s.title} className="glass-card p-7 flex flex-col">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <ul className="mt-5 space-y-2 flex-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <div className="glass-card p-10 sm:p-14 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Not sure what you need?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Book a free 20-minute call. We'll diagnose, prescribe, and only build a
            scope if it's the right move.
          </p>
          <div className="mt-8 flex justify-center">
            <GradientButton to="/contact">Book a free call</GradientButton>
          </div>
        </div>
      </Section>
    </>
  );
}
