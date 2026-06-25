"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { Trash2, ChevronDown, ChevronUp, PlusCircle, Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

const BLANK_FORM = {
  title: "",
  category: "",
  icon: "",
  summary: "",
  content: "",
  is_published: true,
  order_index: 0,
};

const SUGGESTED_CATEGORIES = [
  "LLC",
  "Corporation",
  "Tax & Compliance",
  "Compliance",
  "Banking & Finance",
  "Business Formation",
];

export default function AdminLearningCenterPage() {
  const router = useRouter();
  const { isAdmin, loading: authLoading, user } = useAuthContext();

  const [form, setForm] = useState(BLANK_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  // Auth guard
  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/auth/login2"); return; }
    if (!isAdmin) { router.push("/dashboard"); return; }
  }, [authLoading, user, isAdmin, router]);

  const fetchTopics = useCallback(async () => {
    setLoadingTopics(true);
    try {
      const { data, error } = await supabase
        .from("learning_topics")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      setTopics(data || []);
    } catch (err) {
      toast.error("Failed to load topics");
    } finally {
      setLoadingTopics(false);
    }
  }, []);

  useEffect(() => {
    if (user && isAdmin) fetchTopics();
  }, [user, isAdmin, fetchTopics]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin || !user) {
      toast.error("Admin access required.");
      return;
    }
    if (!form.title.trim() || !form.category.trim() || !form.summary.trim() || !form.content.trim()) {
      toast.error("Title, category, summary, and content are required.");
      return;
    }

    setSubmitting(true);
    try {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80);

      const payload = {
        title: form.title.trim(),
        slug,
        category: form.category.trim(),
        icon: form.icon.trim() || null,
        summary: form.summary.trim(),
        content: form.content.trim(),
        is_published: form.is_published,
        order_index: Number(form.order_index) || 0,
        created_by: user.id,
      };

      const { error } = await supabase.from("learning_topics").insert([payload]);
      if (error) throw error;

      toast.success("Topic published!");
      setForm(BLANK_FORM);
      fetchTopics();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to publish topic");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (topic) => {
    try {
      const { error } = await supabase
        .from("learning_topics")
        .update({ is_published: !topic.is_published })
        .eq("id", topic.id);
      if (error) throw error;
      toast.success(topic.is_published ? "Topic hidden" : "Topic published");
      fetchTopics();
    } catch (err) {
      toast.error("Failed to update topic");
    }
  };

  const deleteTopic = async (id) => {
    if (!confirm("Delete this topic? This cannot be undone.")) return;
    try {
      const { error } = await supabase.from("learning_topics").delete().eq("id", id);
      if (error) throw error;
      toast.success("Topic deleted");
      fetchTopics();
    } catch (err) {
      toast.error("Failed to delete topic");
    }
  };

  if (authLoading) return <LoadingSpinner />;
  if (!user || !isAdmin) return null;

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-10">

        {/* Add Topic Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              Add Learning Topic
            </CardTitle>
            <CardDescription>
              Topics appear on the public Learning Center page. Users can expand them to read the
              full content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  placeholder="e.g. Why an LLC is Important for Your Business"
                  required
                />
              </div>

              {/* Category + Icon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    placeholder="e.g. LLC"
                    list="category-suggestions"
                    required
                  />
                  <datalist id="category-suggestions">
                    {SUGGESTED_CATEGORIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  <p className="text-xs text-gray-400 mt-1">
                    Suggested: {SUGGESTED_CATEGORIES.join(", ")}
                  </p>
                </div>
                <div>
                  <Label htmlFor="icon">Icon (emoji)</Label>
                  <Input
                    id="icon"
                    name="icon"
                    value={form.icon}
                    onChange={onChange}
                    placeholder="e.g. 🏢"
                    maxLength={4}
                  />
                  <p className="text-xs text-gray-400 mt-1">One emoji displayed on the card</p>
                </div>
              </div>

              {/* Summary */}
              <div>
                <Label htmlFor="summary">Summary * <span className="text-gray-400 font-normal">(shown on card before expanding)</span></Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={form.summary}
                  onChange={onChange}
                  placeholder="1–2 sentence preview of what this topic covers…"
                  rows={3}
                  required
                />
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">
                  Full Content * <span className="text-gray-400 font-normal">(shown when user expands the card)</span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={onChange}
                  placeholder="Write the full educational content here. Use plain text — line breaks will be preserved. **Bold** text is supported."
                  rows={14}
                  required
                />
              </div>

              {/* Order + Published */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="order_index">Display Order</Label>
                  <Input
                    id="order_index"
                    name="order_index"
                    type="number"
                    value={form.order_index}
                    onChange={onChange}
                    min={0}
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-400 mt-1">Lower number = appears first</p>
                </div>
                <div className="flex items-end gap-3 pb-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="is_published"
                      checked={form.is_published}
                      onChange={onChange}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="text-sm font-medium">Publish immediately</span>
                  </label>
                  <p className="text-xs text-gray-400">Uncheck to save as draft</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/90 cursor-pointer"
                >
                  {submitting ? "Publishing…" : "Publish Topic"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setForm(BLANK_FORM)}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Topics ({topics.length})</CardTitle>
            <CardDescription>
              Click a topic to expand its content. Use the eye icon to toggle visibility; trash to
              delete.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingTopics ? (
              <p className="text-sm text-gray-400 py-4">Loading…</p>
            ) : topics.length === 0 ? (
              <p className="text-sm text-gray-400 py-4">
                No topics yet. Add one above — the page shows built-in seed topics until you add
                your first entry.
              </p>
            ) : (
              <div className="space-y-3">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    {/* Row header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
                      <span className="text-lg flex-shrink-0">{topic.icon || "📄"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{topic.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-xs">
                            {topic.category}
                          </Badge>
                          <Badge
                            variant={topic.is_published ? "default" : "outline"}
                            className={`text-xs ${topic.is_published ? "bg-green-100 text-green-700 border-green-200" : "text-gray-400"}`}
                          >
                            {topic.is_published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => togglePublished(topic)}
                          title={topic.is_published ? "Hide topic" : "Publish topic"}
                          className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-primary"
                        >
                          {topic.is_published ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteTopic(topic.id)}
                          title="Delete topic"
                          className="p-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            setExpandedId((prev) => (prev === topic.id ? null : topic.id))
                          }
                          className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500"
                        >
                          {expandedId === topic.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    {/* Expandable content preview */}
                    {expandedId === topic.id && (
                      <div className="px-4 py-3 border-t bg-white">
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Summary:</span> {topic.summary}
                        </p>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                          Content preview
                        </p>
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">
                          {topic.content}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
