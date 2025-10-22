"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";

export default function AdminBlogsPage() {
  const router = useRouter();
  const { isAdmin, user } = useAuthContext();

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    author: "",
    posted_at: "",
    image_url: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin || !user) {
      toast.error("You must be an admin to perform this action.");
      return;
    }

    if (!form.title || !form.description || !form.category || !form.author) {
      toast.error("Please fill in category, title, description, and author.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        category: form.category,
        title: form.title,
        description: form.description,
        author: form.author,
        posted_at: form.posted_at ? new Date(form.posted_at).toISOString() : new Date().toISOString(),
        image_url: form.image_url || null,
        created_by: user.id,
      };

      const { error } = await supabase.from("blogs").insert([payload]);
      if (error) throw error;

      toast.success("Blog post created");
      setForm({ category: "", title: "", description: "", author: "", posted_at: "", image_url: "" });
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create blog post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Create Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={form.category} onChange={onChange} placeholder="e.g. Tax & Compliance" />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" name="author" value={form.author} onChange={onChange} placeholder="e.g. Sarah Johnson" />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={form.title} onChange={onChange} placeholder="Post title" />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={form.description} onChange={onChange} placeholder="Short description or excerpt" rows={6} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="posted_at">Posted At</Label>
                  <Input id="posted_at" name="posted_at" type="date" value={form.posted_at} onChange={onChange} />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input id="image_url" name="image_url" value={form.image_url} onChange={onChange} placeholder="https://..." />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={submitting} className="bg-cyan-600 hover:bg-cyan-700">
                  {submitting ? "Publishing..." : "Publish"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setForm({ category: "", title: "", description: "", author: "", posted_at: "", image_url: "" })}>
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}


