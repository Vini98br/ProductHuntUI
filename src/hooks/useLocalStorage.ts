import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [currentValue, setCurrentValue] = useState(() =>
    localStorage.getItem(key)!
  );

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setCurrentValue(e.newValue!);
      }
    };
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('storage', handler);
    };
  });

  useEffect(() => {
    localStorage.setItem(key, currentValue!);
  }, [key, currentValue]);

  return [currentValue, setCurrentValue] as const;
};

export default useLocalStorage;