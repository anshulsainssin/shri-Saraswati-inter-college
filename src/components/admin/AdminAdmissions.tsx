import { useState } from 'react';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';

export function AdminAdmissions() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-slate-500">
        Admission information is currently managed through the website's bilingual content settings.
        The confirmed last date for admission (25 August 2026) and enquiry form are already live on the website.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-bold text-brand-900">Current Admission Settings</h3>
        <div className="mt-4 space-y-3">
          <Row label="Last Date for Admission" value="25 August 2026" />
          <Row label="Enquiry Form" value="Active on website" />
          <Row label="Classes" value="Class 6 to 12" />
          <Row label="Medium" value="Hindi Medium (UP Board)" />
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            To change the admission last date or add new admission details, update the content in the
            website's bilingual translation file. Future versions will allow full editing from this panel.
          </p>
        </div>

        {saved && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            Settings confirmed.
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Confirm Settings
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-brand-900">{value}</span>
    </div>
  );
}
