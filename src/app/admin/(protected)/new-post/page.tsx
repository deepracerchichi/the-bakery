"use client"

import RichTextEditor from "@/components/RichTextEditor";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function NewPostPage() {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if(!title.trim() || !body.trim()) {
            setError("Title and body are required.");
            return;
        }

        setIsSubmitting(true);

        try {
            let imageUrl ="";
            if(imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                const uploadRes = await api.post("/upload", formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                });
                imageUrl = uploadRes.data.url;

                await api.post("/posts", {title, body, imageUrl});
                router.push("/")
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to publish post. ")
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="min-h-screen bg-brand-pink px-8 py-16">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-6">
                <h1 className="font-heading font-bold text-3xl text-brand-maroon ">
                    New Post
                </h1>

                <input 
                    type="text"
                    placeholder="Post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-brand-maroon/30 rounded-lg px-4 py-2 text-lg font-heading"
                />

                <div>
                    <label className="block text-sm font-bold text-brand-maroon mb-2">
                            Cover Image(Optional)
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
                    {isSubmitting? "Publishing..." : "Publish"}
                </button>
            </form>
        </div>
    )
}
