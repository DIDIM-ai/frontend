'use client';

import { useEffect } from 'react';

export function RemoveBodyPointerEvents() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const body = document.body;
      const hasLock = body.getAttribute('data-scroll-lock') === 'true';
      const hasBadStyle = body.style.pointerEvents === 'none';

      if (hasLock && hasBadStyle) {
        body.style.pointerEvents = 'auto';
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'data-scroll-lock'],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
