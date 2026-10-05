import { useEffect, useState } from 'react';
import { Loader2, Save, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { PrincipalInfo } from '@/lib/types';

const PRINCIPAL_ID = '00000000-0000-0000-0000-000000000001';

export function AdminPrincipal() {
  const [info, setInfo] = useState<PrincipalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('principal_info')
      .select('*')
      .eq('id', PRINCIPAL_ID)
      .maybeSingle()
      .then(({ data }) => {
        setInfo(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!info) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    const { error } = await supabase
      .from('principal_info')
      .upsert({ ...info, id: PRINCIPAL_ID });
    setSaving(false);
    if (error) {
      setError(error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    const ext = file.name.split('.').pop();
    const fileName = `principal/principal-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file, { cacheControl: '3600', upsert: true });
    setUploading(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
    setInfo((i) => (i ? { ...i, photo_url: urlData.publicUrl } : i));
  };

  if (loading) {
    return (
      <div className="flex justify-center pt-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!info) {
    return <div className="text-slate-500">Could not load principal info.</div>;
  }

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-slate-500">Update principal information and photo. Leave photo empty to show a placeholder on the website.</p>

      <div className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Photo */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Principal Photo</label>
          <div className="flex items-start gap-4">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              {info.photo_url ? (
                <img src={info.photo_url} alt="Principal" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                  No photo
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Upload New Photo
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
              {info.photo_url && (
                <button
                  onClick={() => setInfo({ ...info, photo_url: null })}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove photo (use placeholder)
                </button>
              )}
              <p className="text-xs text-slate-400">Leave empty to show a clean placeholder on the website.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name (Hindi)">
            <input
              value={info.name_hi}
              onChange={(e) => setInfo({ ...info, name_hi: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Name (English)">
            <input
              value={info.name_en}
              onChange={(e) => setInfo({ ...info, name_en: e.target.value })}
              className="input"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Designation (Hindi)">
            <input
              value={info.role_hi}
              onChange={(e) => setInfo({ ...info, role_hi: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Designation (English)">
            <input
              value={info.role_en}
              onChange={(e) => setInfo({ ...info, role_en: e.target.value })}
              className="input"
            />
          </Field>
        </div>

        <Field label="Message (Hindi)">
          <textarea
            value={info.message_hi}
            onChange={(e) => setInfo({ ...info, message_hi: e.target.value })}
            rows={5}
            className="input"
          />
        </Field>
        <Field label="Message (English)">
          <textarea
            value={info.message_en}
            onChange={(e) => setInfo({ ...info, message_en: e.target.value })}
            rows={5}
            className="input"
          />
        </Field>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        {saved && (
          <div className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">Saved successfully!</div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </button>
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
