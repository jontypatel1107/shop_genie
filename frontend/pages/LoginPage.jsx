import { useState } from "react";
import { ArrowRight, Info, MessageCircleMore } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";
import { CREATE_ACCOUNT_ROUTE, DASHBOARD_ROUTE, RESET_PASSWORD_ROUTE, VERIFY_ACCOUNT_ROUTE } from "../routes";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, updateUser } = useAuth();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            token: tokenResponse.access_token,
            isAccessToken: true 
          }),
        });
        const data = await res.json();
        if (res.ok) {
          updateUser(data.data.user);
          navigate(DASHBOARD_ROUTE);
        } else {
          setError(data.message || "Google login failed");
        }
      } catch (err) {
        setError("Something went wrong with Google login");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError("Google login was unsuccessful"),
  });

  const handleResendVerification = async () => {
    setResending(true);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: unverifiedEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setResent(true);
        setTimeout(() => navigate(VERIFY_ACCOUNT_ROUTE), 2000);
      }
    } catch (err) {
      setError("Failed to resend verification code");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.identifier || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(form.identifier, form.password);
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      const message = err.message || "";
      if (message.includes("verify")) {
        setUnverifiedEmail(form.identifier);
        setError("unverified");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#f4f6f8] text-[#2e333b]">
      <section className="relative flex min-h-[100dvh] w-full items-center justify-center px-4 py-5 sm:px-8 lg:px-12">
        <div className="w-full max-w-[430px] overflow-hidden rounded-xl bg-[#e3e7ec] shadow-[0_24px_70px_rgba(30,41,59,0.12)]">
          <div className="flex flex-col items-center px-5 pb-8 pt-12 text-center sm:px-8">
            <BrandLogo
              className="flex-col gap-4"
              iconClassName="h-[76px] w-[76px] bg-[#93eadb] text-[#0d6f66]"
              textClassName="text-[1.75rem]"
            />
            <p className="mt-1 text-sm font-bold text-[#727983]">Welcome back, neighbor.</p>
          </div>

          <form className="rounded-t-[1.35rem] bg-white px-5 py-7 sm:px-8" onSubmit={handleSubmit}>
            {error === "unverified" ? (
              <div className="mb-4 rounded-md bg-[#ffe8b8] px-4 py-4 text-sm">
                <p className="font-extrabold text-[#8a5a00]">Email not verified</p>
                <p className="mt-1 font-semibold text-[#a06800]">
                  Please verify your email before logging in.
                </p>
                {resent ? (
                  <p className="mt-2 font-bold text-[#0f756b]">Verification code resent! Redirecting...</p>
                ) : (
                  <button
                    className="mt-3 rounded-md bg-[#0f756b] px-4 py-2 text-sm font-extrabold text-white disabled:opacity-50"
                    disabled={resending}
                    onClick={handleResendVerification}
                    type="button"
                  >
                    {resending ? "Sending..." : "Resend Verification Code"}
                  </button>
                )}
              </div>
            ) : error ? (
              <div className="mb-4 rounded-md bg-[#ffd9db] px-4 py-3 text-sm font-semibold text-[#d43238]">
                {error}
              </div>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm font-extrabold text-[#303640]">
                Phone Number or Email
              </span>
              <input
                className="h-14 w-full rounded-md border border-transparent bg-[#d9dee4] px-4 text-base font-semibold text-[#343a43] outline-none transition placeholder:text-[#79818a] focus:border-[#0f756b] focus:bg-white"
                name="identifier"
                onChange={handleChange}
                placeholder="Enter your details"
                type="text"
                value={form.identifier}
              />
            </label>

            <label className="mt-3 block">
              <span className="mb-2 block text-sm font-extrabold text-[#303640]">
                Password
              </span>
              <input
                className="h-14 w-full rounded-md border border-transparent bg-[#d9dee4] px-4 text-base font-semibold text-[#343a43] outline-none transition placeholder:text-[#79818a] focus:border-[#0f756b] focus:bg-white"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                type="password"
                value={form.password}
              />
            </label>

            <div className="mt-3 flex gap-3 rounded-md bg-[#d6f5ff] px-4 py-3 text-left text-xs font-semibold leading-5 text-[#17616f]">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>We&apos;ll send a 6-digit secure code to your device to verify it&apos;s really you.</p>
            </div>

            <button
              className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#087466] px-6 text-base font-extrabold text-white shadow-[0_16px_28px_rgba(8,116,102,0.22)] transition hover:-translate-y-0.5 disabled:opacity-50"
              disabled={loading}
              type="submit"
            >
              {loading ? "Signing In..." : "Sign In"}
              <ArrowRight className="h-5 w-5" />
            </button>

            <p className="mt-4 text-center text-xs font-medium leading-5 text-[#6f7680]">
              By signing in, you agree to our Terms and Privacy Policy.
            </p>

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#e7eaee]" />
              <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#8a919a]">
                Or continue with
              </span>
              <span className="h-px flex-1 bg-[#e7eaee]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex items-center justify-center gap-3 h-12 rounded-md bg-[#d9dee4] text-sm font-extrabold text-[#4c535d] transition hover:bg-[#cfd5dc]"
                onClick={() => googleLogin()}
                type="button"
                disabled={loading}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="h-5 w-5" alt="Google" />
                Google
              </button>
              <button
                className="h-12 rounded-md bg-[#d9dee4] text-sm font-extrabold text-[#4c535d] transition hover:bg-[#cfd5dc]"
                type="button"
              >
                Apple
              </button>
            </div>

            <p className="mt-8 text-center text-sm font-medium text-[#6f7680]">
              New to ShopGenie?{" "}
              <Link className="font-extrabold text-[#0f6f66]" to={CREATE_ACCOUNT_ROUTE}>
                Start your store
              </Link>
            </p>
            <p className="mt-3 text-center text-sm">
              <Link className="font-bold text-[#0f6f66]" to={RESET_PASSWORD_ROUTE}>
                Forgot password?
              </Link>
            </p>
          </form>

          <div className="relative h-36 overflow-hidden sm:h-44">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(20,11,4,0.2))]" />
          </div>
        </div>

        <button
          aria-label="Chat support"
          className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f756b] shadow-[0_18px_40px_rgba(15,23,42,0.15)] transition hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
          type="button"
        >
          <MessageCircleMore className="h-5 w-5" />
        </button>
      </section>
    </main>
  );
}