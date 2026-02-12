'use client';

import { useEffect, useMemo, useState } from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Loader from './Loader';
import { loadingManager } from '../../lib/loadingManager';

const READY_FALLBACK_MS = 500;

export default function GlobalLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const [externalCount, setExternalCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = loadingManager.subscribe((count) => setExternalCount(count));
    return unsubscribe;
  }, []);

  useEffect(() => {
    const markReady = () => setInitialLoading(false);

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        markReady();
      } else {
        window.addEventListener('load', markReady, { once: true });
      }
    }

    const fallback = setTimeout(markReady, READY_FALLBACK_MS);
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', markReady);
      }
      clearTimeout(fallback);
    };
  }, []);

  const isActive = useMemo(() => {
    return initialLoading || isFetching > 0 || isMutating > 0 || externalCount > 0;
  }, [initialLoading, isFetching, isMutating, externalCount]);

  if (!isActive) return null;

  return (
    <div className="global-loader" aria-live="polite" aria-busy="true">
      <div className="global-loader-card">
        <Loader size="lg" message="Loading..." />
      </div>
    </div>
  );
}
