import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: { src: string; alt: string }[];
  startIndex?: number;
  onClose: () => void;
}

export function ProjectGallery({ images, startIndex = 0, onClose }: ProjectGalleryProps) {
  const [current, setCurrent] = useState(startIndex);
  const image = images[current];

  const goPrev = useCallback(() => {
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      role="dialog"
      aria-label="Project image gallery"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Close gallery"
      >
        <X className="size-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      {image && (
        <img src={image.src} alt={image.alt} className="max-h-[85vh] max-w-[90vw] object-contain" />
      )}

      {images.length > 1 && (
        <p className="absolute bottom-4 text-sm text-white/70">
          {current + 1} / {images.length}
        </p>
      )}
    </div>
  );
}
