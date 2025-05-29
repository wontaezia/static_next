export interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
  totalJSSize: number;
  totalCSSSize: number;
  totalImageSize: number;
  isCloudFront: boolean;
  isS3: boolean;
}
