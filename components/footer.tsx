import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-black pt-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-white/90 font-semibold">MovieMunch</p>
          <p className="text-white/60 text-sm">Discover and track movies you love.</p>
        </div>

        <nav className="flex items-center gap-5 text-sm">
          <Link href="#" className="text-white/70 hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="text-white/70 hover:text-white transition-colors">Terms</Link>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-6 pb-8">
        <p className="text-white/50 text-xs text-center sm:text-left">
          © {new Date().getFullYear()} MovieMunch. All rights reserved.
        </p>
      </div>
    </footer>
  );
};