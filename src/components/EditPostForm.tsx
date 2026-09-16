"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import api from "@/lib/api";

export default function EditPostForm({
  postId,
  initialTitle,
  initialBody,
  initialImageUrl,
}: {
  postId: string;
  initialTitle: string;
  initialBody: string;
  initialImageUrl: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [imageFile, setImageFile] = useState<File | null>(null);
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
      let imageUrl = initialImageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.url;
      }

      await api.put(`/posts/${postId}`, { title, body, imageUrl });
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-pink px-8 py-16">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="font-heading font-bold text-3xl text-brand-maroon">Edit Post</h1>

        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-brand-maroon/30 rounded-lg px-4 py-2 text-lg font-heading"
        />

        <div>
          <label className="block text-sm font-bold text-brand-maroon mb-2">
            Replace cover image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
        </div>

        <RichTextEditor content={body} onChange={setBody} />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-maroon text-white font-bold py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}