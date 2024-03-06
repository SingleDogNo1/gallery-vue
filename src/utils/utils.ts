export function random(range: [number, number]) {
  const max = Math.max(range[0], range[1])
  const min = Math.min(range[0], range[1])
  const diff = max - min
  const number = Math.random() * diff + min
  return parseInt(number as unknown as string)
}