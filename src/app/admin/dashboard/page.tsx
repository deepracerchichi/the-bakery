import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Posts";
import Link from "next/link";
import DeletePostButton from "@/components/DeletePostButton";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-brand-pink px-8 py-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center">
        <h1 className="font-heading font-bold text-3xl text-brand-maroon">Dashboard</h1>
        <div className="flex items-center gap-4">
            <Link href="/admin/new-post" className="...">New Post</Link>
            <LogoutButton />
        </div>
      </div>

        <div className="flex flex-col gap-4">
          {posts.length === 0 && (
            <p className="text-brand-maroon/70">No posts yet.</p>
          )}
          {posts.map((post) => (
            <div
            key={post._id.toString()}
            className="bg-white rounded-lg p-4 flex justify-between items-center"
            >
            <div>
                <h2 className="font-heading font-bold text-brand-maroon">{post.title}</h2>
                <p className="text-sm text-brand-maroon/60">
                {new Date(post.createdAt).toLocaleDateString()}
                </p>
            </div>
            <DeletePostButton postId={post._id.toString()} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}