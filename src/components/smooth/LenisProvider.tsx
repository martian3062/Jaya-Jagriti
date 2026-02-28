import React, {
  createContext,
  useContext,
  useEffect,
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create once
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        // ✅ smoothTouch removed (TS-safe)
        // wheelMultiplier: 1,
        // touchMultiplier: 1,
        ...options
      });
    }

    const lenis = lenisRef.current;
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
    // re-init only if options object identity changes
  }, [options]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}