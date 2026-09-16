"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Delete this post? This can't be undone.");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await api.delete(`/posts/${postId}`);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete post.");
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 text-sm font-bold hover:underline disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}