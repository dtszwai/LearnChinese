import { useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default (key: string, initialValue?) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (!ExecutionEnvironment.canUseDOM) return initialValue;
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        initialValue && localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      initialValue && localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (ExecutionEnvironment.canUseDOM) {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {}
  };
  return [storedValue, setValue];
};
