import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, GradientButton, Eyebrow } from "@/components/ui-bits";
import { Sparkles, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getPortfolio, type Portfolio } from "@/admin/lib/db";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Pallabi Das" },
      {
        name: "description",
        content:
          "Featured projects by Pallabi Das — 360° marketing for Reliance, Big Bazaar & Easyday, AI design sessions at Adda 24×7, and GiftYour.in.",
      },
      { property: "og:title", content: "Blog — Pallabi Das" },
      {
        property: "og:description",
        content: "360° marketing, AI design education and GiftYour.in.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const art = [
  { img: art1, title: "Aurora Bloom" },
  { img: art2, title: "Neon Muse" },
  { img: art3, title: "Midnight Garden" },
];

function BlogPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortfolio().then(({ data }) => {
      setProjects(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Section className="!pt-10">
        <Eyebrow>Projects</Eyebrow>
        <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] max-w-4xl">
          Work that <span className="gradient-text">moved numbers</span>
          <br className="hidden sm:block" /> and made people feel something.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A snapshot of the brands, campaigns and platforms I've built —
          where strategy meets soul.
        </p>
      </Section>

      <Section className="!pt-0">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No projects yet. Check back soon!</div>
        ) : (
          <div className="space-y-28">
            {projects.map((p, i) => (
              <article
                key={p.id}
                className={`grid lg:grid-cols-12 gap-10 items-center ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="lg:col-span-7 relative group">
                  <div
                    className={`absolute -inset-4 rounded-[2rem] bg-gradient-to-br ${p.accent} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="relative gradient-border p-1 rounded-[1.75rem]">
                    <div className="overflow-hidden rounded-[calc(1.75rem-4px)]">
                      <img
                        src={p.image_url}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-[260px] sm:h-[380px] lg:h-[460px] object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 glass rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-semibold">
                    0{i + 1} · {p.cat}
                  </div>
                </div>

                {/* Copy */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    {p.cat}
                  </div>
                  <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-[1.1]">
                    {p.title}
                  </h2>
                  <p className="mt-5 text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="glass rounded-full px-3.5 py-1.5 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      Visit project <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
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
                className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
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
