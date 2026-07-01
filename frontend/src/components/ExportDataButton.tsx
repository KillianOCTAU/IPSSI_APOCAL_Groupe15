import { useState } from 'react';
import { api } from '@/api/client';
import { getApiErrorMessage } from '@/api/errors';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function ExportDataButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.get('/accounts/me/export/', {
        responseType: 'blob',
      });

      const disposition = response.headers['content-disposition'] ?? '';
      const match = /filename="([^"]+)"/.exec(disposition);
      const filename = match?.[1] ?? `edututor-export-${Date.now()}.zip`;

      downloadBlob(response.data as Blob, filename);
      setSuccess(true);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Export impossible.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleExport}
        disabled={loading}
        className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-indigo-600 border border-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Préparation…
          </>
        ) : (
          'Exporter mes données (ZIP)'
        )}
      </button>

      <p className="text-xs text-slate-500">
        Archive ZIP : quiz.json, reponses.csv et audit.json (Art. 15 RGPD).
      </p>

      {error && (
        <p className="text-sm text-rose-600 bg-rose-50 rounded-lg px-3 py-2">{error}</p>
      )}

      {success && !error && (
        <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
          Export téléchargé.
        </p>
      )}
    </div>
  );
}
