export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Top Right Glow */}
      <div
        className="absolute top-20 right-20 w-72 h-72 rounded-full blur-[120px]"
        style={{ background: "rgba(7, 38, 7, 0.3)" }}
      />

      {/* Bottom Left Glow */}
      <div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-[130px]"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      />

      {/* Center Glow */}
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "rgba(7, 38, 7, 0.2)" }}
      />
    </div>
  );
}
