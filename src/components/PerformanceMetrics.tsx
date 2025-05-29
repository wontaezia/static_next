import type { PerformanceMetrics as PerformanceMetricsType } from '@/types/performance';
import { formatDuration, formatFileSize } from '@/utils/formatters';

interface PerformanceMetricsProps {
  metrics: PerformanceMetricsType;
}

export  const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  const metricItems = [
    {
      label: '페이지 로딩',
      value: formatDuration(metrics.pageLoadTime),
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: '첫 페인트',
      value: formatDuration(metrics.firstContentfulPaint),
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'DOM 준비',
      value: formatDuration(metrics.domContentLoaded),
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      label: 'JS 크기',
      value: formatFileSize(metrics.totalJSSize),
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metricItems.map((item) => (
        <div key={item.label} className={`text-center p-4 ${item.bgColor} rounded`}>
          <div className="text-sm text-gray-600">{item.label}</div>
          <div className={`text-2xl font-bold ${item.textColor}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};
