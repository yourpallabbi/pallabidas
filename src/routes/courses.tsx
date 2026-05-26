import { createFileRoute } from "@tanstack/react-router";
import { Section, GradientButton, Eyebrow } from "@/components/ui-bits";
import { GraduationCap, Clock, Users, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { getCourses, type Course } from "@/admin/lib/db";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses & Bridge Programs — Pallabi Das" },
      {
        name: "description",
        content:
          "Practical, no-fluff courses on AI marketing, SEO and branding for creators and founders.",
      },
      { property: "og:title", content: "Courses — Pallabi Das" },
      {
        property: "og:description",
        content: "AI Marketing, SEO and Branding programs.",
      },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses().then(({ data }) => {
      setCourses(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Section className="!pt-10">
        <Eyebrow>Courses & bridge programs</Eyebrow>
        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl">
          Learn the way I <span className="gradient-text">actually work</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Practical programs built from real client work — no fluff, no filler, no
          5-hour theory videos. Just the moves that move the needle.
        </p>
      </Section>

      <Section className="!pt-0">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading courses...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((c) => (
              <div
                key={c.id}
                className={`glass-card p-7 flex flex-col relative ${
                  c.featured ? "lg:scale-[1.03] gradient-border" : ""
                }`}
              >
                {c.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--gradient-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Most popular
                  </div>
                )}
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="mt-5 text-xs uppercase tracking-widest text-primary">{c.tag}</div>
                <h3 className="mt-1 font-display text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>

                <div className="mt-5 flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {c.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" /> {c.seats}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 flex-1">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center justify-between">
                  <div className="text-3xl font-display font-bold gradient-text">{c.price}</div>
                  <GradientButton to="/contact">Enroll</GradientButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section>
        <div className="glass-card p-10 sm:p-14 grid md:grid-cols-3 gap-10">
          {[
            { v: "1,200+", l: "Students worldwide" },
            { v: "4.9 / 5", l: "Average rating" },
            { v: "92%", l: "Completion rate" },
          ].map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="font-display text-5xl font-bold gradient-text">{s.v}</div>
              <div className="mt-2 text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
