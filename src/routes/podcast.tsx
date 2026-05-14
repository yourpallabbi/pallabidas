import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, GradientButton, Eyebrow } from "@/components/ui-bits";
import { Mic, Play, Youtube, Apple } from "lucide-react";
import podcastCover from "@/assets/podcast-cover.jpg";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Pallabi Talks — The Podcast" },
      {
        name: "description",
        content:
          "Conversations on mindset, marketing, career and the messy middle of building something of your own.",
      },
      { property: "og:title", content: "Pallabi Talks — Podcast" },
      {
        property: "og:description",
        content: "Mindset · Career · Real Talk for ambitious creators.",
      },
    ],
    links: [{ rel: "canonical", href: "/podcast" }],
  }),
  component: PodcastPage,
});

const eps = [
  { n: "01", cat: "Mindset", title: "Mindset shifts for ambitious creators", dur: "32 min" },
  { n: "02", cat: "Career", title: "Building a brand from scratch in 2025", dur: "41 min" },
  { n: "03", cat: "Real Talk", title: "Burnout, boundaries & coming back", dur: "28 min" },
  { n: "04", cat: "Mindset", title: "How I price my creative work", dur: "36 min" },
  { n: "05", cat: "Career", title: "Building in India, dreaming global", dur: "44 min" },
  { n: "06", cat: "Real Talk", title: "What no one tells you about freelancing", dur: "31 min" },
];

function PodcastPage() {
  return (
    <>
      <Section className="!pt-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Pallabi Talks</Eyebrow>
            <h1 className="mt-5 text-5xl sm:text-6xl font-bold leading-[1.05]">
              Real conversations for <span className="gradient-text">ambitious creators</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              A podcast on mindset, marketing, and what it really takes to build
              something of your own. New episodes every other Tuesday.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GradientButton href="https://youtube.com">Subscribe on YouTube</GradientButton>
              <a
                href="https://podcasts.apple.com"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold"
              >
                <Apple className="h-4 w-4" /> Apple Podcasts
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-[image:var(--gradient-radial)] blur-2xl" />
            <div className="relative gradient-border p-1">
              <img
                src={podcastCover}
                alt="Pallabi Talks podcast"
                loading="lazy"
                className="w-full rounded-[calc(var(--radius-xl)-2px)]"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Episodes"
          title={<>All <span className="gradient-text">episodes</span>.</>}
        />
        <div className="grid gap-4 mt-12">
          {eps.map((e) => (
            <article key={e.n} className="glass-card p-5 sm:p-6 flex items-center gap-5">
              <button className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground glow-ring hover:scale-105 transition-transform">
                <Play className="h-5 w-5 fill-primary-foreground" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-primary uppercase tracking-widest">Ep {e.n}</span>
                  <span className="rounded-full glass px-2.5 py-0.5">{e.cat}</span>
                </div>
                <h3 className="mt-1.5 font-display font-semibold text-lg truncate">{e.title}</h3>
              </div>
              <div className="text-xs text-muted-foreground shrink-0 hidden sm:block">{e.dur}</div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-card p-10 sm:p-14 text-center">
          <Mic className="h-10 w-10 mx-auto text-primary" />
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold">
            Be a <span className="gradient-text">guest</span> on the show.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Building something interesting? I'd love to share your story with our community.
          </p>
          <div className="mt-8 flex justify-center">
            <GradientButton to="/contact">Pitch yourself</GradientButton>
          </div>
        </div>
      </Section>
    </>
  );
}
