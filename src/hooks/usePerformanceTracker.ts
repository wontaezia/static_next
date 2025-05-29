'use client';

import { useState, useEffect } from 'react';

import type { PerformanceMetrics } from '@/types/performance';
import { measurePagePerformance, logPerformanceMetrics, getPerformanceSource } from '@/utils/performanceTracker';

export const usePerformanceTracker = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const measureAndSave = () => {
      const performanceMetrics = measurePagePerformance();

      if (performanceMetrics) {
        setMetrics(performanceMetrics);
        const source = getPerformanceSource(performanceMetrics);

        logPerformanceMetrics(performanceMetrics, source);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(measureAndSave, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(measureAndSave, 100);
      });
    }
  }, []);

  return { metrics };
};
