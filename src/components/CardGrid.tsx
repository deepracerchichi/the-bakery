"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";

interface Posts {
  _id: string;
  title: string;
  imageUrl: string;
}

const CardGrid = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const postData = await api.get("/posts");
      setPosts(postData.data);
    }
    fetchPosts();
  }, []);

  return (
    <section className="py-20 px-16">
      <h2 className="font-heading font-bold text-brand-maroon text-5xl text-center">
        Currently Serving
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {posts.map((post) => (
          <div key={post._id} className="flex flex-col">
            <div className="relative w-full h-40 sm:h-100 md:h-125">
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-2xl"
                />
              )}
              <Link
                href={`/posts/${post._id}`}
                className="font-body absolute bottom-4 left-1/2 
                  transform -translate-x-1/2 bg-white
                  text-brand-maroon font-bold py-2 px-4 rounded-full 
                  hover:bg-brand-pink transition-colors
                  [box-shadow:4px_6px_0_var(--color-brand-maroon)]"
              >
                Have a Taste!
              </Link>
            </div>
            <h3 className="font-heading font-bold text-brand-maroon text-2xl text-center mt-4">
              {post.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardGrid;