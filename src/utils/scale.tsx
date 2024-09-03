export default function scale(from: number[], to: number[] = [0, 1]) {
  return function _scale(value) {
    return (value - from[0]) * (to[1] - to[0]) / (from[1] - from[0]) + to[0];
  }
}