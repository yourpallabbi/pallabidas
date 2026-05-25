import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/admin/components/AdminLayout";
import { useEffect, useState } from "react";
import { getBlogs, createBlog, updateBlog, deleteBlog, type Blog } from "@/admin/lib/db";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { EmptyState, Modal, Field, TextareaField, FormActions } from "./courses";

export const Route = createFileRoute("/admin/blogs")({
  component: AdminBlogsPage,
});

const EMPTY: Omit<Blog, "id" | "created_at"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_url: "",
  category: "",
  published: false,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await getBlogs();
    setBlogs(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY });
    setShowForm(true);
    setError("");
  };

  const openEdit = (b: Blog) => {
    setEditing(b);
    setForm({ title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content, cover_url: b.cover_url, category: b.category, published: b.published });
    setShowForm(true);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) await updateBlog(editing.id, form);
      else await createBlog(form);
      setShowForm(false);
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await deleteBlog(id);
    await load();
  };

  const togglePublish = async (b: Blog) => {
    await updateBlog(b.id, { published: !b.published });
    await load();
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Blogs</h1>
            <p className="text-sm text-white/50 mt-1">{blogs.length} post{blogs.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> New Post
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-white/40">Loading...</div>
        ) : blogs.length === 0 ? (
          <EmptyState label="blog posts" onAdd={openCreate} />
        ) : (
          <div className="space-y-3">
            {blogs.map((b) => (
              <div key={b.id} className="bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                {b.cover_url && (
                  <img src={b.cover_url} alt={b.title} className="h-16 w-24 rounded-xl object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{b.title}</span>
                    <span className={`rounded-full text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider ${b.published ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/40"}`}>
                      {b.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mt-1">{b.category} · /{b.slug}</div>
                  <div className="text-xs text-white/40 mt-1 truncate">{b.excerpt}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(b)}
                    title={b.published ? "Unpublish" : "Publish"}
                    className={`grid h-8 w-8 place-items-center rounded-lg bg-white/5 transition-colors ${b.published ? "text-green-400 hover:text-white" : "text-white/40 hover:text-green-400"}`}
                  >
                    {b.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => openEdit(b)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/60 hover:text-white transition-colors">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(b.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-red-400/60 hover:text-red-400 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <Modal title={editing ? "Edit Post" : "New Post"} onClose={() => setShowForm(false)}>
            <form onSubmit={handleSave} className="space-y-4">
              <Field
                label="Title"
                value={form.title}
                onChange={(v) => setForm((f) => ({ ...f, title: v, slug: editing ? f.slug : slugify(v) }))}
              />
              <Field
                label="Slug (URL)"
                value={form.slug}
                onChange={(v) => setForm((f) => ({ ...f, slug: slugify(v) }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} />
                <Field label="Cover Image URL" value={form.cover_url} onChange={(v) => setForm((f) => ({ ...f, cover_url: v }))} />
              </div>
              <TextareaField label="Excerpt (short summary)" value={form.excerpt} onChange={(v) => setForm((f) => ({ ...f, excerpt: v }))} />
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">Content (markdown supported)</label>
                <textarea
                  required
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors resize-none font-mono"
                  placeholder="Write your blog post here..."
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="rounded"
                />
                Publish immediately
              </label>
              {error && <div className="text-sm text-red-400">{error}</div>}
              <FormActions saving={saving} onCancel={() => setShowForm(false)} />
            </form>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
}
