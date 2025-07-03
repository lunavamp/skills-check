"use client";
import { useState, useRef, useCallback, useEffect } from "react";

/**
 *
 * @param initialSeconds
 * @returns { timeLeft, start, stop, reset }
 */
export default function useTimer(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        return 0;
      }
      return prev - 1;
    });
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current === null) {
      intervalRef.current = window.setInterval(tick, 1000);
    }
  }, [tick]);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(initialSeconds);
  }, [initialSeconds, stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { timeLeft, start, stop, reset };
}
