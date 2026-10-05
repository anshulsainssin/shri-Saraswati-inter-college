import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Save, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { SchoolEvent } from '@/lib/types';

export function AdminEvents() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SchoolEvent | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    setEvents(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event? This cannot be undone.')) return;
    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Manage school events in Hindi and English.</p>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      ) : events.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center text-slate-500">
          No events yet. Click "Add Event" to create one.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <div key={e.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {e.photo_url ? (
                <div className="aspect-16/10 w-full overflow-hidden">
                  <img src={e.photo_url} alt={e.title_en} className="h-full w-full object-cover" />
                </div>
              ) : null}
              <div className="p-4">
                <span className="inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-medium text-gold-700">
                  {e.category}
                </span>
                <h3 className="mt-2 text-base font-bold text-brand-900">{e.title_en || e.title_hi}</h3>
                {e.date && <p className="text-xs text-slate-400">{e.date}</p>}
                <p className="mt-1 text-sm text-slate-600">{e.description_en || e.description_hi}</p>
                <div className="mt-3 flex gap-1">
                  <button
                    onClick={() => {
                      setEditing(e);
                      setShowForm(true);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <EventForm
          event={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchEvents();
          }}
        />
      )}
    </div>
  );
}

function EventForm({
  event,
  onClose,
  onSaved,
}: {
  event: SchoolEvent | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title_hi: event?.title_hi ?? '',
    title_en: event?.title_en ?? '',
    description_hi: event?.description_hi ?? '',
    description_en: event?.description_en ?? '',
    date: event?.date ?? '',
    category: event?.category ?? '',
    photo_url: event?.photo_url ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    const ext = file.name.split('.').pop();
    const fileName = `events/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    setUploading(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
    setForm((f) => ({ ...f, photo_url: urlData.publicUrl }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const payload = { ...form, photo_url: form.photo_url || null };
    if (event) {
      const { error } = await supabase.from('events').update(payload).eq('id', event.id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from('events').insert(payload);
      if (error) setError(error.message);
    }
    setSaving(false);
    if (!error) onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-900">{event ? 'Edit Event' : 'New Event'}</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title (Hindi)">
              <input value={form.title_hi} onChange={(e) => setForm({ ...form, title_hi: e.target.value })} className="input" />
            </Field>
            <Field label="Title (English)">
              <input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="input" />
            </Field>
          </div>
          <Field label="Description (Hindi)">
            <textarea value={form.description_hi} onChange={(e) => setForm({ ...form, description_hi: e.target.value })} rows={3} className="input" />
          </Field>
          <Field label="Description (English)">
            <textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={3} className="input" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date (optional, e.g. '15 August 2026')">
              <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" />
            </Field>
            <Field label="Category">
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input" placeholder="e.g. Cultural, Sports" />
            </Field>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Event Photo (optional)</label>
            <div className="flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                  }}
                />
              </label>
            </div>
          </div>
          {form.photo_url && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <img src={form.photo_url} alt="Preview" className="max-h-48 w-full object-cover" />
            </div>
          )}
          <Field label="Photo URL (or uploaded above)">
            <input value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} className="input" />
          </Field>

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
