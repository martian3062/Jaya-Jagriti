import React from "react";

import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);
  const playLockRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    startedRef.current = false;
    playLockRef.current = false;
    setReady(false);

    // stable settings
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = "auto";

    const tryPlay = async () => {
      const el = videoRef.current;
      if (!el) return;

      if (playLockRef.current) return;
      if (startedRef.current && !el.paused) return;

      playLockRef.current = true;
      try {
        await el.play();
        startedRef.current = true;
      } catch {
        // autoplay blocked until gesture
      } finally {
        playLockRef.current = false;
      }
    };

    // first real frame -> fade in
    const onFirstFrame = () => setReady(true);

    const onLoadedMeta = () => {
      tryPlay();
    };

    const onGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("keydown", onGesture);
    };

    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("loadeddata", onFirstFrame);

    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture);

    // initial attempt
    tryPlay();

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("loadeddata", onFirstFrame);

      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [src]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -2,
        overflow: "hidden",
        background: "#000"
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transition: "opacity 220ms ease"
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.38) 45%, rgba(0,0,0,.55) 100%)"
        }}
      />
    </div>
  );
}