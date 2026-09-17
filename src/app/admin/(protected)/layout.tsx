import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-pink">
      <header className="bg-brand-maroon px-8 py-5 flex justify-between items-center">
        <Link href="/admin/dashboard" className="font-heading font-bold text-white text-xl">
          The Bakery — Admin
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-brand-pink text-sm hover:underline">
            View site
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}