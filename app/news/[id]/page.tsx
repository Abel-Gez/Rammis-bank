"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Comments from "@/components/comments";

const API_HOST = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const PUBLIC_API_BASE = `${API_HOST}/api`;

type Post = {
  id: number
  title: string
  content: string
  excerpt?: string
  category?: string
  author?: string
  publishDate?: string
  views?: number
  image?: string | null
}

export default function BlogDetailPage() {
  const params = useParams()
  const idParam = params?.id
  const id = useMemo(() => (Array.isArray(idParam) ? idParam[0] : idParam), [idParam])
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return
      try {
        setLoading(true)
        const res = await fetch(`${PUBLIC_API_BASE}/v1/posts/${id}/`, {
          cache: "no-store",
        })

        if (!res.ok) throw new Error("Could not load article")

        const data = await res.json()
        setPost(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("We couldn't find that article. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-600">Loading article...</main>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
          <p className="text-lg text-rammisBlue">{error || "Article not available."}</p>
          <Link href="/news" className="text-rammisBlue underline">
            Back to news
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-sm text-rammisBlue/70 uppercase tracking-wide">Media & News</p>
            <h1 className="text-4xl font-bold text-rammisBlue">{post.title}</h1>
            {post.publishDate ? (
              <p className="text-sm text-gray-500">
                {new Date(post.publishDate).toLocaleDateString()} {post.author ? `· By ${post.author}` : ""}
              </p>
            ) : null}
          </div>

          {post.image ? (
            <img
              src={post.image.startsWith("http") ? post.image : `/placeholder.svg`}
              alt={post.title}
              className="w-full rounded-3xl shadow-lg"
            />
          ) : (
            <img src="/placeholder.svg" alt="Placeholder" className="w-full rounded-3xl shadow-lg" />
          )}

          <article className="prose prose-lg max-w-none prose-headings:text-rammisBlue prose-a:text-rammisBlue/90">
            <p className="leading-relaxed text-gray-700 whitespace-pre-line">{post.content}</p>
          </article>

          <section className="border-t border-rammisBlue/10 pt-10">
            <Comments postId={post.id} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
