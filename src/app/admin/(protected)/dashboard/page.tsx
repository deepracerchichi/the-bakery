import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Posts";
import Link from "next/link";
import Image from "next/image";
import DeletePostButton from "@/components/DeletePostButton";

export default async function DashboardPage() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="px-8 py-12 max-w-4xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-heading font-bold text-4xl text-brand-maroon">Dashboard</h1>
          <p className="text-brand-maroon/60 mt-1">
            {posts.length} {posts.length === 1 ? "post" : "posts"} published
          </p>
        </div>
        <Link
          href="/admin/new-post"
          className="bg-brand-maroon text-white font-bold px-5 py-3 rounded-full hover:opacity-90 transition [box-shadow:4px_4px_0_var(--color-brand-maroon)] hover:[box-shadow:2px_2px_0_var(--color-brand-maroon)] hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          + New Post
        </Link>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-brand-maroon/60">No posts yet — write your first one.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post._id.toString()}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-brand-pink">
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-heading font-bold text-brand-maroon text-lg truncate">
                  {post.title}
                </h2>
                <p className="text-sm text-brand-maroon/50">
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href={`/posts/${post._id.toString()}`}
                  className="text-sm text-brand-maroon/60 hover:text-brand-maroon hover:underline"
                >
                  View
                </Link>
                <Link
                  href={`/admin/edit/${post._id.toString()}`}
                  className="text-sm font-bold text-brand-maroon hover:underline"
                >
                  Edit
                </Link>
                <DeletePostButton postId={post._id.toString()} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}