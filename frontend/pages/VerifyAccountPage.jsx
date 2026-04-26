import { useState } from "react";
import { ArrowLeft, HelpCircle, Mail, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";
import { CATEGORY_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE } from "../routes";

const otpSlots = Array.from({ length: 6 }, (_, index) => index);

export default function VerifyAccountPage() {
  const navigate = useNavigate();
  const { verifyEmail, user } = useAuth();
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const maskedEmail = user?.email
    ? user.email.replace(/(.{1,3})(.*)(@.*)/, "$1***$3")
    : "your email";

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError("");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });
    setCode(newCode);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await verifyEmail(fullCode);
      setSuccess(true);
      setTimeout(() => navigate(DASHBOARD_ROUTE), 2000);
    } catch (err) {
      setError(err.message || "Invalid verification code. Please try again.");
      setCode(Array(6).fill(""));
    } finally {
      setLoading(false);
    }
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
          {success ? (
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-12 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:px-8">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#baf3e9] text-[#0f756b]">
                <ShieldCheck className="h-10 w-10" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold text-[#0f756b]">Account Created Successfully!</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm font-semibold text-[#626a74]">
                Your account has been verified. Redirecting you to your dashboard...
              </p>
              <div className="mx-auto mt-6 h-2 w-48 max-w-full rounded-full bg-[#eef2f5]">
                <div className="h-2 w-1/2 animate-pulse rounded-full bg-[#0f756b]" />
              </div>
            </div>
          ) : (
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
                  <p className="text-sm font-medium text-[#6f7680]">Sent to {maskedEmail}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-6 gap-2 sm:gap-3">
                {otpSlots.map((slot) => (
                  <input
                    aria-label={`OTP digit ${slot + 1}`}
                    className="aspect-[0.82] min-h-14 rounded-md border border-transparent bg-[#d7dce2] text-center text-xl font-extrabold text-[#303640] outline-none transition focus:border-[#0f756b] focus:bg-white sm:min-h-20"
                    id={`otp-${slot}`}
                    inputMode="numeric"
                    key={slot}
                    maxLength="1"
                    onChange={(e) => handleChange(slot, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(slot, e)}
                    onPaste={handlePaste}
                    type="text"
                    value={code[slot]}
                  />
                ))}
              </div>

              {error && (
                <p className="mt-4 text-center text-sm font-semibold text-[#d43238]">{error}</p>
              )}

              <button
                className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#087466] px-6 text-base font-extrabold text-white shadow-[0_16px_28px_rgba(8,116,102,0.22)] transition hover:-translate-y-0.5 disabled:opacity-50"
                disabled={loading}
                type="submit"
              >
                {loading ? "Verifying..." : "Verify OTP"}
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
          )}

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
            <p className="text-base font-extrabold text-[#0f756b]">Trusted by 20,000+</p>
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