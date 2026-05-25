import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Search,
  Megaphone,
  Palette,
  Mic,
  GraduationCap,
  Star,
  Quote,
  ArrowRight,
  BookOpen,
  FileText,
  ExternalLink,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
} from "lucide-react";
import workBranding from "@/assets/work-branding.jpg";
import workCampaign from "@/assets/work-campaign.jpg";
import workSeo from "@/assets/work-seo.jpg";
import podcastCover from "@/assets/podcast-cover.jpg";
import { Section, SectionHeading, GradientButton, Eyebrow } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pallabi Das — I build brands that grow, sell & scale" },
      {
        name: "description",
        content:
          "Digital marketer, creator and podcast host helping ambitious brands grow with strategy, design and storytelling.",
      },
      { property: "og:title", content: "Pallabi Das — Brands that grow, sell & scale" },
      {
        property: "og:description",
        content: "Marketing, branding, design, podcast and courses.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const services = [
  {
    icon: Search,
    title: "SEO & Growth",
    desc: "On-page, technical and off-page SEO that compounds.",
  },
  {
    icon: Megaphone,
    title: "Performance Marketing",
    desc: "Paid social and search that pays for itself.",
  },
  {
    icon: Palette,
    title: "Branding & Design",
    desc: "Identities, creatives and ads with a point of view.",
  },
  {
    icon: Sparkles,
    title: "Content Strategy",
    desc: "Story-led content that turns scrollers into clients.",
  },
];

const works = [
  { img: workBranding, title: "Brand Identity Suite", tag: "Branding" },
  { img: workCampaign, title: "Social Campaign — Q4", tag: "Campaign" },
  { img: workSeo, title: "SEO Growth Sprint", tag: "Marketing" },
];

const episodes = [
  {
    title: "Mindset shifts for ambitious creators",
    duration: "32 min",
    cat: "Mindset",
  },
  {
    title: "Building a brand from scratch in 2025",
    duration: "41 min",
    cat: "Career",
  },
  { title: "Real talk: burnout and boundaries", duration: "28 min", cat: "Real Talk" },
];

const testimonials = [
  {
    quote:
      "Pallabi rebuilt our brand and our growth engine in 60 days. Revenue is up 3.4x and we finally feel premium.",
    name: "Aarav Mehta",
    role: "Founder, Kindred Studio",
  },
  {
    quote:
      "The clearest marketing thinker I've worked with. Strategy + execution under one roof. Rare.",
    name: "Ishita Roy",
    role: "Director, Lumen Labs",
  },
  {
    quote:
      "Our SEO traffic 6x'd in five months. She just gets the modern internet.",
    name: "David Cole",
    role: "CEO, Northbeam",
  },
];

const stats = [
  { v: "6+", l: "Years in marketing" },
  { v: "80+", l: "Brands grown" },
  { v: "12M+", l: "Impressions delivered" },
  { v: "3.4x", l: "Avg client growth" },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <Section className="!pt-10 !pb-16 sm:!pt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="md:col-span-1 lg:col-span-7 space-y-8 animate-fade-up">
            <Eyebrow>Digital marketer · creator · podcast host</Eyebrow>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]">
              I build <span className="gradient-text">brands</span> that
              <br /> grow, sell &amp; scale digitally.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Hi, I'm Pallabi — a marketer-creator hybrid blending strategy,
              storytelling and design to help ambitious founders win the modern
              internet.
            </p>
            <div className="flex flex-wrap gap-3">
              <GradientButton to="/contact">Work with me</GradientButton>
              <GradientButton to="/portfolio" variant="ghost">Explore my work</GradientButton>
            </div>

            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/pallabi_talks", label: "Instagram" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/pallabi-das786/", label: "LinkedIn" },
                { Icon: Facebook, href: "https://www.facebook.com/share/1DGav6dh6L/", label: "Facebook" },
                { Icon: Youtube, href: "https://youtube.com/@pallabi-talks?si=amUbtoAhydiBsqA8", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full glass border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <span className="text-xs text-muted-foreground">Follow along</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats.map((s) => (
                <div key={s.l} className="glass rounded-2xl p-4">
                  <div className="text-2xl font-display font-bold gradient-text">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-5 relative">
            <div className="absolute -inset-10 bg-[image:var(--gradient-radial)] blur-2xl pointer-events-none" />
            <div className="relative gradient-border p-1.5 animate-float max-w-xs mx-auto sm:max-w-sm md:max-w-none">
              <div className="overflow-hidden rounded-[calc(var(--radius-xl)-2px)] relative noise">
                <img
                  src="/hero_section.png"
                  alt="Portrait of Pallabi Das"
                  width={1024}
                  height={1280}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full object-cover object-top max-h-[52vh] md:max-h-none"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* MARQUEE */}
      <div className="border-y border-border/40 bg-surface/30 overflow-hidden py-6">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-2xl font-display text-muted-foreground/60">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              {[
                "Strategy",
                "✦",
                "SEO",
                "✦",
                "Branding",
                "✦",
                "Performance",
                "✦",
                "Content",
                "✦",
                "Design",
                "✦",
                "Storytelling",
                "✦",
              ].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SNAPSHOT */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <SectionHeading
            eyebrow="About me"
            title={<>Marketing brain. <span className="gradient-text">Creative soul.</span></>}
            subtitle="I started as a digital painter, fell in love with storytelling, and turned both into a career building brands that actually feel like something. Today I help founders, creators and small teams move faster, look sharper, and grow smarter."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Digital painter", num: "01" },
              { label: "SEO strategist", num: "02" },
              { label: "Brand designer", num: "03" },
              { label: "Podcast host", num: "04" },
            ].map((c) => (
              <div key={c.num} className="glass-card p-6">
                <div className="text-sm text-muted-foreground">{c.num}</div>
                <div className="mt-6 font-display text-xl font-semibold">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-glow transition-colors"
          >
            Read my full story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <SectionHeading
          eyebrow="Services"
          title={<>Everything you need <span className="gradient-text">under one roof</span>.</>}
          subtitle="From strategy to creative to scale — modular services built to plug into the way your brand actually works."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {services.map((s) => (
            <div key={s.title} className="glass-card p-6 group">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground glow-ring">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <Link
                to="/services"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-3 transition-all"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* PORTFOLIO PREVIEW */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured work"
            title={<>Selected <span className="gradient-text">projects</span>.</>}
          />
          <Link to="/portfolio" className="text-sm font-semibold text-primary inline-flex items-center gap-2">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {works.map((w, i) => (
            <Link
              to="/portfolio"
              key={w.title}
              className={`group relative overflow-hidden rounded-3xl border border-border/40 ${
                i === 0 ? "md:row-span-2 md:col-span-1" : ""
              }`}
            >
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                className="w-full h-72 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="text-xs uppercase tracking-widest text-primary">{w.tag}</div>
                <div className="mt-1 font-display text-lg font-semibold">{w.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* PODCAST PREVIEW */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden gradient-border p-1">
            <img
              src={podcastCover}
              alt="Pallabi Talks podcast cover"
              loading="lazy"
              className="w-full rounded-[calc(var(--radius-xl)-2px)]"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Pallabi Talks"
              title={<>The <span className="gradient-text">podcast</span> for ambitious creators.</>}
              subtitle="Conversations on mindset, marketing, and the messy middle of building something of your own."
            />
            <ul className="mt-10 space-y-3">
              {episodes.map((e, i) => (
                <li key={e.title} className="glass-card p-5 flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-primary uppercase tracking-widest">
                      Ep · 0{i + 1} · {e.cat}
                    </div>
                    <div className="font-display font-semibold mt-0.5">{e.title}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{e.duration}</div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <GradientButton to="/podcast">Listen to all episodes</GradientButton>
            </div>
          </div>
        </div>
      </Section>

      {/* BOOKS */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Books by Pallabi"
          title={<>Words that <span className="gradient-text">move you forward</span>.</>}
          subtitle="Practical reads for creators, designers and anyone building something meaningful."
        />
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 mt-16 max-w-4xl mx-auto">
          {[
            {
              cover: "/book-start-designing.avif",
              title: "Start Designing",
              desc: "A beginner-friendly guide to visual thinking and design fundamentals for modern creators.",
              url: "https://amzn.in/d/0b4NVeCp",
              tag: "Design",
              accent: "oklch(0.65 0.27 295)",
            },
            {
              cover: "/book-hope-dont-let-go.avif",
              title: "Hope — Don't Let Go",
              desc: "An honest and heartfelt book on resilience, ambition, and holding on when it feels impossible.",
              url: "https://amzn.in/d/06Rc1uB5",
              tag: "Mindset",
              accent: "oklch(0.72 0.2 240)",
            },
          ].map((book) => (
            <a
              key={book.title}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center text-center"
            >
              {/* Ambient glow behind the card */}
              <div
                className="absolute top-8 left-1/2 -translate-x-1/2 w-56 h-72 rounded-full blur-3xl opacity-25 transition-opacity duration-500 group-hover:opacity-50 pointer-events-none"
                style={{ background: book.accent }}
              />

              {/* Book cover */}
              <div className="relative w-64 sm:w-72">
                {/* Bottom page-stack effect */}
                <div className="absolute bottom-0 left-2 right-2 h-full rounded-2xl border border-white/5 bg-white/5 translate-y-1 translate-x-2 scale-[0.97] transition-all duration-500 group-hover:translate-y-2 group-hover:translate-x-3" />
                <div className="absolute bottom-0 left-2 right-2 h-full rounded-2xl border border-white/5 bg-white/5 translate-y-0.5 translate-x-1 scale-[0.985] transition-all duration-500 group-hover:translate-y-1 group-hover:translate-x-1.5" />

                {/* Main cover */}
                <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_32px_64px_-16px_oklch(0_0_0/0.7)] transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_48px_80px_-16px_oklch(0_0_0/0.8)]">
                  <img
                    src={book.cover}
                    alt={book.title}
                    loading="lazy"
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Left spine shine */}
                  <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
                  {/* Top gloss */}
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Tag badge */}
                <div className="absolute -top-4 -right-4 rounded-full bg-[image:var(--gradient-primary)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/30">
                  {book.tag}
                </div>
              </div>

              {/* Info */}
              <div className="mt-10 space-y-3 px-2">
                <div className="flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight">{book.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">{book.desc}</p>
                <div className="pt-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-primary/50 group-hover:gap-3">
                    <BookOpen className="h-4 w-4" />
                    Buy on Amazon
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* RESEARCH PAPER */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden gradient-border p-1 max-w-sm mx-auto lg:mx-0">
            <img
              src="/research-ai-graphic-design.jpg"
              alt="Research paper cover — AI in Graphic Design"
              loading="lazy"
              className="w-full rounded-[calc(var(--radius-xl)-2px)] object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Research & Writing"
              title={<>Published <span className="gradient-text">research paper</span>.</>}
              subtitle="Exploring the frontier where artificial intelligence meets visual creativity."
            />
            <div className="mt-8 glass-card p-7 space-y-5">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                    Published · Brainware University
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug">
                    Artificial Intelligence in Graphic Design: Revolution or Replacement?
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    A peer-reviewed study investigating how AI tools are reshaping the graphic design landscape — questioning whether they empower human creativity or risk making the designer obsolete.
                  </p>
                </div>
              </div>
              <a
                href="https://www.brainwareuniversity.ac.in/brainwave-papers/index.php/bamj/article/view/55"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Read the paper <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* COURSES BRIDGE */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Courses & bridge programs"
          title={<>Learn what I <span className="gradient-text">actually use</span>.</>}
          subtitle="Practical, no-fluff programs to help you launch, grow and monetize."
        />
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {[
            { t: "AI + Digital Marketing", d: "6 weeks · cohort", price: "₹9,999" },
            { t: "Beginner SEO Mastery", d: "4 weeks · self-paced", price: "₹4,999" },
            { t: "Branding Basics", d: "3 weeks · live", price: "₹6,499" },
          ].map((c) => (
            <div key={c.t} className="glass-card p-7">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{c.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-2xl font-display font-bold gradient-text">{c.price}</div>
                <Link
                  to="/courses"
                  className="rounded-full glass px-4 py-2 text-xs font-semibold hover:border-primary/40"
                >
                  Enroll
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Words from <span className="gradient-text">people I've worked with</span>.</>}
        />
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass-card p-7 flex flex-col">
              <Quote className="h-8 w-8 text-primary" />
              <blockquote className="mt-4 text-base leading-relaxed flex-1">"{t.quote}"</blockquote>
              <div className="mt-6 flex items-center justify-between">
                <figcaption>
                  <div className="font-display font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[2rem] glass-card p-10 sm:p-16 text-center noise">
          <div className="absolute inset-0 bg-[image:var(--gradient-radial)] opacity-70 pointer-events-none" />
          <div className="relative">
            <Eyebrow>Let's build</Eyebrow>
            <h2 className="mt-6 text-4xl sm:text-6xl font-display font-bold">
              Ready to make your brand <br />
              <span className="gradient-text">unmissable?</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
              Book a free 20-minute strategy call. Walk away with a clear next move
              — whether we work together or not.
            </p>
            <div className="mt-10 flex justify-center gap-3 flex-wrap">
              <GradientButton to="/contact">Book a call</GradientButton>
              <GradientButton to="/services" variant="ghost">See services</GradientButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
