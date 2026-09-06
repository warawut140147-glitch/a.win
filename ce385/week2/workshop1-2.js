// ===== Workshop 1 · ข้อที่ 2 — ชนิดข้อมูลและ typeof =====

// ส่วนที่ 1: สร้างตัวแปรครบ 6 ชนิด (ชนิดห้ามพิมพ์ตายตัว ต้องได้จาก typeof เสมอ)
const greeting = 'สวัสดี';
const luckyNumber = 42;
const isStudent = true;
let notAssigned;
const nothing = null;
const hobbies = ['อ่านหนังสือ', 'เขียนโค้ด', 'ฟังเพลง'];

console.log('===== ส่วนที่ 1: ค่าและชนิดของตัวแปร =====');
console.log(`ค่า: ${greeting} | ชนิด: ${typeof greeting}`);
console.log(`ค่า: ${luckyNumber} | ชนิด: ${typeof luckyNumber}`);
console.log(`ค่า: ${isStudent} | ชนิด: ${typeof isStudent}`);
console.log(`ค่า: ${notAssigned} | ชนิด: ${typeof notAssigned}`);
console.log(`ค่า: ${nothing} | ชนิด: ${typeof nothing}`);
console.log(`ค่า: ${hobbies} | ชนิด: ${typeof hobbies}`);

// ส่วนที่ 2: ตอบคำถามด้วยโค้ด — คำตอบทุกข้อดึงมาจาก typeof ทั้งหมด
console.log('\n===== ส่วนที่ 2: คำถาม =====');
console.log(`1) typeof null ได้ผลว่า: ${typeof null}`);
console.log(`   ถูกต้องตามความเป็นจริงหรือไม่: ไม่ถูกต้อง — เป็นบั๊กที่สืบทอดมาแต่เดิมของ JavaScript`);
console.log(`2) ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า มีชนิด: ${typeof notAssigned}`);
const notANumber = Number('abc');
console.log(`3) typeof NaN ได้ผลว่า: ${typeof notANumber} (ตรวจว่าเป็น NaN จริงๆ ด้วย Number.isNaN: ${Number.isNaN(notANumber)})`);

// ส่วนที่ 3: การแปลงชนิด — ค่าจากผู้ใช้มาเป็นข้อความเสมอ
const inputAge = '20';
const inputScore = '85.5';

console.log('\n===== ส่วนที่ 3: การแปลงชนิด =====');
console.log(`แบบไม่แปลง: inputAge + 5 = ${inputAge + 5} (ต่อท้ายกันไปเป็นข้อความ)`);
const agePlusFive = Number(inputAge) + 5;
console.log(`แปลงแล้วบวก 5: Number(inputAge) + 5 = ${agePlusFive} | ชนิด: ${typeof agePlusFive}`);

const scoreNumber = Number(inputScore);
console.log(`inputScore แปลงแล้วแสดงทศนิยม 1 ตำแหน่ง: ${scoreNumber.toFixed(1)}`);

console.log(`inputAge === 20 ได้ผล: ${inputAge === 20} (ข้อความ "20" ไม่ใช่ตัวเลข จึงไม่เท่ากัน)`);
console.log(`Number(inputAge) === 20 ได้ผล: ${Number(inputAge) === 20} (แปลงเป็นตัวเลขก่อนแล้วจึงเท่ากัน)`);
