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

/**
 * ✅ Mobile-safe Lenis
 * - Enables smooth scrolling mainly for desktop wheel
 * - Disables on touch devices (prevents “blank middle / no scroll” bugs)
 * - Respects prefers-reduced-motion
 */
export function LenisProvider({ children, options }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    // ✅ treat touch devices as mobile -> disable Lenis
    const isTouch =
      "ontouchstart" in window ||
      (navigator.maxTouchPoints ?? 0) > 0 ||
      window.matchMedia?.("(pointer: coarse)")?.matches;

    // If mobile/touch OR reduced motion -> do not start Lenis
    if (prefersReduced || isTouch) {
      // make sure any existing instance is cleaned
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Create once (desktop only)
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        // touch smoothing is where many mobile bugs come from
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
    // ✅ IMPORTANT: do not re-init because options object changes
    // If you need dynamic options, pass a memoized object from parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ lenis: lenisRef.current }), []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}