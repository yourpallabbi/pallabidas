import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Briefcase,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, getSession } from "@/admin/lib/auth";
import { useNavigate } from "@tanstack/react-router";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/courses", label: "Courses", icon: GraduationCap },
  { to: "/admin/books", label: "Books", icon: BookOpen },
  { to: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/admin/blogs", label: "Blogs", icon: FileText },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    getSession().then((s) => {
      if (!s) navigate({ to: "/admin/login" });
      else setUserEmail(s.user.email ?? "");
    });
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/admin/login" });
  };

  const isActive = (item: (typeof NAV)[0]) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-sm">
          PD
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Admin Panel</div>
          <div className="text-[11px] text-white/50 truncate max-w-[140px]">{userEmail}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-purple-500/20 to-blue-500/10 text-white border border-purple-500/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
              {active && <ChevronRight className="ml-auto h-3.5 w-3.5 text-purple-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[oklch(0.13_0.02_280)] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10 bg-[oklch(0.15_0.025_280)]">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[oklch(0.15_0.025_280)] border-r border-white/10 z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 border-b border-white/10 bg-[oklch(0.15_0.025_280)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-white/60"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-white">Admin Panel</span>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
