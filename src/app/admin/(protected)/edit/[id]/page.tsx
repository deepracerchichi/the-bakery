import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Posts";
import { notFound } from "next/navigation";
import EditPostForm from "@/components/EditPostForm";

export default async function EditPostPage({
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
    <EditPostForm
      postId={id}
      initialTitle={post.title}
      initialBody={post.body}
      initialImageUrl={post.imageUrl ?? ""}
    />
  );
}