// ==============================================================================
// ฟังก์ชัน fetchStudentByIdAsync ( Promise จากข้อ 2 )
// ==============================================================================
const students = [
  { id: "6601", name: "สมศักดิ์", major: "วิศวกรรมศาสตร์", score: 85 },
  { id: "6602", name: "สมหญิง", major: "วิทยาศาสตร์", score: 92 },
  { id: "6603", name: "สมชาย", major: "คณิตศาสตร์", score: 78 },
  { id: "6604", name: "สมปอง", major: "วิศวกรรมศาสตร์", score: 65 },
];

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
      const student = students.find((s) => s.id === id);
      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }
      return resolve({ ...student });
    }, 300);
  });
}

// ฟังก์ชันตัดเกรดสำหรับส่วนที่ 3
function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// ==============================================================================
// ส่วนที่ 1 — reportSequential(): ดึงข้อมูลนักศึกษาทีละคน (Sequential)
// ==============================================================================
async function reportSequential(targetIds) {
  console.log("=== ส่วนที่ 1: ดึงข้อมูลแบบลำดับ (Sequential) ===");
  const startTime = Date.now();
  const results = [];

  for (const id of targetIds) {
    const student = await fetchStudentByIdAsync(id);
    results.push(student);
  }

  const duration = Date.now() - startTime;
  console.log("ผลลัพธ์:", results);
  console.log(`ใช้เวลาทั้งหมด: ${duration} ms\n`);
  return duration;
}

// ==============================================================================
// ส่วนที่ 2 — reportParallel(): ดึงข้อมูลนักศึกษาพร้อมกัน (Parallel)
// ==============================================================================
async function reportParallel(targetIds, seqDuration) {
  console.log("=== ส่วนที่ 2: ดึงข้อมูลแบบขนาน (Parallel) ===");
  const startTime = Date.now();

  const promises = targetIds.map((id) => fetchStudentByIdAsync(id));
  const results = await Promise.all(promises);

  const duration = Date.now() - startTime;
  console.log("ผลลัพธ์:", results);
  console.log(`ใช้เวลาทั้งหมด: ${duration} ms`);

  const speedup = (seqDuration / duration).toFixed(2);
  console.log(`เปรียบเทียบ: แบบขนานทำงานเร็วกว่าแบบลำดับประมาณ ${speedup} เท่า\n`);
}

// ==============================================================================
// ส่วนที่ 3 — safeReport(id): ครบ try-catch-finally
// ==============================================================================
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = getGrade(student.score);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

// ==============================================================================
// main(): ฟังก์ชันหลักในการรันตามลำดับ
// ==============================================================================
async function main() {
  const targetIds = ["6601", "6602", "6603"];

  // รันส่วนที่ 1
  const seqDuration = await reportSequential(targetIds);

  // รันส่วนที่ 2 (รอให้ส่วนที่ 1 ทำงานเสร็จก่อน)
  await reportParallel(targetIds, seqDuration);

  // รันส่วนที่ 3
  console.log("=== ส่วนที่ 3: ทดสอบ safeReport ด้วย try-catch-finally ===");
  await safeReport("6601"); // กรณีพบข้อมูล
  await safeReport("9999"); // กรณีไม่พบข้อมูล
  await safeReport(42);     // กรณี id ผิดรูปแบบ
}

main();

/*
 * ==============================================================================
 * ส่วนที่ 4 — คำตอบสำหรับคำถามท้ายไฟล์
 * ==============================================================================
 *
 * ① ทำไม try-catch ครอบ await จับ reject ได้ แต่ครอบการเรียก callback ธรรมดาไม่ได้?
 * ตอบ: 
 *   - ตัวคำสั่ง `await` จะทำการแปลงสถานะ Rejected ของ Promise ให้กลายเป็น Exception (throw error) 
 *     ภายใน Execution Context ของ async function ทำให้บล็อก `try...catch` สามารถดักจับ (catch) ได้
 *   - ในขณะที่ Callback ธรรมดาจะถูกส่งไปทำงานใน Event Loop รอบถัดไป (Asynchronous Stack Frame) 
 *     ซึ่งในขณะที่ Callback เกิดข้อผิดพลาด Call Stack ของบล็อก `try...catch` เดิมได้ทำงานเสร็จและถูกป๊อปออกจาก Memory ไปแล้ว
 *     จึงไม่มี try-catch คอยดักจับ error นั้น ส่งผลให้เกิด Uncaught Error
 *
 * ② ทดลอง "ลืม await" หน้า Promise.all แล้วเอาผลไปใช้ต่อ — เกิดอะไรขึ้น?
 * ตอบ: 
 *   - หากเขียน `const results = Promise.all(promises);` โดยลืมใส่ `await` 
 *     ตัวแปร `results` จะไม่ได้เก็บ Array ของข้อมูลนักศึกษาจริง แต่จะเก็บวัตถุ `Promise { <pending> }`
 *   - เมื่อนำ `results` ไปใช้ต่อทันที เช่น การวนลูปหรือการอ่านค่าข้อมูล โปรแกรมจะไม่รอให้ข้อมูลโหลดเสร็จ 
 *     และจะได้ค่าเป็น Promise object แทนที่จะเป็น Array ของนักศึกษา ทำให้การประมวลผลผิดพลาด 
 *     หรือเกิด TypeError หากนำไปเรียกใช้ Method ของ Array โดยตรง
 */