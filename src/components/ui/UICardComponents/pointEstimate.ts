import { PointEstimate } from '@/types/__generated__/graphql';

export function pointEstimateToNumber(
  pointEstimate: PointEstimate
): '0' | '1' | '2' | '4' | '8' {
  switch (pointEstimate) {
    case PointEstimate.One:
      return '1';
    case PointEstimate.Two:
      return '2';
    case PointEstimate.Four:
      return '4';
    case PointEstimate.Eight:
      return '8';
    case PointEstimate.Zero:
      return '0';
    default:
      return '0';
  }
}

export function numberToPointEstimate(value: string): PointEstimate {
  switch (value) {
    case '1':
      return PointEstimate.One;
    case '2':
      return PointEstimate.Two;
    case '4':
      return PointEstimate.Four;
    case '8':
      return PointEstimate.Eight;
    case '0':
    default:
      return PointEstimate.Zero;
  }
}
