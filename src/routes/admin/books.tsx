import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/admin/components/AdminLayout";
import { useEffect, useState } from "react";
import { getBooks, createBook, updateBook, deleteBook, type Book } from "@/admin/lib/db";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { EmptyState, Modal, Field, TextareaField, FormActions } from "./courses";
import { ImageInput } from "@/admin/components/ImageInput";

export const Route = createFileRoute("/admin/books")({
  component: AdminBooksPage,
});

const EMPTY: Omit<Book, "id" | "created_at"> = {
  title: "",
  description: "",
  cover_url: "",
  amazon_url: "",
  tag: "Design",
  accent: "oklch(0.65 0.27 295)",
};

function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Book | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await getBooks();
    setBooks(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY });
    setShowForm(true);
    setError("");
  };

  const openEdit = (b: Book) => {
    setEditing(b);
    setForm({ title: b.title, description: b.description, cover_url: b.cover_url, amazon_url: b.amazon_url, tag: b.tag, accent: b.accent });
    setShowForm(true);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) await updateBook(editing.id, form);
      else await createBook(form);
      setShowForm(false);
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this book?")) return;
    await deleteBook(id);
    await load();
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Books</h1>
            <p className="text-sm text-white/50 mt-1">{books.length} book{books.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Add Book
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-white/40">Loading...</div>
        ) : books.length === 0 ? (
          <EmptyState label="books" onAdd={openCreate} />
        ) : (
          <div className="space-y-3">
            {books.map((b) => (
              <div key={b.id} className="bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                {b.cover_url && (
                  <img src={b.cover_url} alt={b.title} className="h-16 w-12 rounded-lg object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{b.title}</div>
                  <div className="text-xs text-white/50 mt-1">{b.tag}</div>
                  <div className="text-xs text-white/40 mt-1 truncate">{b.description}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
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
          <Modal title={editing ? "Edit Book" : "Add Book"} onClose={() => setShowForm(false)}>
            <form onSubmit={handleSave} className="space-y-4">
              <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
              <TextareaField label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} />
              <ImageInput label="Cover Image" value={form.cover_url} onChange={(v) => setForm((f) => ({ ...f, cover_url: v }))} />
              <Field label="Amazon URL" value={form.amazon_url} onChange={(v) => setForm((f) => ({ ...f, amazon_url: v }))} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Tag (e.g. Design)" value={form.tag} onChange={(v) => setForm((f) => ({ ...f, tag: v }))} />
                <Field label="Accent color (oklch)" value={form.accent} onChange={(v) => setForm((f) => ({ ...f, accent: v }))} />
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
