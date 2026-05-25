import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, GradientButton, Eyebrow } from "@/components/ui-bits";
import { Palette, Globe, Brain, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pallabi Das" },
      {
        name: "description",
        content:
          "Marketer, painter, podcast host. The story behind Pallabi Das and the vision driving the work.",
      },
      { property: "og:title", content: "About Pallabi Das" },
      { property: "og:description", content: "Marketer. Painter. Podcast host." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const chapters = [
  {
    icon: Palette,
    title: "Started with paint, not pixels",
    body:
      "Long before campaigns and conversion funnels, I was a kid obsessed with color and composition. Digital painting still grounds my marketing — every brand I touch starts on a blank canvas.",
  },
  {
    icon: Brain,
    title: "Fell in love with the strategy of attention",
    body:
      "When I discovered that great storytelling could move markets, I went deep. SEO, performance, content systems — I learned the unglamorous parts so the creative work could shine.",
  },
  {
    icon: Globe,
    title: "Building a global creative practice",
    body:
      "Today I work with founders across India, the UAE and the US. The dream: a borderless studio rooted in craft, powered by AI, and obsessed with helping brands feel like something.",
  },
  {
    icon: Heart,
    title: "What I care about",
    body:
      "Premium work without the pretentiousness. Real conversations on the podcast. Teaching what I learn. And making space for the messy, human side of building things.",
  },
];

function AboutPage() {
  return (
    <>
      <Section className="!pt-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Eyebrow>About me</Eyebrow>
            <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05]">
              Hi, I'm <span className="gradient-text">Pallabi</span>. <br />
              I make brands feel like something.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a digital marketer, designer and podcast host based in India,
              working with founders and creators around the world. My job is to
              translate good ideas into brands people can't ignore.
            </p>
            <GradientButton to="/contact">Let's talk</GradientButton>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 bg-[image:var(--gradient-radial)] blur-2xl" />
            <div className="relative gradient-border p-1.5">
              <img
                src="/herofinal.png"
                alt="Pallabi Das"
                fetchPriority="high"
                decoding="async"
                className="w-full rounded-[calc(var(--radius-xl)-2px)] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="My story"
          title={<>Four chapters that shaped <span className="gradient-text">how I work</span>.</>}
        />
        <div className="grid md:grid-cols-2 gap-5 mt-14">
          {chapters.map((c, i) => (
            <div key={c.title} className="glass-card p-8">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="text-sm text-muted-foreground">Chapter 0{i + 1}</div>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-card p-10 sm:p-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-sm uppercase tracking-widest text-primary">Vision</div>
            <p className="mt-3 font-display text-xl">
              A global, borderless creative practice — UAE, India, everywhere worth building.
            </p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-primary">Philosophy</div>
            <p className="mt-3 font-display text-xl">
              Strategy creates the system. Story makes it spread. Design makes it stick.
            </p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-primary">Off the clock</div>
            <p className="mt-3 font-display text-xl">
              Digital painting, long walks, and unreasonable amounts of chai.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
