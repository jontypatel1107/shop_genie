import { ArrowLeft, ArrowRight, BadgeCheck, HelpCircle, KeyRound, LifeBuoy, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { LOGIN_ROUTE } from "../routes";

export default function ResetPasswordPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="min-h-[100dvh] bg-[#f4f6f8] text-[#2e333b]">
      <section className="flex min-h-[100dvh] w-full flex-col">
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
          <div className="grid w-full max-w-[1100px] overflow-hidden rounded-sm bg-white shadow-[0_30px_80px_rgba(148,163,184,0.16)] lg:grid-cols-[1.04fr_1fr]">
            <div className="relative bg-[#f5f7f9] px-5 py-8 sm:px-10 lg:px-14 lg:py-16">
              <div className="absolute inset-y-0 right-0 hidden w-24 bg-[linear-gradient(90deg,rgba(245,247,249,0),rgba(200,245,238,0.28))] lg:block" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#9befdf] px-4 py-2 text-xs font-extrabold text-[#0f6f66]">
                  <BadgeCheck className="h-4 w-4" />
                  Account Security
                </div>

                <h1 className="mt-10 max-w-[30rem] text-[2.35rem] font-extrabold leading-[1.04] tracking-[-0.065em] text-[#30333a] sm:text-[3rem] lg:text-[3.55rem]">
                  Don&apos;t worry, we&apos;ll help you get{" "}
                  <span className="text-[#0f6f66]">back in.</span>
                </h1>

                <p className="mt-7 max-w-[32rem] text-base font-medium leading-8 text-[#5f6873]">
                  Forgot your password? It happens to the best of us. Just let us know which email
                  or phone number you used to sign up, and we&apos;ll send you a link to reset it.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0f756b] shadow-sm">
                      <BadgeCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-extrabold text-[#303640]">Secure Recovery</p>
                      <p className="max-w-[26rem] text-sm font-medium leading-6 text-[#6b737d]">
                        We use multi-factor verification to ensure only you can access your shop.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0f756b] shadow-sm">
                      <LifeBuoy className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-extrabold text-[#303640]">Real-time Support</p>
                      <p className="max-w-[26rem] text-sm font-medium leading-6 text-[#6b737d]">
                        If you&apos;re having trouble receiving the code, our concierge team is
                        standing by.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center px-5 py-8 sm:px-10 lg:px-14">
              <div className="absolute right-5 top-1/2 hidden h-36 w-36 -translate-y-1/2 rotate-12 rounded-2xl bg-[#c8d3dc] opacity-70 lg:block" />

              <form className="relative w-full max-w-[450px]" onSubmit={handleSubmit}>
                <div className="text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6ebf1] text-[#0f756b]">
                    <KeyRound className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 text-[1.75rem] font-extrabold tracking-[-0.045em] text-[#30333a]">
                    Reset Password
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[#6f7680]">
                    Enter your credentials to continue
                  </p>
                </div>

                <label className="mt-9 block">
                  <span className="mb-2 block text-sm font-extrabold text-[#303640]">
                    Email Address or Phone Number
                  </span>
                  <span className="relative block">
                    <input
                      className="h-16 w-full rounded-md border border-transparent bg-[#d9dee4] px-4 pr-12 text-base font-semibold text-[#343a43] outline-none transition placeholder:text-[#7b838d] focus:border-[#0f756b] focus:bg-white"
                      placeholder="e.g. alex@shopgenie.com"
                      type="text"
                    />
                    <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7c8590]" />
                  </span>
                </label>

                <div className="mt-4 flex gap-3 rounded-md bg-[#22b9ee] px-4 py-4 text-left text-xs font-semibold leading-5 text-[#06485f]">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    <span className="font-extrabold">Pro tip:</span> Use the contact info linked
                    to your shop&apos;s primary admin account for the fastest recovery.
                  </p>
                </div>

                <button
                  className="mt-8 inline-flex h-16 w-full items-center justify-center gap-2 rounded-md bg-[#087466] px-6 text-base font-extrabold text-white shadow-[0_16px_28px_rgba(8,116,102,0.22)] transition hover:-translate-y-0.5"
                  type="submit"
                >
                  Reset Password
                  <ArrowRight className="h-5 w-5" />
                </button>

                <p className="mt-4 text-center text-xs font-medium leading-5 text-[#6f7680]">
                  By clicking reset, we&apos;ll send a secure validation link to your inbox.
                </p>

                <div className="my-8 h-px bg-[#edf0f3]" />

                <Link
                  className="mx-auto inline-flex w-full items-center justify-center gap-2 text-sm font-extrabold text-[#0f6f66]"
                  to={LOGIN_ROUTE}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </form>
            </div>
          </div>
        </div>

        <footer className="px-4 pb-7 text-center">
          <BrandLogo
            className="justify-center gap-2"
            iconClassName="h-5 w-5 rounded-md"
            textClassName="text-sm"
          />
          <p className="mt-2 text-xs font-medium text-[#a4abb4]">
            © 2026 Secure Merchant Services. Built with empathy for small businesses.
          </p>
        </footer>
      </section>
    </main>
  );
}
