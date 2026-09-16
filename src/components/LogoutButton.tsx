"use client";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await api.post("/logout");
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-brand-maroon text-sm font-bold hover:underline"
    >
      Log out
    </button>
  );
}