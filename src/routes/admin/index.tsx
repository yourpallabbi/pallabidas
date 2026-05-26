import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/admin/components/AdminLayout";
import { useEffect, useState } from "react";
import { getCourses, getBooks, getPortfolio, getPodcasts, getBlogs } from "@/admin/lib/db";
import { GraduationCap, BookOpen, Briefcase, Mic, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [counts, setCounts] = useState({ courses: 0, books: 0, blogs: 0, podcasts: 0, portfolio: 0 });

  useEffect(() => {
    Promise.all([getCourses(), getBooks(), getPortfolio(), getPodcasts(), getBlogs()]).then(
      ([c, b, p, pod, bl]) => {
        setCounts({
          courses: c.data?.length ?? 0,
          books: b.data?.length ?? 0,
          blogs: bl.data?.length ?? 0,
          podcasts: pod.data?.length ?? 0,
          portfolio: p.data?.length ?? 0,
        });
      }
    );
  }, []);

  const cards = [
    { label: "Courses", count: counts.courses, icon: GraduationCap, to: "/admin/courses", color: "from-purple-500 to-indigo-500" },
    { label: "Books", count: counts.books, icon: BookOpen, to: "/admin/books", color: "from-blue-500 to-cyan-500" },
    { label: "Blogs", count: counts.portfolio, icon: FileText, to: "/admin/portfolio", color: "from-fuchsia-500 to-pink-500" },
    { label: "Podcast", count: counts.podcasts, icon: Mic, to: "/admin/blogs", color: "from-orange-500 to-rose-500" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm text-white/50 mb-8">Manage your website content from here.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="group bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all hover:-translate-y-1"
            >
              <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-white mb-4`}>
                <c.icon className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-white">{c.count}</div>
              <div className="text-sm text-white/50 mt-1">{c.label}</div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-4">Quick links</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {cards.map((c) => (
              <Link
                key={c.label}
                to={c.to}
                className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <c.icon className="h-4 w-4 text-purple-400" />
                Manage {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
