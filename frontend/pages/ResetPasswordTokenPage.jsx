import { useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Eye, EyeOff, KeyRound, Loader2, Shield } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { LOGIN_ROUTE } from "../routes";
import SEO from "../utils/SEO";
import { apiFetch } from "../utils/apiFetch";

export default function ResetPasswordTokenPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await apiFetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      setSuccess(true);
      setTimeout(() => navigate(LOGIN_ROUTE), 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password. The link may be expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Set New Password" description="Create a new password for your ShopGenie account." />
      <main className="min-h-[100dvh] bg-[#f4f6f8] text-[#2e333b]">
        <section className="flex min-h-[100dvh] w-full flex-col">
          <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
            <div className="grid w-full max-w-[1100px] overflow-hidden rounded-sm bg-white shadow-[0_30px_80px_rgba(148,163,184,0.16)] lg:grid-cols-[1.04fr_1fr]">
              <div className="relative bg-[#f5f7f9] px-5 py-8 sm:px-10 lg:px-14 lg:py-16">
                <div className="absolute inset-y-0 right-0 hidden w-24 bg-[linear-gradient(90deg,rgba(245,247,249,0),rgba(200,245,238,0.28))] lg:block" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#9befdf] px-4 py-2 text-xs font-extrabold text-[#0f6f66]">
                    <Shield className="h-4 w-4" />
                    Secure Reset
                  </div>

                  <h1 className="mt-10 max-w-[30rem] text-[2.35rem] font-extrabold leading-[1.04] tracking-[-0.065em] text-[#30333a] sm:text-[3rem] lg:text-[3.55rem]">
                    Create your new{" "}
                    <span className="text-[#0f6f66]">password.</span>
                  </h1>

                  <p className="mt-7 max-w-[32rem] text-base font-medium leading-8 text-[#5f6873]">
                    Choose a strong password that you haven&apos;t used before. A good password has
                    at least 6 characters with a mix of letters and numbers.
                  </p>

                  <div className="mt-10 space-y-6">
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0f756b] shadow-sm">
                        <BadgeCheck className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-base font-extrabold text-[#303640]">Minimum 6 characters</p>
                        <p className="max-w-[26rem] text-sm font-medium leading-6 text-[#6b737d]">
                          Your password needs to be at least 6 characters long to keep your account secure.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0f756b] shadow-sm">
                        <Shield className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-base font-extrabold text-[#303640]">Unique Password</p>
                        <p className="max-w-[26rem] text-sm font-medium leading-6 text-[#6b737d]">
                          Don&apos;t reuse passwords from other sites. Use a password manager for best results.
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
                      {success ? "Password Updated!" : "New Password"}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-[#6f7680]">
                      {success
                        ? "Redirecting to login page..."
                        : "Enter and confirm your new password below"}
                    </p>
                  </div>

                  {error && (
                    <div className="mt-6 rounded-md bg-[#ffd9db] px-4 py-3 text-sm font-semibold text-[#d43238]">
                      {error}
                    </div>
                  )}

                  {success ? (
                    <div className="mt-6 rounded-md bg-[#e3f7f3] px-4 py-4 text-sm font-semibold text-[#0f756b]">
                      <p>Your password has been reset successfully. You can now log in with your new password.</p>
                    </div>
                  ) : (
                    <>
                      <label className="mt-9 block">
                        <span className="mb-2 block text-sm font-extrabold text-[#303640]">
                          New Password
                        </span>
                        <span className="relative block">
                          <input
                            className="h-16 w-full rounded-md border border-transparent bg-[#d9dee4] px-4 pr-12 text-base font-semibold text-[#343a43] outline-none transition placeholder:text-[#7b838d] focus:border-[#0f756b] focus:bg-white"
                            placeholder="Min 6 characters"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7c8590] hover:text-[#303640]"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </span>
                      </label>

                      <label className="mt-5 block">
                        <span className="mb-2 block text-sm font-extrabold text-[#303640]">
                          Confirm Password
                        </span>
                        <span className="relative block">
                          <input
                            className="h-16 w-full rounded-md border border-transparent bg-[#d9dee4] px-4 pr-12 text-base font-semibold text-[#343a43] outline-none transition placeholder:text-[#7b838d] focus:border-[#0f756b] focus:bg-white"
                            placeholder="Re-enter your password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </span>
                      </label>
                    </>
                  )}

                  <div className="mt-4 flex gap-3 rounded-md bg-[#d7f5ff] px-4 py-4 text-left text-xs font-semibold leading-5 text-[#07576c]">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>
                      <span className="font-extrabold">Remember:</span> This link expires in 1 hour for your security. Request a new one if it expires.
                    </p>
                  </div>

                  {!success && (
                    <button
                      className="mt-8 inline-flex h-16 w-full items-center justify-center gap-2 rounded-md bg-[#087466] px-6 text-base font-extrabold text-white shadow-[0_16px_28px_rgba(8,116,102,0.22)] transition hover:-translate-y-0.5 disabled:opacity-50"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Reset Password"}
                      {!loading && <ArrowRight className="h-5 w-5" />}
                    </button>
                  )}

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
              &copy; 2026 Secure Merchant Services. Built with empathy for small businesses.
            </p>
          </footer>
        </section>
      </main>
    </>
  );
}
