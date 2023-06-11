export function convertToNumber(input) {
  let inputWithoutCommas = input;
  if (typeof input === "string") {
    inputWithoutCommas = input.replace(/[Rp.,\s]/g, ""); // Menghilangkan titik dari input
  }
  let inputConversion = +inputWithoutCommas;
  return inputConversion;
}
