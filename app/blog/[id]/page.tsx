"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabaseClient"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

type Blog = {
  id: string
  category: string | null
  title: string
  description: string | null
  author: string | null
  posted_at: string | null
  image_url: string | null
}

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      try {
        if (!id) return
        const { data, error } = await supabase
          .from("blogs")
          .select("id, category, title, description, author, posted_at, image_url")
          .eq("id", id)
          .single()
        if (error) throw error
        if (isMounted) setPost(data as Blog)
      } catch (e) {
        if (isMounted) setPost(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [id])

  const formattedDate = post?.posted_at ? new Date(post.posted_at).toLocaleDateString() : ""

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="max-w-3xl mx-auto">
                <div className="h-8 w-2/3 bg-gray-200 animate-pulse mb-6" />
                <div className="h-5 w-1/3 bg-gray-200 animate-pulse mb-8" />
                <div className="h-64 w-full bg-gray-200 animate-pulse mb-8" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-11/12 bg-gray-200 animate-pulse" />
                  <div className="h-4 w-10/12 bg-gray-200 animate-pulse" />
                </div>
              </div>
            ) : post ? (
              <article className="max-w-3xl mx-auto">
                {post.category ? (
                  <Badge className="mb-4 bg-primary text-white">{post.category}</Badge>
                ) : null}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                  {post.author ? (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                  ) : null}
                  {formattedDate ? (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formattedDate}
                    </div>
                  ) : null}
                </div>

                {post.image_url ? (
                  <div className="relative w-full mb-8">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-auto rounded"
                    />
                  </div>
                ) : (
                  <div className="relative w-full mb-8">
                    <img
                      src={`/abstract-geometric-shapes.png?height=400&width=800&query=${encodeURIComponent(post.title)}`}
                      alt={post.title}
                      className="w-full h-auto rounded"
                    />
                  </div>
                )}

                {post.description ? (
                  <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line">{post.description}</div>
                ) : (
                  <p className="text-gray-600">No content available.</p>
                )}
              </article>
            ) : (
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-600">Article not found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


