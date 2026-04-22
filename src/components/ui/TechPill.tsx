import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode
} from "react";
import Lenis from "lenis";

type LenisContextValue = { lenis: Lenis | null };
const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext).lenis;
}

type LenisProviderProps = {
  children: ReactNode;
  options?: Partial<ConstructorParameters<typeof Lenis>[0]>;
};

export function LenisProvider({ children, options }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    // Touch devices skip Lenis to avoid mobile scroll bugs.
    const isTouch =
      "ontouchstart" in window ||
      (navigator.maxTouchPoints ?? 0) > 0 ||
      window.matchMedia?.("(pointer: coarse)")?.matches;

    if (prefersReduced || isTouch) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        // Touch smoothing can cause mobile scroll issues.
        smoothTouch: false as any, // Lenis types may not include it; safe to omit if you prefer
        ...options
      });
    }

    const lenis = lenisRef.current;

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
    // Keep Lenis stable unless this provider remounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ lenis: lenisRef.current }), []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
