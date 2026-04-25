import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

interface Props {
  label: string;
  hint?: string;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  accept?: string;
}

// Read file as base64 data URL. For videos, extract first frame.
async function readToDataUrl(file: File): Promise<string> {
  if (file.type.startsWith("video/")) {
    return await extractVideoFrame(file);
  }
  // Resize images to keep payload small
  return await resizeImage(file, 1024);
}

function resizeImage(file: File, maxDim: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas error"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function extractVideoFrame(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.src = url;
    video.onloadedmetadata = () => {
      // Seek to the middle of the video for a representative frame
      video.currentTime = Math.min(video.duration / 2, 1.5);
    };
    video.onseeked = () => {
      const maxDim = 1024;
      const scale = Math.min(1, maxDim / Math.max(video.videoWidth, video.videoHeight));
      const w = Math.round(video.videoWidth * scale);
      const h = Math.round(video.videoHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas error"));
      ctx.drawImage(video, 0, 0, w, h);
      const data = canvas.toDataURL("image/jpeg", 0.85);
      URL.revokeObjectURL(url);
      resolve(data);
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Video load failed"));
    };
  });
}

export function MediaDrop({ label, hint, value, onChange, accept = "image/*,video/*" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const data = await readToDataUrl(file);
      onChange(data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to read file");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-luxe text-muted-foreground">{label}</span>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-muted-foreground hover:text-ember flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Remove
          </button>
        )}
      </div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handle(e.dataTransfer.files?.[0] ?? null);
        }}
        className="relative aspect-[4/5] rounded-md luxe-card cursor-pointer overflow-hidden group transition-all hover:border-gold/40"
      >
        {value ? (
          <img src={value} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <UploadCloud className="w-8 h-8 text-gold/60" />
            <span className="text-sm font-light">Click or drop to upload</span>
            {hint && <span className="text-xs tracking-wide opacity-70">{hint}</span>}
            <span className="text-[10px] tracking-luxe opacity-50">Image or Video</span>
          </div>
        )}
        {busy && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="text-xs tracking-luxe text-gold animate-pulse">Reading…</div>
          </div>
        )}
      </div>
      {err && <p className="text-xs text-ember">{err}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handle(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
