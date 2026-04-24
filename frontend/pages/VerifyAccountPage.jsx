import { ArrowLeft, HelpCircle, Mail, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { LOGIN_ROUTE } from "../routes";

const otpSlots = Array.from({ length: 6 }, (_, index) => index);

export default function VerifyAccountPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(LOGIN_ROUTE);
  };

  return (
    <main className="min-h-[100dvh] bg-[#f4f6f8] text-[#2e333b]">
      <section className="flex min-h-[100dvh] w-full flex-col items-center px-4 py-8 sm:px-6 lg:px-10">
        <BrandLogo iconClassName="h-12 w-12" textClassName="text-[1.55rem]" />

        <div className="mt-7 text-center">
          <h1 className="text-[2rem] font-extrabold tracking-[-0.055em] text-[#30333a] sm:text-[2.45rem]">
            Verify Your Account
          </h1>
          <p className="mx-auto mt-3 max-w-[29rem] text-base font-medium leading-7 text-[#626a74] sm:text-lg">
            We&apos;ve sent a 6-digit security code to your email. Enter it below to secure your
            shop.
          </p>
        </div>

        <div className="mt-10 w-full max-w-[550px] rounded-[1.35rem] bg-[#e2e6eb] px-4 py-9 shadow-[0_22px_70px_rgba(148,163,184,0.18)] sm:px-12">
          <form
            className="mx-auto w-full rounded-xl bg-white px-5 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:px-8"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#b5f0e6] text-[#0f756b]">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-extrabold text-[#303640]">Check your inbox</p>
                <p className="text-sm font-medium text-[#6f7680]">Sent to m***@shopgenie.com</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-6 gap-2 sm:gap-3">
              {otpSlots.map((slot) => (
                <input
                  aria-label={`OTP digit ${slot + 1}`}
                  className="aspect-[0.82] min-h-14 rounded-md border border-transparent bg-[#d7dce2] text-center text-xl font-extrabold text-[#303640] outline-none transition focus:border-[#0f756b] focus:bg-white sm:min-h-20"
                  inputMode="numeric"
                  key={slot}
                  maxLength="1"
                  type="text"
                />
              ))}
            </div>

            <button
              className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#087466] px-6 text-base font-extrabold text-white shadow-[0_16px_28px_rgba(8,116,102,0.22)] transition hover:-translate-y-0.5"
              type="submit"
            >
              Verify OTP
              <ShieldCheck className="h-5 w-5" />
            </button>

            <p className="mx-auto mt-5 max-w-[21rem] text-center text-sm font-medium leading-6 text-[#6f7680]">
              Clicking verify will confirm your identity and grant access to your dashboard.
            </p>

            <div className="mt-7 flex gap-3 rounded-md bg-[#28bbed] px-4 py-4 text-left text-xs font-semibold leading-5 text-[#054760]">
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                <span className="block text-sm font-extrabold">Code not arriving?</span>
                Check your spam folder or wait 60 seconds before requesting a new code.
              </p>
            </div>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-[#6f7680]">
            Didn&apos;t receive a code?{" "}
            <button className="font-extrabold text-[#0f6f66]" type="button">
              Resend code
            </button>
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-[#69717b]">
            <Link className="inline-flex items-center gap-1 hover:text-[#0f6f66]" to={LOGIN_ROUTE}>
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
            <span className="text-[#a7adb5]">•</span>
            <button className="hover:text-[#0f6f66]" type="button">
              Contact Support
            </button>
          </div>
        </div>

        <div className="mt-12 flex min-h-36 w-full max-w-[550px] items-end justify-between overflow-hidden rounded-[1.35rem] bg-[#edf0f3] px-6 py-6 text-left shadow-[0_20px_55px_rgba(148,163,184,0.12)] sm:px-8">
          <div>
            <p className="text-base font-extrabold text-[#0f6f66]">Trusted by 20,000+</p>
            <p className="text-sm font-semibold text-[#6f7680]">Local shops around the world</p>
            <p className="mt-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b1b6bd]">
              Encrypted & Secure • ShopGenie 2026
            </p>
          </div>
          <div className="flex -space-x-2">
            <span className="h-7 w-7 rounded-full border-2 border-white bg-[#cad3dc]" />
            <span className="h-7 w-7 rounded-full border-2 border-white bg-[#94a4b5]" />
            <span className="h-7 w-7 rounded-full border-2 border-white bg-[#6e7e90]" />
          </div>
        </div>
      </section>
    </main>
  );
}
