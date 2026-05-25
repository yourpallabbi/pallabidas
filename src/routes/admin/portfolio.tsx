import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/admin/components/AdminLayout";
import { useEffect, useState } from "react";
import { getPortfolio, createPortfolio, updatePortfolio, deletePortfolio, type Portfolio } from "@/admin/lib/db";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { EmptyState, Modal, Field, TextareaField, FormActions } from "./courses";

export const Route = createFileRoute("/admin/portfolio")({
  component: AdminPortfolioPage,
});

const EMPTY: Omit<Portfolio, "id" | "created_at"> = {
  title: "",
  desc: "",
  image_url: "",
  cat: "",
  tags: [],
  link: "",
  accent: "from-fuchsia-500/30 to-purple-500/10",
  sort_order: 0,
};

function AdminPortfolioPage() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await getPortfolio();
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY });
    setTagsInput("");
    setShowForm(true);
    setError("");
  };

  const openEdit = (p: Portfolio) => {
    setEditing(p);
    setForm({ title: p.title, desc: p.desc, image_url: p.image_url, cat: p.cat, tags: p.tags, link: p.link ?? "", accent: p.accent, sort_order: p.sort_order });
    setTagsInput(p.tags.join(", "));
    setShowForm(true);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
      if (editing) await updatePortfolio(editing.id, payload);
      else await createPortfolio(payload);
      setShowForm(false);
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio item?")) return;
    await deletePortfolio(id);
    await load();
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Portfolio</h1>
            <p className="text-sm text-white/50 mt-1">{items.length} project{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-white/40">Loading...</div>
        ) : items.length === 0 ? (
          <EmptyState label="projects" onAdd={openCreate} />
        ) : (
          <div className="space-y-3">
            {items.map((p) => (
              <div key={p.id} className="bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                {p.image_url && (
                  <img src={p.image_url} alt={p.title} className="h-16 w-24 rounded-xl object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{p.title}</div>
                  <div className="text-xs text-white/50 mt-1">{p.cat}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
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
          <Modal title={editing ? "Edit Project" : "Add Project"} onClose={() => setShowForm(false)}>
            <form onSubmit={handleSave} className="space-y-4">
              <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category (e.g. 360° Marketing)" value={form.cat} onChange={(v) => setForm((f) => ({ ...f, cat: v }))} />
                <Field label="Sort order (0, 1, 2...)" value={String(form.sort_order)} onChange={(v) => setForm((f) => ({ ...f, sort_order: Number(v) }))} />
              </div>
              <TextareaField label="Description" value={form.desc} onChange={(v) => setForm((f) => ({ ...f, desc: v }))} />
              <Field label="Image URL" value={form.image_url} onChange={(v) => setForm((f) => ({ ...f, image_url: v }))} />
              <Field label="Project link (optional)" value={form.link ?? ""} onChange={(v) => setForm((f) => ({ ...f, link: v }))} />
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">Tags (comma separated)</label>
                <input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Branding, SEO, India"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>
              {error && <div className="text-sm text-red-400">{error}</div>}
              <FormActions saving={saving} onCancel={() => setShowForm(false)} />
            </form>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
}
