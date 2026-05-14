import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, GradientButton, Eyebrow } from "@/components/ui-bits";
import workBranding from "@/assets/work-branding.jpg";
import workCampaign from "@/assets/work-campaign.jpg";
import workSeo from "@/assets/work-seo.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Pallabi Das" },
      {
        name: "description",
        content: "Branding, marketing campaigns and digital paintings by Pallabi Das.",
      },
      { property: "og:title", content: "Portfolio — Pallabi Das" },
      {
        property: "og:description",
        content: "Selected work in branding, marketing and digital art.",
      },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const work = [
  {
    img: workBranding,
    cat: "Branding",
    title: "Yakniula — Identity Suite",
    desc: "Full visual identity, packaging direction and digital rollout for a hospitality brand.",
    metrics: ["3.2x brand recall", "+180% direct enquiries"],
  },
  {
    img: workCampaign,
    cat: "Campaign",
    title: "Lumen — Q4 Social Campaign",
    desc: "8-week creative campaign that became the brand's highest-performing quarter.",
    metrics: ["12M impressions", "ROAS 5.6"],
  },
  {
    img: workSeo,
    cat: "Marketing",
    title: "Northbeam — SEO Growth Sprint",
    desc: "Full technical SEO overhaul plus a content engine that compounds monthly.",
    metrics: ["6.1x organic traffic", "+312 keywords in top 10"],
  },
];

const art = [
  { img: art1, title: "Aurora Bloom" },
  { img: art2, title: "Neon Muse" },
  { img: art3, title: "Midnight Garden" },
];

function PortfolioPage() {
  return (
    <>
      <Section className="!pt-10">
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className="mt-5 text-5xl sm:text-6xl font-bold leading-[1.05] max-w-3xl">
          Work that <span className="gradient-text">moved numbers</span> and made people feel something.
        </h1>
      </Section>

      <Section className="!pt-0">
        <div className="space-y-24">
          {work.map((w, i) => (
            <article
              key={w.title}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative gradient-border p-1">
                <img
                  src={w.img}
                  alt={w.title}
                  loading="lazy"
                  className="w-full rounded-[calc(var(--radius-xl)-2px)] object-cover"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-primary">{w.cat}</div>
                <h2 className="mt-3 font-display text-4xl font-bold">{w.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{w.desc}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {w.metrics.map((m) => (
                    <span key={m} className="glass rounded-full px-4 py-1.5 text-xs font-semibold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Digital painting"
          title={<>The <span className="gradient-text">art side</span> of me.</>}
          subtitle="A personal practice that keeps everything else honest."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {art.map((a) => (
            <div key={a.title} className="group relative overflow-hidden rounded-3xl border border-border/40">
              <img
                src={a.img}
                alt={a.title}
                loading="lazy"
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 font-display text-lg font-semibold">
                {a.title}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-card p-10 sm:p-14 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Want to be the <span className="gradient-text">next case study?</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <GradientButton to="/contact">Start a project</GradientButton>
          </div>
        </div>
      </Section>
    </>
  );
}
