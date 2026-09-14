"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import api from "@/lib/api";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !body.trim()) {
      setError("Title and body are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/posts", { title, body });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-pink px-8 py-16">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="font-heading font-bold text-3xl text-brand-maroon">New Post</h1>

        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-brand-maroon/30 rounded-lg px-4 py-2 text-lg font-heading"
        />

        <RichTextEditor content={body} onChange={setBody} />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-maroon text-white font-bold py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
}