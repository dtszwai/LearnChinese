import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

// Read after hydration. Loading never writes or removes an existing record.
export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
  deserialize: (value: unknown) => T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const options = useRef({ initialValue, deserialize });
  options.current = { initialValue, deserialize };
  const [state, setState] = useState({ key, value: initialValue, loaded: false });
  const current = useRef(state);

  useEffect(() => {
    let value = options.current.initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) value = options.current.deserialize(JSON.parse(item));
    } catch {
      // Unavailable storage and malformed JSON both fall back to in-memory state.
    }
    current.current = { key, value, loaded: true };
    setState(current.current);
  }, [key]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (update) => {
      const previous = current.current.key === key ? current.current.value : options.current.initialValue;
      const value = typeof update === 'function' ? (update as (previous: T) => T)(previous) : update;
      current.current = { key, value, loaded: true };
      setState(current.current);
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Learning must continue even when storage access or quota checks fail.
      }
    },
    [key],
  );

  return state.key === key ? [state.value, setValue, state.loaded] : [initialValue, setValue, false];
}
