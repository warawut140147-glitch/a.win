// Workshop 1 · ข้อที่ 3 — เครื่องคิดเลขคะแนน (CE385)

// ----- เกณฑ์คงที่ของรายวิชา -----
const WORKSHOP_FULL = 60;        // คะแนนเต็ม Workshop ดิบ
const WORKSHOP_WEIGHT = 20;      // น้ำหนัก Workshop หลังแปลง
const TOTAL_FULL = 100;          // คะแนนเต็มของรายวิชา
const TARGET_GRADE_A = 80;       // คะแนนเป้าหมาย

// ----- ส่วนที่ 1: คะแนนดิบ -----
const workshopRaw = 48;   // เต็ม 60
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

// ----- ส่วนที่ 2: คำนวณ -----
// สูตรแปลง Workshop: (คะแนนดิบ ÷ คะแนนเต็ม) × น้ำหนัก = (48 ÷ 60) × 20 = 16.00
const workshopScore = (workshopRaw / WORKSHOP_FULL) * WORKSHOP_WEIGHT;

// คะแนนรวม = Workshop (แปลงแล้ว) + เข้าเรียน + โปรเจกต์ + กลางภาค + ปลายภาค
const totalScore = workshopScore + attendance + project + midterm + final;

// เปอร์เซ็นต์ของคะแนนรวมเทียบคะแนนเต็ม 100 = (คะแนนรวม ÷ 100) × 100
const percentOfTotal = (totalScore / TOTAL_FULL) * 100;

// คะแนนที่ยังขาดเพื่อถึงเป้า 80 = เป้าหมาย − คะแนนรวม (ติดลบ = เกินเป้าแล้ว)
const scoreNeeded = TARGET_GRADE_A - totalScore;

// ----- ส่วนที่ 3: ใบสรุปคะแนน -----
const summary = `
========== ใบสรุปคะแนน CE385 ==========
Workshop (ดิบ)      : ${workshopRaw} / ${WORKSHOP_FULL}
Workshop (แปลงแล้ว)  : ${workshopScore.toFixed(2)} / ${WORKSHOP_WEIGHT}
Attendance          : ${attendance.toFixed(2)}
Project             : ${project.toFixed(2)}
Midterm             : ${midterm.toFixed(2)}
Final               : ${final.toFixed(2)}
--------------------------------------
คะแนนรวม           : ${totalScore.toFixed(2)} / ${TOTAL_FULL}
คิดเป็นเปอร์เซ็นต์    : ${percentOfTotal.toFixed(2)}%
ขาดอีกเพื่อถึง ${TARGET_GRADE_A}    : ${scoreNeeded.toFixed(2)} คะแนน
======================================`;

console.log(summary);
