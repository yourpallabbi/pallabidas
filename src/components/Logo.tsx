export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 52"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pallabi Talks"
    >
      <defs>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}</style>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.78 0.18 295)" />
          <stop offset="100%" stopColor="oklch(0.72 0.22 320)" />
        </linearGradient>
      </defs>

      {/* "Pallabi" */}
      <text
        x="2"
        y="40"
        fontFamily="'Great Vibes', cursive"
        fontSize="42"
        fill="currentColor"
        className="text-foreground"
      >
        Pallabi
      </text>

      {/* red wax-seal dot */}
      <circle cx="137" cy="24" r="5" fill="#c0392b" />
      <circle cx="137" cy="24" r="3.2" fill="#e74c3c" opacity="0.7" />

      {/* "Talks" */}
      <text
        x="144"
        y="40"
        fontFamily="'Great Vibes', cursive"
        fontSize="42"
        fill="currentColor"
        className="text-foreground"
      >
        Talks
      </text>
    </svg>
  );
}
