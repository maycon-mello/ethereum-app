/* istanbul ignore file */

export default function waitUntil(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
