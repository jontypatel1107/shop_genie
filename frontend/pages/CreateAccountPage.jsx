import { ArrowRight, MessageCircleMore, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORY_ROUTE, LOGIN_ROUTE } from "../routes";

export default function CreateAccountPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(CATEGORY_ROUTE);
  };

  return (
    <main className="min-h-[100dvh] bg-[#f5f6f8] text-slate-900">
      <section className="relative flex min-h-[100dvh] w-full items-center justify-center px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <div className="grid w-full max-w-[1320px] gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-12 xl:min-h-[100dvh] xl:py-6">
          <div className="max-w-[38rem]">
            <div className="inline-flex items-center gap-3 rounded-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#19756f] text-white shadow-[0_14px_30px_rgba(25,117,111,0.22)]">
                <Store className="h-5 w-5" />
              </div>
              <p className="text-[1.55rem] font-extrabold tracking-[-0.04em] text-[#1b6f69]">
                ShopGenie
              </p>
            </div>

            <h1 className="mt-6 max-w-[32rem] text-[2.2rem] leading-[1.02] font-extrabold tracking-[-0.075em] text-[#2e3138] sm:mt-8 sm:text-[3rem] xl:text-[3.7rem]">
              Bring your shop to
              <br />
              the <span className="text-[#19756f]">digital world</span> with
              <br />
              ease.
            </h1>

            <p className="mt-4 max-w-[27rem] text-[0.95rem] leading-6 text-[#666c75] sm:mt-5 sm:text-base sm:leading-7">
              Designed for artisans, makers, and neighborhood favorites. No technical
              skills required.
            </p>

            <div className="relative mt-6 overflow-hidden rounded-[1.65rem] bg-[#593312] shadow-[0_28px_55px_rgba(30,41,59,0.14)] lg:mt-8">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(51,28,11,0.12),rgba(51,28,11,0.55))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,223,181,0.22),transparent_38%)]" />

              <div className="relative flex min-h-[12rem] items-end p-4 sm:min-h-[15rem] sm:p-5 xl:min-h-[17rem] xl:p-6">
                <div className="w-full max-w-[18rem] rounded-[1.25rem] border border-white/50 bg-white/90 px-4 py-3 shadow-[0_18px_40px_rgba(17,24,39,0.12)] backdrop-blur">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Customer testimonial"
                      className="h-10 w-10 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#30343a]">
                        &quot;ShopGenie made my website in minutes.&quot;
                      </p>
                      <p className="text-xs text-[#70757e]">Elena, Studio Bloom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-[41rem] rounded-[1.85rem] bg-[#e7eaef] p-5 shadow-[0_20px_60px_rgba(148,163,184,0.22)] sm:p-7 lg:p-8">
              <div className="max-w-[29rem]">
                <h2 className="text-[1.7rem] font-extrabold tracking-[-0.055em] text-[#2d3138] sm:text-[2rem]">
                  Create your account
                </h2>
                <p className="mt-2 text-sm text-[#747b84] sm:text-[1.02rem]">
                  Start your 14-day free trial today.
                </p>

                <form className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="mb-2.5 block text-sm font-semibold text-[#3d444d]">
                      Full Name
                    </span>
                    <input
                      className="w-full rounded-2xl border border-transparent bg-[#dce1e7] px-4 py-3 text-base text-[#32363d] outline-none transition focus:border-[#19756f] focus:bg-white sm:px-5 sm:py-3.5"
                      defaultValue="Jane Doe"
                      type="text"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2.5 block text-sm font-semibold text-[#3d444d]">
                      Business Name
                    </span>
                    <input
                      className="w-full rounded-2xl border border-transparent bg-[#dce1e7] px-4 py-3 text-base text-[#32363d] outline-none transition focus:border-[#19756f] focus:bg-white sm:px-5 sm:py-3.5"
                      defaultValue="My Neighborhood Shop"
                      type="text"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2.5 block text-sm font-semibold text-[#3d444d]">
                      Phone Number
                    </span>
                    <input
                      className="w-full rounded-2xl border border-transparent bg-[#dce1e7] px-4 py-3 text-base text-[#32363d] outline-none transition focus:border-[#19756f] focus:bg-white sm:px-5 sm:py-3.5"
                      defaultValue="+1 (555) 000-0000"
                      type="tel"
                    />
                  </label>

                  <button
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0f7c72] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_32px_rgba(15,124,114,0.28)] transition-transform duration-200 hover:-translate-y-0.5 sm:py-3.5 sm:text-lg"
                    type="submit"
                  >
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>

                <p className="mt-3 text-center text-sm text-[#727881]">
                  No credit card required. No technical skills needed.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#6e757e] sm:mt-8 lg:mt-10">
                  <p>
                    Already have an account?{" "}
                    <Link className="font-bold text-[#1a6f69]" to={LOGIN_ROUTE}>
                      Log In
                    </Link>
                  </p>
                  <Link className="hover:text-[#1a6f69]" to={LOGIN_ROUTE}>
                    Privacy Policy
                  </Link>
                  <span className="hidden text-[#9aa1aa] sm:inline">&middot;</span>
                  <Link className="hover:text-[#1a6f69]" to={LOGIN_ROUTE}>
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute right-[-1.2rem] top-1/2 hidden -translate-y-1/2 rounded-r-xl bg-[#1aa0d8] px-3 py-2 text-xs font-medium text-white shadow-lg xl:block">
              Don&apos;t worry, your
              <br />
              shop name is safe.
            </div>
          </div>
        </div>

        <button
          aria-label="Chat support"
          className="fixed bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#19756f] shadow-[0_18px_35px_rgba(15,23,42,0.12)] transition-transform duration-200 hover:-translate-y-0.5 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
          type="button"
        >
          <MessageCircleMore className="h-6 w-6" />
        </button>
      </section>
    </main>
  );
}
