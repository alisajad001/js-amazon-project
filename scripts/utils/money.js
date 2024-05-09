function twoDecimalPlaces(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export { twoDecimalPlaces };
