export function GridField({ anchor = "30% 40%" }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: `radial-gradient(ellipse 70% 60% at ${anchor}, black, transparent)`,
        WebkitMaskImage: `radial-gradient(ellipse 70% 60% at ${anchor}, black, transparent)`,
      }}
    />
  );
}
