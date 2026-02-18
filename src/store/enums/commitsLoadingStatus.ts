const commitsLoadingStatus = {
  idle: 'idle',
  loading: 'loading',
  loadingMore: 'loadingMore',
  succeeded: 'succeeded',
  failed: 'failed',
} as const;

type CommitsLoadingStatus = (typeof commitsLoadingStatus)[keyof typeof commitsLoadingStatus];

export { commitsLoadingStatus };
export type { CommitsLoadingStatus };
