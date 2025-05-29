'use client';

import { motion, AnimatePresence } from 'framer-motion';

import { usePerformanceTracker } from '@/hooks';
import { getPerformanceSource } from '@/utils/performanceTracker';

import { PerformanceMetrics } from './PerformanceMetrics';

export const PerformancePanel = () => {
  const { metrics } = usePerformanceTracker();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          opacity: { type: 'tween', visualDuration: 0.6, bounce: 0 },
          y: { type: 'tween', visualDuration: 0.8, bounce: 0.5 },
        }}
        className="mb-8 space-y-6"
      >
        {metrics && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">{getPerformanceSource(metrics)} 성능</h3>
            </div>
            <div className="p-6">
              <PerformanceMetrics metrics={metrics} />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
