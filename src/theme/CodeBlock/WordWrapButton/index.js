import { useEffect, useRef } from 'react';
// Keep the existing automatic word wrapping and hidden toggle.
export default function WordWrapButton({ onClick }) {
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      onClick();
    }
  }, [onClick]);
  return null;
}
