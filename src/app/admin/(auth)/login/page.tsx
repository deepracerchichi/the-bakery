"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await api.post("/login", { username, password });
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-pink px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Link href="/" className="text-brand-maroon text-sm text-center hover:underline">
          ← Back to site
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 flex flex-col gap-5 [box-shadow:6px_6px_0_var(--color-brand-maroon)]"
        >
          <div className="text-center">
            <h1 className="font-heading font-bold text-3xl text-brand-maroon">The Bakery</h1>
            <p className="text-sm text-brand-maroon/60 mt-1">Admin login</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide text-brand-maroon/70">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-brand-maroon/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wide text-brand-maroon/70">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-brand-maroon/30 rounded-lg px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-brand-maroon"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="hover:pointer absolute right-3 top-1/2 -translate-y-1/2 text-brand-maroon/60 hover:text-brand-maroon"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-maroon text-white font-bold py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}