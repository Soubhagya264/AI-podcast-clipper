import { useRef } from "react";

export function useMultiRefs<T>() {
  const refs = useRef<(T | null)[]>([]);
  refs.current = [];
  const setRef = (index: number) => (el: T | null) => {
    refs.current[index] = el;
  };
  return [refs, setRef] as const;
}
