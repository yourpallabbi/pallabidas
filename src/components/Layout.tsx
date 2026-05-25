import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Linkedin, Facebook, Youtube, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/podcast", label: "Podcast" },
  { to: "/courses", label: "Courses" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav
            className={cn(
              "glass flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all",
              scrolled && "shadow-[0_10px_40px_-10px_oklch(0_0_0/0.6)]",
            )}
          >
            <Link to="/" className="flex items-center">
              <Logo className="h-10 w-auto" />
            </Link>

            <ul className="hidden lg:flex items-center gap-1">
              {NAV.map((n) => {
                const active = location.pathname === n.to;
                return (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {active && (
                        <span className="absolute inset-0 rounded-full bg-[image:var(--gradient-primary)] opacity-20" />
                      )}
                      <span className="relative">{n.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center rounded-full bg-[image:var(--gradient-primary)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
            >
              Book a Call
            </Link>

            <button
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full glass"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>

          {open && (
            <div
              className="lg:hidden mt-3 rounded-3xl p-4 animate-fade-in border border-white/10 shadow-2xl"
              style={{
                background: "oklch(0.15 0.025 280 / 0.97)",
                backdropFilter: "blur(24px) saturate(150%)",
                WebkitBackdropFilter: "blur(24px) saturate(150%)",
              }}
            >
              <ul className="flex flex-col gap-1">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className={cn(
                        "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                        location.pathname === n.to
                          ? "bg-[image:var(--gradient-primary)] text-primary-foreground"
                          : "text-foreground hover:bg-white/8",
                      )}
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 pt-28">
        <Outlet />
      </main>

      <footer className="mt-32 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-md text-muted-foreground">
              I build brands that grow, sell &amp; scale digitally — blending strategy,
              creativity, and storytelling.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/pallabi_talks", label: "Instagram" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/pallabi-das786/", label: "LinkedIn" },
                { Icon: Facebook, href: "https://www.facebook.com/share/1DGav6dh6L/", label: "Facebook" },
                { Icon: Youtube, href: "https://youtube.com/@pallabi-talks?si=amUbtoAhydiBsqA8", label: "YouTube" },
                { Icon: Mail, href: "mailto:yourpallabbi@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.slice(1).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-foreground transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Get in touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:yourpallabbi@gmail.com" className="hover:text-foreground transition-colors">yourpallabbi@gmail.com</a></li>
              <li><a href="tel:+919804101114" className="hover:text-foreground transition-colors">+91 70037 73910</a></li>
              <li>Based in India · Working globally</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pallabi Das. Crafted with intention.
        </div>
      </footer>
    </div>
  );
}
