import type { PerformanceMetrics } from '@/types/performance';

export const measurePagePerformance = (): PerformanceMetrics | null => {
  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    const jsSize = resources
      .filter((r) => r.name.includes('.js') || r.name.includes('javascript'))
      .reduce((total, r) => total + (r.transferSize || 0), 0);

    const cssSize = resources
      .filter((r) => r.name.includes('.css') || r.name.includes('stylesheet'))
      .reduce((total, r) => total + (r.transferSize || 0), 0);

    const imageSize = resources
      .filter((r) => r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i))
      .reduce((total, r) => total + (r.transferSize || 0), 0);

    const fcp = paint.find((p) => p.name === 'first-contentful-paint');
    const lcp = paint.find((p) => p.name === 'largest-contentful-paint');

    return {
      pageLoadTime: navigation.loadEventEnd,
      domContentLoaded: navigation.domContentLoadedEventEnd,
      firstContentfulPaint: fcp?.startTime || 0,
      largestContentfulPaint: lcp?.startTime || 0,
      timeToInteractive: navigation.domInteractive,
      totalJSSize: jsSize,
      totalCSSSize: cssSize,
      totalImageSize: imageSize,
      isCloudFront: window.location.href.includes('cloudfront.net'),
      isS3: window.location.href.includes('s3'),
    };
  } catch (error) {
    console.error('Performance measurement failed:', error);
    return null;
  }
};

export const logPerformanceMetrics = (metrics: PerformanceMetrics, source: string) => {
  console.group('🚀 페이지 성능 측정');
  console.log(`📊 로딩 시간: ${metrics.pageLoadTime.toFixed(2)}ms`);
  console.log(`🎨 첫 페인트: ${metrics.firstContentfulPaint.toFixed(2)}ms`);
  console.log(`📦 JS 크기: ${(metrics.totalJSSize / 1024).toFixed(2)}KB`);
  console.log(`🌐 소스: ${source}`);
  console.groupEnd();
};

export const getPerformanceSource = (metrics: PerformanceMetrics) => {
  if (metrics.isCloudFront) {
    return 'CloudFront';
  }

  if (metrics.isS3) {
    return 'S3';
  }

  return 'Local';
};
