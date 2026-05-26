import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, GradientButton, Eyebrow } from "@/components/ui-bits";
import { Mic, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getPodcasts, type Podcast } from "@/admin/lib/db";
import podcastCover from "@/assets/podcast-cover.jpg";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Pallabi Talks — Podcast by Pallabi Das" },
      { name: "description", content: "Pallabi Talks — podcast by Pallabi Das (Pallabbi). Conversations on mindset, marketing, career and building something of your own." },
      { name: "keywords", content: "Pallabi Talks, Pallabi Das podcast, Pallabbi podcast, marketing podcast India" },
      { property: "og:title", content: "Pallabi Talks — Podcast by Pallabi Das" },
      { property: "og:description", content: "Mindset · Career · Real Talk by Pallabi Das for ambitious creators." },
    ],
    links: [{ rel: "canonical", href: "/podcast" }],
  }),
  component: PodcastPage,
});

function PodcastPage() {
  const [episodes, setEpisodes] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPodcasts().then(({ data }) => {
      setEpisodes((data ?? []).filter((p) => p.published));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Section className="!pt-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Pallabi Talks</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Real conversations for <span className="gradient-text">ambitious creators</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              A podcast on mindset, marketing, and what it really takes to build
              something of your own. New episodes every other Tuesday.
            </p>
            <div className="mt-8">
              <GradientButton href="https://youtube.com/@pallabi-talks?si=amUbtoAhydiBsqA8">
                Subscribe on YouTube
              </GradientButton>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-[image:var(--gradient-radial)] blur-2xl" />
            <div className="relative gradient-border p-1">
              <img
                src={podcastCover}
                alt="Pallabi Talks podcast"
                loading="eager"
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
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Loading episodes...</div>
          ) : episodes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No episodes yet. Check back soon!</div>
          ) : (
            episodes.map((ep, i) => (
              <article key={ep.id} className="glass-card p-5 sm:p-6 flex items-center gap-5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <Mic className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-primary uppercase tracking-widest">Ep {String(i + 1).padStart(2, "0")}</span>
                    {ep.category && (
                      <span className="rounded-full glass px-2.5 py-0.5">{ep.category}</span>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-display font-semibold text-lg truncate">{ep.title}</h3>
                </div>
                <div className="shrink-0 flex items-center gap-4">
                  {ep.duration && (
                    <div className="hidden sm:flex flex-col items-center gap-0.5">
                      <span className="text-sm font-semibold text-foreground">{ep.duration}</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">duration</span>
                    </div>
                  )}
                  {ep.link && (
                    <a
                      href={ep.link}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground glow-ring hover:scale-105 transition-transform"
                    >
                      <Play className="h-4 w-4 fill-primary-foreground" />
                    </a>
                  )}
                </div>
              </article>
            ))
          )}
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
