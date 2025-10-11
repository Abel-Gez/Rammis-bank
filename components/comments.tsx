"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const API_HOST = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const PUBLIC_API_BASE = `${API_HOST}/api`;

type Comment = {
  id: number;
  name: string;
  text: string;
  created_at: string;
};

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadComments() {
    try {
      setLoading(true);
      const res = await fetch(`${PUBLIC_API_BASE}/v1/comments/?post=${postId}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to load comments");

      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComments();
  }, [postId]);

  async function handleSubmit() {
    if (!name || !text) return alert("Name and comment are required.");

    try {
      const res = await fetch(`${PUBLIC_API_BASE}/v1/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: postId, name, text }),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      setName("");
      setText("");
      loadComments();
    } catch (error) {
      console.error(error);
      alert("Failed to add comment.");
    }
  }

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-3 text-lg">Comments</h3>

      <div className="space-y-4">
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((c) => (
          <div key={c.id} className="p-3 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-700">{c.text}</p>
            <p className="text-xs text-gray-500 mt-1">– {c.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          className="bg-rammisBlue hover:bg-rammisBlue/90 text-white transition-colors"
          onClick={handleSubmit}
        >
          Post Comment
        </Button>
      </div>
    </div>
  );
}
