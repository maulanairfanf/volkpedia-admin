export const rupiah = (number)=>{
  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
  return result.replace("Rp", '').split(',')[0]
}