"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash, Plus, Edit } from "lucide-react";
import BlogForm from "@/components/blog";


type Post = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  featured: boolean;
  image?: string;
};

export default function BlogAdminPage() {
  const { user, loading: userLoading } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Load posts from API
  async function loadPosts() {
    try {
      setLoading(true);
      const res = await apiFetch("/v1/posts/");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error loading posts:", err);
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!userLoading && user) {
      loadPosts();
    }
  }, [userLoading, user]);

  // 🔹 Handle save (create/update)
  async function handleSave(formData: FormData, editingPost: Post | null) {
    const method = editingPost ? "PUT" : "POST";
    const url = editingPost ? `/v1/posts/${editingPost.id}/` : `/v1/posts/`;

    try {
      const res = await apiFetch(url, { method, body: formData });
      if (res.status === 401) {
        alert("Unauthorized: You don’t have permission to perform this action.");
        return;
      }
      if (!res.ok) throw new Error("Save failed");
      setOpen(false);
      setEditingPost(null);
      loadPosts();
    } catch (err) {
      console.error("Error saving post:", err);
      alert("Error saving post — check role permissions or upload settings.");
    }
  }

  // 🔹 Handle delete
  async function handleDelete(id: number) {
    if (!confirm("Delete this post?")) return;
    try {
      const res = await apiFetch(`/v1/posts/${id}/`, { method: "DELETE" });
      if (res.status === 401) {
        alert("Unauthorized: You can’t delete this post.");
        return;
      }
      if (!res.ok) throw new Error("Delete failed");
      loadPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  }

  // 🔹 Loading and auth states
  if (userLoading || loading)
    return <div className="p-10 text-center text-gray-600">Loading...</div>;

  if (error)
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );

  // 🔹 Main UI
  return (
    <ProtectedRoute requiredRoles={["ADMIN", "MARKETING"]}>
      <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-rammisBlue">
            Manage Blog Posts
          </h1>
          <Button
            className="bg-rammisBlue hover:bg-rammisBlue/90 text-white"
            onClick={() => {
              setEditingPost(null);
              setOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border border-gray-200 hover:shadow-md transition rounded-xl overflow-hidden"
            >
              {post.image && (
                <img
                 src={`${post.image}`}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle className="line-clamp-1 text-lg font-semibold">
                  {post.title}
                </CardTitle>
                <Badge>{post.category}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>
                    {new Date(post.publishDate).toLocaleDateString("en-US")}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEditingPost(post);
                      setOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      <BlogForm
        open={open}
        setOpen={setOpen}
        editingPost={editingPost}
        onSave={handleSave}
      />
      </div>
    </ProtectedRoute>
  );
}
