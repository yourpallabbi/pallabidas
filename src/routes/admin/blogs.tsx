import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/admin/components/AdminLayout";
import { useEffect, useState } from "react";
import {
  getPodcasts,
  createPodcast,
  updatePodcast,
  deletePodcast,
  type Podcast,
} from "@/admin/lib/db";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { EmptyState, Modal, Field, FormActions } from "./courses";

export const Route = createFileRoute("/admin/blogs")({
  component: AdminPodcastPage,
});

const EMPTY: Omit<Podcast, "id" | "created_at"> = {
  title: "",
  category: "",
  duration: "",
  link: "",
  published_at: new Date().toISOString().slice(0, 10),
  published: false,
};

function AdminPodcastPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Podcast | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await getPodcasts();
    setPodcasts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY });
    setShowForm(true);
    setError("");
  };

  const openEdit = (p: Podcast) => {
    setEditing(p);
    setForm({
      title: p.title,
      category: p.category,
      duration: p.duration,
      link: p.link,
      published_at: p.published_at?.slice(0, 10) ?? "",
      published: p.published,
    });
    setShowForm(true);
    setError("");
  };

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) await updatePodcast(editing.id, form);
      else await createPodcast(form);
      setShowForm(false);
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this episode?")) return;
    await deletePodcast(id);
    await load();
  };

  const togglePublish = async (p: Podcast) => {
    await updatePodcast(p.id, { published: !p.published });
    await load();
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Podcast</h1>
            <p className="text-sm text-white/50 mt-1">
              {podcasts.length} episode{podcasts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Add Episode
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-white/40">Loading...</div>
        ) : podcasts.length === 0 ? (
          <EmptyState label="podcast episodes" onAdd={openCreate} />
        ) : (
          <div className="space-y-3">
            {podcasts.map((p, i) => (
              <div
                key={p.id}
                className="bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl p-5 flex items-center gap-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 text-xs font-bold text-purple-300">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{p.title}</span>
                    <span className={`rounded-full text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider ${p.published ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/40"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    {p.category && <span>{p.category} · </span>}
                    {p.duration && <span>{p.duration} · </span>}
                    <span>{p.published_at?.slice(0, 10)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(p)}
                    title={p.published ? "Unpublish" : "Publish"}
                    className={`grid h-8 w-8 place-items-center rounded-lg bg-white/5 transition-colors ${p.published ? "text-green-400 hover:text-white" : "text-white/40 hover:text-green-400"}`}
                  >
                    {p.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => openEdit(p)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/60 hover:text-white transition-colors">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-red-400/60 hover:text-red-400 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <Modal
            title={editing ? "Edit Episode" : "Add Episode"}
            onClose={() => setShowForm(false)}
          >
            <form onSubmit={handleSave} className="space-y-4">
              <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Category (e.g. Mindset)" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} />
                <Field label="Duration (e.g. 32 min)" value={form.duration} onChange={(v) => setForm((f) => ({ ...f, duration: v }))} />
              </div>
              <Field label="Podcast / Video Link" value={form.link} onChange={(v) => setForm((f) => ({ ...f, link: v }))} />
              <Field label="Date (YYYY-MM-DD)" value={form.published_at} onChange={(v) => setForm((f) => ({ ...f, published_at: v }))} />
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
