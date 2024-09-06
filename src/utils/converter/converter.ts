export function convertUnits(
  value: number,
  fromUnit: string,
  toUnit: string,
): number {
  const conversionRates = {
    meter: {
      meter: 1,
      centimeter: 100,
      inch: 39.3701,
      feet: 3.28084,
      yard: 1.09361,
    },
    centimeter: {
      meter: 0.01,
      centimeter: 1,
      inch: 0.393701,
      feet: 0.0328084,
      yard: 0.0109361,
    },
    inch: {
      meter: 0.0254,
      centimeter: 2.54,
      inch: 1,
      feet: 0.0833333,
      yard: 0.0277778,
    },
    feet: {
      meter: 0.3048,
      centimeter: 30.48,
      inch: 12,
      feet: 1,
      yard: 0.333333,
    },
    yard: { meter: 0.9144, centimeter: 91.44, inch: 36, feet: 3, yard: 1 },
    C: {
      C: 1,
      F: (v: number) => (v * 9) / 5 + 32,
      K: (v: number) => v + 273.15,
    },
    F: {
      C: (v: number) => ((v - 32) * 5) / 9,
      F: 1,
      K: (v: number) => ((v + 459.67) * 5) / 9,
    },
    K: {
      C: (v: number) => v - 273.15,
      F: (v: number) => (v * 9) / 5 - 459.67,
      K: 1,
    },
  };

  const converter = conversionRates[fromUnit][toUnit];
  return typeof converter === 'function' ? converter(value) : value * converter;
}
