// Workshop 1 · ข้อที่ 5 — ระบบสั่งอาหาร
// เมนู: ข้าวผัด 50 · ผัดไทย 60 · ต้มยำกุ้ง 120 · ข้าวมันไก่ 50 · ข้าวหมูแดง 50

// ส่วนที่ 1 — หาราคาเมนูด้วย switch
// ใช้ return แทน break ทุก case เพื่อไม่ต้องกังวลเรื่องลืม break
// Hint: switch เทียบค่าแบบ === เสมอ จึง .trim() กันช่องว่างหน้า/หลัง กัน case หลุดไป default
function getMenuPrice(menu) {
  switch (menu.trim()) {
    // fall-through โดยจงใจ: 3 เมนูนี้ราคา 50 เท่ากัน จึงรวม case แทนการ return 50 ซ้ำ 3 ครั้ง
    case "ข้าวผัด":
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
      return 50;
    case "ผัดไทย":
      return 60;
    case "ต้มยำกุ้ง":
      return 120;
    default:
      return 0; // ไม่มีในรายการ
  }
}

// ส่วนที่ 2 — ตัวคูณตามขนาดหน้าตัก
function getSizeMultiplier(size) {
  switch (size.trim()) {
    case "ธรรมดา":
      return 1;
    case "พิเศษ":
      return 1.5;
    case "จัมโบ้":
      return 2;
    default:
      return 1; // ขนาดที่ไม่รู้จัก ถือว่าธรรมดา
  }
}

// ส่วนที่ 3 — คิดราคารวมของออร์เดอร์
// มี "ส้มตำ" ที่ไม่มีในรายการเมนู เพื่อทดสอบ default (ราคา 0 บาท)
const orders = [
  { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
  { menu: "ข้าวผัด", size: "ธรรมดา", qty: 1 },
  { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
  { menu: "ข้าวหมูแดง", size: "พิเศษ", qty: 3 },
  { menu: "ส้มตำ", size: "ธรรมดา", qty: 2 }
];

let total = 0;

for (const order of orders) {
  const price = getMenuPrice(order.menu) * getSizeMultiplier(order.size) * order.qty;
  total += price;
  console.log(order.menu + " (" + order.size + ") x" + order.qty + " = " + price + " บาท");
}

console.log("รวมทั้งบิล = " + total + " บาท");
