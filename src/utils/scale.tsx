export default function scale(from: number[], to: number[] = [0, 1]) {
  return function _scale(value: number) {
    return ((value - from[0]) * (to[1] - to[0])) / (from[1] - from[0]) + to[0];
  };
}

export function logScale(
  from: number[],
  steepness: number = 1,
  to: number[] = [0, 10]
) {
  return function _logScale(value: number) {
    const normalizedValue = (value - from[0]) / (from[1] - from[0]);

    const operand = 1 + normalizedValue * (Math.pow(10, steepness) - 1);

    const logarithmicValue =
      operand > 0
        ? Math.log10(operand) / steepness
        : -Math.log10(Math.abs(operand)) / steepness;

    // Scale the logarithmic value to the target range
    return to[0] + logarithmicValue * (to[1] - to[0]);
  };
}

export function clamp(num: number, range: number[]) {
  return Math.max(range[0], Math.min(num, range[1]));
}
export function clamped(
  scaleFn: (...args: any[]) => number,
  range: number[] = [0, 1]
) {
  return function clampedScale(value: number) {
    return clamp(scaleFn(value), range);
  };
}
