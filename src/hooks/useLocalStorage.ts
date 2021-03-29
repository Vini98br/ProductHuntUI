import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: any = "") => {
  const [currentValue, setCurrentValue] = useState(() => {
    const storagedValue = localStorage.getItem(key);

    if (storagedValue) return JSON.parse(storagedValue);

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(currentValue));
  }, [key, currentValue]);

  return [currentValue, setCurrentValue] as const;
};

export default useLocalStorage;
