import React, { useEffect, useRef, useState } from "react";

type VideoCardBGProps = {
  src: string;
  dim?: number;
  className?: string;
  radius?: number;
  poster?: string;          // ✅ optional poster for instant paint
  lazy?: boolean;           // ✅ default true
  rootMargin?: string;      // ✅ tune when it mounts
};

export default function VideoCardBG({
  src,
  dim = 0.55,
  className,
  radius = 18,
  poster,
  lazy = true,
  rootMargin = "260px"
}: VideoCardBGProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startedRef = useRef(false);
  const playLockRef = useRef(false);

  const [mounted, setMounted] = useState(!lazy);
  const [ready, setReady] = useState(false);

  // ✅ mount video only when near viewport
  useEffect(() => {
    if (!lazy) return;

    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;

        if (e.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [lazy, rootMargin]);

  // ✅ play/pause based on visibility (helps mobile)
  useEffect(() => {
    if (!mounted) return;

    const wrap = wrapRef.current;
    const v = videoRef.current;
    if (!wrap || !v) return;

    startedRef.current = false;
    playLockRef.current = false;
    setReady(false);

    // autoplay-friendly settings
    v.muted = true;
    v.playsInline = true;
    v.loop = true;

    // don’t force huge downloads on LAN/phone
    v.preload = "metadata";

    let alive = true;

    const tryPlay = async () => {
      const el = videoRef.current;
      if (!el || !alive) return;
      if (playLockRef.current) return;
      if (startedRef.current && !el.paused) return;

      playLockRef.current = true;
      try {
        await el.play();
        if (!alive) return;
        startedRef.current = true;
      } catch {
        // autoplay blocked until gesture (normal)
      } finally {
        playLockRef.current = false;
      }
    };

    const onFirstFrame = () => {
      if (!alive) return;
      setReady(true);
    };

    // pause when offscreen, resume when back
    const visIO = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e || !videoRef.current) return;

        if (e.isIntersecting) {
          void tryPlay();
        } else {
          // ✅ save CPU/battery
          try {
            videoRef.current.pause();
          } catch {}
        }
      },
      { threshold: 0.05, rootMargin: "0px" }
    );

    visIO.observe(wrap);

    // first try
    void tryPlay();

    // one-time global gesture unlock (per component instance, but removed on cleanup)
    const onGesture = () => void tryPlay();
    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture);

    v.addEventListener("loadeddata", onFirstFrame);

    return () => {
      alive = false;
      visIO.disconnect();
      v.removeEventListener("loadeddata", onFirstFrame);

      window.removeEventListener("pointerdown", onGesture as any);
      window.removeEventListener("touchstart", onGesture as any);
      window.removeEventListener("keydown", onGesture as any);
    };
  }, [mounted, src]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        borderRadius: radius,
        pointerEvents: "none"
      }}
      aria-hidden="true"
    >
      {/* Poster fallback (fast on mobile) */}
      {!mounted && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "contrast(1.05) saturate(1.05)",
            opacity: 1
          }}
        />
      )}

      {mounted && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate noremoteplayback"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.05) saturate(1.05)",
            opacity: ready ? 1 : 0,
            transition: "opacity 220ms ease"
          }}
        />
      )}

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