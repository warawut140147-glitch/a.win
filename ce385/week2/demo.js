function getPriceBuggy(size) {
  let price = 0;
  switch (size) {
    case "S":  return 30; 
    case "M":  return 45; 
    case "L":  return 60; 
    default:   return 0;
     break;
  }
  return price;
}

function getPriceFixed(size) {
  switch (size) {
    case "S": return 30; 
    case "M": return 45; 
    case "L": return 60;
    default:  return 0;
     break;
  }
}

for (const s of ["S", "M", "L", "XL"]) {
  console.log("ขนาด " + s + " → มีบั๊ก: " + getPriceBuggy(s) + " | แก้แล้ว: " + getPriceFixed(s));
}