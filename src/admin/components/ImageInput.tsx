import { useState, useRef } from "react";
import { supabase } from "@/admin/lib/supabase";
import { Link2, Upload, X, Loader2 } from "lucide-react";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export function ImageInput({ label, value, onChange }: Props) {
  const [tab, setTab] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, file, { upsert: false });

    if (error) {
      setUploadError(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);
    onChange(data.publicUrl);
    setUploading(false);
  };

  const clearImage = () => {
    onChange("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">
        {label}
      </label>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-3 bg-white/5 rounded-xl p-1 w-fit">
        <button
          type="button"
          onClick={() => setTab("url")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            tab === "url"
              ? "bg-white/10 text-white"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          <Link2 className="h-3 w-3" /> URL
        </button>
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            tab === "upload"
              ? "bg-white/10 text-white"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          <Upload className="h-3 w-3" /> Upload
        </button>
      </div>

      {/* URL input */}
      {tab === "url" && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors"
        />
      )}

      {/* File upload */}
      {tab === "upload" && (
        <div>
          <label
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/5 px-4 py-6 cursor-pointer hover:border-purple-500/40 hover:bg-white/8 transition-all ${
              uploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            {uploading ? (
              <>
                <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
                <span className="text-xs text-white/50">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 text-white/40" />
                <span className="text-xs text-white/50">
                  Click to upload · JPG, PNG, AVIF, WEBP
                </span>
              </>
            )}
          </label>
          {uploadError && (
            <p className="mt-1.5 text-xs text-red-400">{uploadError}</p>
          )}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="mt-3 relative w-fit">
          <img
            src={value}
            alt="Preview"
            className="h-24 w-36 rounded-xl object-cover border border-white/10"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
