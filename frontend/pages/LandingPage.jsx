import {
  ArrowRight,
  CheckCircle2,
  Info,
  PackagePlus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CREATE_ACCOUNT_ROUTE, LOGIN_ROUTE } from "../routes";

const metrics = [
  { value: "3m", label: "Setup time" },
  { value: "0", label: "Coding skills" },
  { value: "24/7", label: "Support" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const goToCreateAccount = () => {
    navigate(CREATE_ACCOUNT_ROUTE);
  };

  return (
    <main className="min-h-[100dvh] bg-[#161616] text-slate-900">
      <section className="grid min-h-[100dvh] bg-[#f6f4ee] lg:grid-cols-[0.98fr_1fr]">
        <div className="flex flex-col justify-between overflow-hidden px-5 py-6 sm:px-10 sm:py-8 lg:overflow-visible lg:px-14 lg:py-8">
          <div>
            <div className="mb-8 inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f7c72] text-white shadow-lg shadow-[#0f7c72]/20 sm:h-11 sm:w-11">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <p className="text-lg font-extrabold text-[#165f58] sm:text-xl">ShopGenie</p>
            </div>

            <div className="max-w-xl">
              <h1 className="text-[2.5rem] font-extrabold leading-[0.95] tracking-[-0.06em] text-[#252933] sm:text-[3.8rem] lg:text-[4.35rem]">
                Your craft
                <br />
                deserves a
                <br />
                <span className="text-[#0f7c72]">beautiful</span>
                <br />
                home.
              </h1>

              <p className="mt-6 max-w-md text-base leading-[1.65] text-[#5d616b] sm:text-[1.05rem]">
                You&apos;re just minutes away from launching your own online shop. No code, no
                complexity, just your products and your story, ready for the world.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0f7c72] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_35px_rgba(15,124,114,0.28)] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto sm:justify-start sm:px-7"
                  onClick={goToCreateAccount}
                  type="button"
                >
                  Let&apos;s Get Started
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 flex max-w-md gap-4 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-[0_16px_45px_rgba(17,24,39,0.06)] backdrop-blur">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#0f7c72]">
                  <Info className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#26323a]">
                    Digital concierge onboarding
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#69707b]">
                    A guided setup gets your first 3 products and storefront online in just a few
                    simple steps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-5">
            <div className="grid max-w-md grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:gap-12">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-[2.15rem] font-extrabold tracking-[-0.08em] text-[#0f7c72]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#6f7580]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-[#7b8088]">
              Already have an account?{" "}
              <Link className="font-bold text-[#0f7c72]" to={LOGIN_ROUTE}>
                Log in here
              </Link>
            </p>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden sm:min-h-[460px] lg:min-h-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,15,0.18),rgba(7,17,15,0.34))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%)]" />

          <div className="absolute left-4 right-4 top-4 sm:left-7 sm:right-auto sm:top-7">
            <div className="w-full max-w-[19rem] rounded-[1.6rem] bg-white/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <img
                  alt="Founder portrait"
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                />
                <div>
                  <p className="text-sm font-bold text-black">Elena Rossi</p>
                  <p className="text-xs text-black/70">Founder, Terra Ceramics</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-black">
                &quot;ShopGenie turned my weekend hobby into a full-time business in less than an
                afternoon. The guidance is incredible.&quot;
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 sm:bottom-7 sm:right-7">
            <div className="w-[11rem] rounded-[1.4rem] bg-white/90 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.2)] backdrop-blur-sm sm:w-[12rem]">
              <div className="flex items-center justify-between rounded-xl bg-[#eef8f5] px-3 py-2.5">
                <div className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#3d5c58]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0f7c72]" />
                  Theme selected
                </div>
                <Sparkles className="h-3.5 w-3.5 text-[#0f7c72]" />
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#8a919a]">
                <PackagePlus className="h-3.5 w-3.5 text-[#9ca3af]" />
                Add products
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
