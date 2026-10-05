import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Save, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { GalleryPhoto } from '@/lib/types';
import { GALLERY_CATEGORIES_EN, GALLERY_CATEGORIES_HI } from '@/lib/types';

export function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GalleryPhoto | null>(null);

  const fetchPhotos = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('created_at', { ascending: false });
    setPhotos(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo? This cannot be undone.')) return;
    await supabase.from('gallery_photos').delete().eq('id', id);
    fetchPhotos();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Upload and manage gallery photos.</p>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Plus className="h-4 w-4" />
          Add Photo
        </button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      ) : photos.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center text-slate-500">
          No photos yet. Click "Add Photo" to upload one.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => (
            <div key={p.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="aspect-square w-full overflow-hidden">
                <img src={p.src} alt={p.label_en ?? ''} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-brand-900">{p.label_en ?? 'Untitled'}</p>
                <p className="text-xs text-slate-400">{p.category_en}</p>
                {p.event_date && <p className="text-xs text-slate-400">{p.event_date}</p>}
              </div>
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/90 text-slate-600 shadow hover:text-brand-700"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/90 text-slate-600 shadow hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <GalleryForm
          photo={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchPhotos();
          }}
        />
      )}
    </div>
  );
}

function GalleryForm({
  photo,
  onClose,
  onSaved,
}: {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    src: photo?.src ?? '',
    category_en: photo?.category_en ?? GALLERY_CATEGORIES_EN[0],
    category_hi: photo?.category_hi ?? GALLERY_CATEGORIES_HI[0],
    label_en: photo?.label_en ?? '',
    label_hi: photo?.label_hi ?? '',
    event_date: photo?.event_date ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    const ext = file.name.split('.').pop();
    const fileName = `gallery/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    setUploading(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
    setForm((f) => ({ ...f, src: urlData.publicUrl }));
  };

  const handleCategoryChange = (categoryEn: string) => {
    const idx = GALLERY_CATEGORIES_EN.indexOf(categoryEn);
    setForm({
      ...form,
      category_en: categoryEn,
      category_hi: GALLERY_CATEGORIES_HI[idx] ?? categoryEn,
    });
  };

  const handleSave = async () => {
    if (!form.src) {
      setError('Please provide an image URL or upload a photo.');
      return;
    }
    setSaving(true);
    setError(null);
    if (photo) {
      const { error } = await supabase.from('gallery_photos').update(form).eq('id', photo.id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from('gallery_photos').insert(form);
      if (error) setError(error.message);
    }
    setSaving(false);
    if (!error) onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-900">{photo ? 'Edit Photo' : 'Add Photo'}</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Upload Photo</label>
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
              <span className="text-xs text-slate-400">Or paste an image URL below</span>
            </div>
          </div>

          {form.src && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <img src={form.src} alt="Preview" className="max-h-48 w-full object-cover" />
            </div>
          )}

          <Field label="Image URL (or uploaded above)">
            <input
              value={form.src}
              onChange={(e) => setForm({ ...form, src: e.target.value })}
              className="input"
              placeholder="/images/photo.jpg or https://..."
            />
          </Field>

          <Field label="Category">
            <select
              value={form.category_en}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="input"
            >
              {GALLERY_CATEGORIES_EN.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title (English) — optional">
              <input
                value={form.label_en}
                onChange={(e) => setForm({ ...form, label_en: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Title (Hindi) — optional">
              <input
                value={form.label_hi}
                onChange={(e) => setForm({ ...form, label_hi: e.target.value })}
                className="input"
              />
            </Field>
          </div>

          <Field label="Event Date (optional, e.g. '15 August 2026')">
            <input
              value={form.event_date}
              onChange={(e) => setForm({ ...form, event_date: e.target.value })}
              className="input"
            />
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
