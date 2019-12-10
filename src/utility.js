
function toStringWithDigits(num, digits = 6) {
  const delta = Math.pow(10, digits);
  return Math.round(num * delta) / delta;
}

function roundDigits(num, digits) {
  if (typeof digits === "undefined") {
    digits = 6;
  }
  const delta = Math.pow(10, digits);
  return Math.round(num * delta) / delta;
}

export { toStringWithDigits, roundDigits };