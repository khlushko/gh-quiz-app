'use client';

import { useEffect } from 'react';
import { useQuizStore } from './quiz-store';

export function StoreHydration() {
  useEffect(() => {
    useQuizStore.persist.rehydrate();
  }, []);
  return null;
}
