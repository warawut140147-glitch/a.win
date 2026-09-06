// ===== Workshop 1 · ข้อที่ 1 — บัตรแนะนำตัว =====

// ส่วนที่ 1: สร้างตัวแปรเก็บข้อมูลส่วนตัว 5 อย่าง (ห้ามใช้ var จึงใช้ const)
const nickname = 'อวิน';
const studentId = 65012345;
const age = 20;
const major = 'วิศวกรรมคอมพิวเตอร์';
const enrolledCourses = 6;

// ส่วนที่ 2: คำนวณปีที่จะจบ = ปีปัจจุบัน (2569) + จำนวนปีที่เหลือ — ไม่พิมพ์เลขตายตัว
const yearsLeft = 2;
const gradYear = 2569 + yearsLeft;

console.log(`===== บัตรแนะนำตัว =====`);
console.log(`ชื่อเล่น      : ${nickname}`);
console.log(`รหัสนักศึกษา  : ${studentId}`);
console.log(`อายุ         : ${age} ปี`);
console.log(`สาขาวิชา      : ${major}`);
console.log(`ลงทะเบียน    : ${enrolledCourses} วิชา`);
console.log(`ปีที่จะจบ      : ${gradYear}`);
console.log(`========================`);
