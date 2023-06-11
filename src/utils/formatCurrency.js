export function formatCurrency(input) {
  let inputWithoutCommas = input;
  if (typeof input === "string") {
    inputWithoutCommas = input.replace(/[Rp.,\s]/g, ""); // Menghilangkan titik dari input
  }
  let inputConversion = +inputWithoutCommas;

  const rupiah = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(inputConversion);

  return rupiah;
}
