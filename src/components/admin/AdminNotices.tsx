import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Flag, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Notice } from '@/lib/types';

export function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false });
    setNotices(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice? This cannot be undone.')) return;
    await supabase.from('notices').delete().eq('id', id);
    fetchNotices();
  };

  const openNew = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (n: Notice) => {
    setEditing(n);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Manage notice board content in Hindi and English.</p>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          <Plus className="h-4 w-4" />
          Add Notice
        </button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      ) : notices.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center text-slate-500">
          No notices yet. Click "Add Notice" to create one.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {notices.map((n) => (
            <div key={n.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  {n.is_important && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                      <Flag className="h-3 w-3" />
                      Important
                    </span>
                  )}
                  <h3 className="mt-2 text-base font-bold text-brand-900">{n.title_en || n.title_hi}</h3>
                  <p className="text-xs text-slate-400">{n.date}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(n)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{n.content_en || n.content_hi}</p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <NoticeForm
          notice={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchNotices();
          }}
        />
      )}
    </div>
  );
}

function NoticeForm({
  notice,
  onClose,
  onSaved,
}: {
  notice: Notice | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title_hi: notice?.title_hi ?? '',
    title_en: notice?.title_en ?? '',
    content_hi: notice?.content_hi ?? '',
    content_en: notice?.content_en ?? '',
    date: notice?.date ?? '',
    is_important: notice?.is_important ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    if (notice) {
      const { error } = await supabase.from('notices').update(form).eq('id', notice.id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from('notices').insert(form);
      if (error) setError(error.message);
    }
    setSaving(false);
    if (!error) onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-900">
            {notice ? 'Edit Notice' : 'New Notice'}
          </h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title (Hindi)">
              <input
                value={form.title_hi}
                onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Title (English)">
              <input
                value={form.title_en}
                onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                className="input"
              />
            </Field>
          </div>
          <Field label="Content (Hindi)">
            <textarea
              value={form.content_hi}
              onChange={(e) => setForm({ ...form, content_hi: e.target.value })}
              rows={3}
              className="input"
            />
          </Field>
          <Field label="Content (English)">
            <textarea
              value={form.content_en}
              onChange={(e) => setForm({ ...form, content_en: e.target.value })}
              rows={3}
              className="input"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date (text, e.g. '15 August 2026')">
              <input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input"
              />
            </Field>
            <label className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={form.is_important}
                onChange={(e) => setForm({ ...form, is_important: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-500"
              />
              <span className="text-sm font-medium text-slate-700">Mark as important/featured</span>
            </label>
          </div>

          {error && (
            <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}
