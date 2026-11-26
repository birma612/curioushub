const Loader = ({ hidden }) => {
  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-[#050505] transition-opacity duration-500 ${
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-hidden={hidden}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 animate-[spin-slow_1.2s_linear_infinite] rounded-full border-2 border-transparent border-t-accent border-r-accent/60" />
          <div className="absolute inset-3 rounded-full bg-accent/10" />
        </div>
        <p className="font-display text-3xl uppercase tracking-[0.2em] text-white">
          IRON<span className="text-accent">FORGE</span>
        </p>
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Loading Experience</p>
      </div>
    </div>
  )
}

export default Loader
