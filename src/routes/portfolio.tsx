import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, GradientButton, Eyebrow } from "@/components/ui-bits";
import { Sparkles, ExternalLink } from "lucide-react";
import projectRetail from "@/assets/project-retail.avif";
import projectWebinar from "@/assets/project-webinar.avif";
import projectGift from "@/assets/project-giftyour.avif";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Projects — Pallabi Das" },
      {
        name: "description",
        content:
          "Featured projects by Pallabi Das — 360° marketing for Reliance, Big Bazaar & Easyday, AI design sessions at Adda 24×7, and GiftYour.in.",
      },
      { property: "og:title", content: "Projects — Pallabi Das" },
      {
        property: "og:description",
        content: "360° marketing, AI design education and GiftYour.in.",
      },
      { property: "og:image", content: projectRetail },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const projects = [
  {
    img: projectRetail,
    cat: "360° Marketing",
    title: "Driving 360° Marketing Strategies Across Leading Retail Brands",
    desc: "I have successfully managed ATL, BTL, and Digital Marketing campaigns for reputed brands like Reliance, Big Bazaar, and Easyday — overseeing operations across the East Zone. From conceptualising creative campaigns to executing impactful brand activations, my focus has always been on building connections that drive visibility, engagement, and growth.",
    tags: ["Reliance", "Big Bazaar", "Easyday", "East Zone"],
    accent: "from-fuchsia-500/30 to-purple-500/10",
  },
  {
    img: projectWebinar,
    cat: "Education · AI",
    title: "Empowering Creativity with AI — My Session at Adda 24×7",
    desc: "A proud moment from my journey as a designer and educator — visiting Adda 24×7 to interact with talented students and creative minds. As part of my course \"Advanced Graphic Designing + AI\", I conducted a special lecture exploring how AI is transforming the creative industry, from concept generation to visual storytelling, and how designers can blend artistic vision with smart technology to stay ahead.",
    tags: ["Keynote", "AI + Design", "Adda 24×7", "Mentorship"],
    accent: "from-cyan-400/30 to-blue-500/10",
  },
  {
    img: projectGift,
    cat: "Founder Project",
    title: "GiftYour.in — Spreading Smiles, One Gift at a Time",
    desc: "GiftYour.in is my dream project — an Indian e-commerce platform dedicated to celebrating emotions through thoughtful, handmade gifts. Built with the mission to empower small creators and simplify gifting, GiftYour connects creativity with compassion. Every product tells a story, every order carries a smile — because gifting isn't just about things, it's about feelings shared from one heart to another. 💝",
    tags: ["E-commerce", "Brand", "Handmade", "India"],
    link: "https://giftyour.in",
    accent: "from-rose-500/30 to-orange-400/10",
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
        <div className="space-y-28">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={`grid lg:grid-cols-12 gap-10 items-center ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image card */}
              <div className="lg:col-span-7 relative group">
                <div
                  className={`absolute -inset-4 rounded-[2rem] bg-gradient-to-br ${p.accent} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative gradient-border p-1 rounded-[1.75rem]">
                  <div className="overflow-hidden rounded-[calc(1.75rem-4px)]">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-[340px] sm:h-[460px] object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
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
                  {p.desc}
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
