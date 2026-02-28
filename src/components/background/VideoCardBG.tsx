import React from "react";

import { useEffect, useRef, useState } from "react";

type VideoCardBGProps = {
  src: string;
  dim?: number;
  className?: string;
  radius?: number;
};

export default function VideoCardBG({
  src,
  dim = 0.55,
  className,
  radius = 18
}: VideoCardBGProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);
  const playLockRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    startedRef.current = false;
    playLockRef.current = false;
    setReady(false);

    // Ensure consistent autoplay-friendly settings
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = "auto";

    let mounted = true;

    const tryPlay = async () => {
      const el = ref.current;
      if (!el) return;
      if (playLockRef.current) return;
      if (startedRef.current && !el.paused) return;

      playLockRef.current = true;
      try {
        await el.play();
        if (!mounted) return;
        startedRef.current = true;
      } catch {
        // autoplay blocked until gesture (normal on some browsers)
      } finally {
        playLockRef.current = false;
      }
    };

    const onFirstFrame = () => {
      if (!mounted) return;
      setReady(true);
    };

    const onLoadedMeta = () => {
      void tryPlay();
    };

    const onGesture = () => {
      void tryPlay();
      window.removeEventListener("pointerdown", onGesture as any);
      window.removeEventListener("touchstart", onGesture as any);
      window.removeEventListener("keydown", onGesture as any);
    };

    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("loadeddata", onFirstFrame);

    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture);

    // initial attempt
    void tryPlay();

    return () => {
      mounted = false;

      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("loadeddata", onFirstFrame);

      window.removeEventListener("pointerdown", onGesture as any);
      window.removeEventListener("touchstart", onGesture as any);
      window.removeEventListener("keydown", onGesture as any);
    };
  }, [src]);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        borderRadius: radius
      }}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "contrast(1.05) saturate(1.05)",
          opacity: ready ? 1 : 0,
          transition: "opacity 200ms ease"
        }}
      />

      {/* readability overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg,
            rgba(0,0,0,${dim}) 0%,
            rgba(0,0,0,${dim * 0.7}) 45%,
            rgba(0,0,0,${dim}) 100%)`
        }}
      />
    </div>
  );
}