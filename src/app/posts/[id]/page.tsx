import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Posts";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await dbConnect();
  const post = await Post.findById(id).lean();

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-brand-pink px-8 py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {post.imageUrl && (
          <div className="relative w-full h-100">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover rounded-2xl"
            />
          </div>
        )}

        <h1 className="font-heading font-bold text-4xl text-brand-maroon">
          {post.title}
        </h1>

        <p className="text-sm text-brand-maroon/60">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div
          className="font-body text-brand-maroon prose"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </div>
    </article>
  );
}