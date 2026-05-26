import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/admin/components/AdminLayout";
import { useEffect, useState } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse, type Course } from "@/admin/lib/db";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

export const Route = createFileRoute("/admin/courses")({
  component: AdminCoursesPage,
});

const EMPTY: Omit<Course, "id" | "created_at"> = {
  title: "",
  tag: "Cohort",
  duration: "",
  seats: "",
  price: "",
  description: "",
  bullets: ["", "", "", ""],
  featured: false,
};

function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await getCourses();
    setCourses(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY, bullets: ["", "", "", ""] });
    setShowForm(true);
    setError("");
  };

  const openEdit = (c: Course) => {
    setEditing(c);
    setForm({
      title: c.title,
      tag: c.tag,
      duration: c.duration,
      seats: c.seats,
      price: c.price,
      description: c.description,
      bullets: [...c.bullets, "", "", "", ""].slice(0, 4),
      featured: c.featured,
    });
    setShowForm(true);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, bullets: form.bullets.filter(Boolean) };
      if (editing) {
        await updateCourse(editing.id, payload);
      } else {
        await createCourse(payload);
      }
      setShowForm(false);
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await deleteCourse(id);
    await load();
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Courses</h1>
            <p className="text-sm text-white/50 mt-1">{courses.length} course{courses.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Add Course
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-white/40">Loading...</div>
        ) : courses.length === 0 ? (
          <EmptyState label="courses" onAdd={openCreate} />
        ) : (
          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{c.title}</span>
                    {c.featured && (
                      <span className="rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">Featured</span>
                    )}
                  </div>
                  <div className="text-xs text-white/50 mt-1">{c.tag} · {c.duration} · {c.seats} · {c.price}</div>
                  <div className="text-xs text-white/40 mt-1 truncate">{c.description}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(c)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/60 hover:text-white transition-colors">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-red-400/60 hover:text-red-400 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <Modal title={editing ? "Edit Course" : "Add Course"} onClose={() => setShowForm(false)}>
            <form onSubmit={handleSave} className="space-y-4">
              <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField
                  label="Tag"
                  value={form.tag}
                  options={["Cohort", "Self-paced", "Live"]}
                  onChange={(v) => setForm((f) => ({ ...f, tag: v }))}
                />
                <Field label="Price (e.g. ₹9,999)" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Duration (e.g. 6 weeks)" value={form.duration} onChange={(v) => setForm((f) => ({ ...f, duration: v }))} />
                <Field label="Seats (e.g. 40 seats)" value={form.seats} onChange={(v) => setForm((f) => ({ ...f, seats: v }))} />
              </div>
              <TextareaField label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} />
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">Bullet points (up to 4)</label>
                {form.bullets.map((b, i) => (
                  <input
                    key={i}
                    value={b}
                    onChange={(e) => {
                      const bullets = [...form.bullets];
                      bullets[i] = e.target.value;
                      setForm((f) => ({ ...f, bullets }));
                    }}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors mb-2"
                    placeholder={`Bullet ${i + 1}`}
                  />
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="rounded"
                />
                Mark as featured (Most popular)
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

// ─── BOOKS PAGE ───────────────────────────────────────────────────────────────
// Shared UI components below

function EmptyState({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div className="text-center py-16 bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl">
      <p className="text-white/40 mb-4">No {label} yet</p>
      <button onClick={onAdd} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
        + Add your first {label.slice(0, -1)}
      </button>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[oklch(0.17_0.025_280)] border border-white/15 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/60 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">{label}</label>
      <textarea
        required
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60 transition-colors"
      >
        {options.map((o) => <option key={o} value={o} className="bg-[oklch(0.17_0.025_280)]">{o}</option>)}
      </select>
    </div>
  );
}

function FormActions({ saving, onCancel }: { saving: boolean; onCancel: () => void }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button type="button" onClick={onCancel} className="rounded-xl px-4 py-2 text-sm text-white/60 hover:text-white bg-white/5 transition-colors">
        Cancel
      </button>
      <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
        <Check className="h-4 w-4" />
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export { EmptyState, Modal, Field, TextareaField, SelectField, FormActions };
