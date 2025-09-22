import { describe, it, expect } from 'vitest';

import { PointEstimate } from '@/__generated__/graphql';
import {
  numberToPointEstimate,
  pointEstimateToNumber,
} from '../pointEstimate/pointEstimate';
import { normalizeDate } from '../dateUtils/normalizeDate';

describe('pointEstimateToNumber', () => {
  it('should convert PointEstimate enum to correct string', () => {
    expect(pointEstimateToNumber(PointEstimate.Zero)).toBe('0');
    expect(pointEstimateToNumber(PointEstimate.One)).toBe('1');
    expect(pointEstimateToNumber(PointEstimate.Two)).toBe('2');
    expect(pointEstimateToNumber(PointEstimate.Four)).toBe('4');
    expect(pointEstimateToNumber(PointEstimate.Eight)).toBe('8');
  });
});

describe('numberToPointEstimate', () => {
  it('should convert string to correct PointEstimate enum', () => {
    expect(numberToPointEstimate('0')).toBe(PointEstimate.Zero);
    expect(numberToPointEstimate('1')).toBe(PointEstimate.One);
    expect(numberToPointEstimate('2')).toBe(PointEstimate.Two);
    expect(numberToPointEstimate('4')).toBe(PointEstimate.Four);
    expect(numberToPointEstimate('8')).toBe(PointEstimate.Eight);
  });

  it('should default to PointEstimate.Zero for invalid input', () => {
    expect(numberToPointEstimate('invalid')).toBe(PointEstimate.Zero);
    expect(numberToPointEstimate('')).toBe(PointEstimate.Zero);
  });
});

describe('normalizeDate', () => {
  it('should return ISO string for Date input', () => {
    const date = new Date('2025-09-22T10:00:00Z');
    expect(normalizeDate(date)).toBe('Sep. 22 2025');
  });

  it('should return ISO string for string input', () => {
    expect(normalizeDate(new Date('2025-09-22T10:00:00Z'))).toBe(
      'Sep. 22 2025'
    );
  });

  it('should return empty string for invalid input', () => {
    expect(normalizeDate(new Date('invalid'))).toBe('');
    expect(normalizeDate(undefined as any)).toBe('');
  });
});
