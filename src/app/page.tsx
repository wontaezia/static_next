'use client';

import { useState } from 'react';

import _ from 'lodash';

import { PerformancePanel } from '@/components';

export default function Home() {
  const [heavyData] = useState(() =>
    _.range(5000).map((i: number) => ({
      id: i,
      value: Math.sin(i / 100) * 100,
      data: `Heavy data item ${i} `.repeat(20),
    })),
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Performance Test
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <PerformancePanel />

        <div className="hidden">
          {heavyData.slice(0, 100).map((item: { id: number; data: string }) => (
            <div key={item.id}>{item.data}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
