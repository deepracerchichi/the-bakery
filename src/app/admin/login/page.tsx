"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/login", {username, password});
            router.push("/admin/new-post");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-pink px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
                >
                    <h1 className="font-heading font-bold text-2xl text-brand-maroon text-center">
                        Admin Login
                    </h1>

                    <input 
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-brand-maroon/30 rounded-lg px-4 py-2"
                    />

                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-brand-maroon/30 rounded-lg px-4 py-2"
                    />

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="bg-brand-maroon text-white font-bold py-2 rounded-full hover:opacity-90 transition"
                        >
                        Log In
                    </button>
            </form>
        </div>
    )
}