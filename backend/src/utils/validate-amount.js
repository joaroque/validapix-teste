export function validateAmount(amount) {
  if (isNaN(amount)) return false;
  const value = parseFloat(amount);
  if (value <= 0) return false;
  return true;
}
