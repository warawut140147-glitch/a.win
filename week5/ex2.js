// ==============================================================================
// ข้อมูลตั้งต้นของนักศึกษา
// ==============================================================================
const students = [
  { id: "6601", name: "สมศักดิ์", major: "วิศวกรรมศาสตร์", score: 85 },
  { id: "6602", name: "สมหญิง", major: "วิทยาศาสตร์", score: 92 },
  { id: "6603", name: "สมชาย", major: "คณิตศาสตร์", score: 78 },
  { id: "6604", name: "สมปอง", major: "วิศวกรรมศาสตร์", score: 65 },
];

// ==============================================================================
// ส่วนที่ 1 — fetchStudentByIdAsync(id) ที่คืน Promise (ห้ามใช้คำสั่ง async)
// ==============================================================================
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    // ตรวจสอบเงื่อนไข id
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    // จำลองฐานข้อมูลตอบช้าด้วย setTimeout 300ms
    setTimeout(() => {
      const student = students.find((s) => s.id === id);

      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }

      // ส่งสำเนาวัตถุกลับผ่าน resolve
      return resolve({ ...student });
    }, 300);
  });
}

// ==============================================================================
// ส่วนที่ 2 — เรียกใช้งานครบ 3 กรณีด้วย .then / .catch / .finally
// ==============================================================================
console.log("=== ส่วนที่ 2: ทดสอบ 3 กรณีด้วย .then / .catch / .finally ===");

// ก) id ที่มีจริง
fetchStudentByIdAsync("6601")
  .then((student) => {
    console.log("กรณี ก) สำเร็จ:", student);
  })
  .catch((error) => {
    console.error("กรณี ก) ล้มเหลว:", error.message);
  })
  .finally(() => {
    console.log("กรณี ก) ทำงานเสร็จสิ้น (.finally)");
  });

// ข) id ที่ไม่มีในระบบ
fetchStudentByIdAsync("9999")
  .then((student) => {
    console.log("กรณี ข) สำเร็จ:", student);
  })
  .catch((error) => {
    console.error("กรณี ข) ล้มเหลว:", error.message);
  })
  .finally(() => {
    console.log("กรณี ข) ทำงานเสร็จสิ้น (.finally)");
  });

// ค) id ผิดรูปแบบ (ส่งตัวเลข 42)
fetchStudentByIdAsync(42)
  .then((student) => {
    console.log("กรณี ค) สำเร็จ:", student);
  })
  .catch((error) => {
    console.error("กรณี ค) ล้มเหลว:", error.message);
  })
  .finally(() => {
    console.log("กรณี ค) ทำงานเสร็จสิ้น (.finally)");
  });

// ==============================================================================
// ส่วนที่ 3 — โซ่ (Promise Chain) 3 ขั้น (ต้อง return ค่าส่งต่อทุกขั้น)
// ==============================================================================
setTimeout(() => {
  console.log("\n=== ส่วนที่ 3: ทดสอบ Promise Chain 3 ขั้น ===");

  fetchStudentByIdAsync("6601")
    .then((student) => {
      // ขั้นที่ 1: แปลงเป็น { name, grade } โดยใช้กฎตัดเกรด
      let grade = "F";
      if (student.score >= 80) grade = "A";
      else if (student.score >= 70) grade = "B";
      else if (student.score >= 60) grade = "C";
      else if (student.score >= 50) grade = "D";

      return { name: student.name, grade: grade }; // return ส่งต่อให้ขั้นที่ 2
    })
    .then((data) => {
      // ขั้นที่ 2: แปลงเป็นข้อความรายงาน 1 บรรทัด
      return `รายงานผลการเรียน: คุณ${data.name} ได้เกรด ${data.grade}`; // return ส่งต่อให้ขั้นที่ 3
    })
    .then((reportMessage) => {
      // ขั้นที่ 3: พิมพ์ออกทาง console
      console.log("[ขั้นที่ 3 พิมพ์ผล]:", reportMessage);
      return reportMessage; // return ค่าปิดท้ายโซ่
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในโซ่:", error.message);
    });
}, 1000);

// ==============================================================================
// ส่วนที่ 4 (โบนัส +0.5) — ฟังก์ชัน promisify(fn) อเนกประสงค์
// ==============================================================================
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };
}

// --- ทดสอบ promisify กับฟังก์ชัน Callback อื่นที่ไม่ใช่ข้อ 1 ---
// ตัวอย่าง: ฟังก์ชันคำนวณการหารแบบ Error-first Callback
function calculateDivision(a, b, callback) {
  setTimeout(() => {
    if (typeof a !== "number" || typeof b !== "number") {
      return callback(new Error("ข้อมูลต้องเป็นตัวเลขเท่านั้น"));
    }
    if (b === 0) {
      return callback(new Error("ไม่สามารถหารด้วย 0 ได้"));
    }
    return callback(null, a / b);
  }, 200);
}

// แปลงฟังก์ชัน calculateDivision เป็นเวอร์ชัน Promise
const calculateDivisionAsync = promisify(calculateDivision);

setTimeout(() => {
  console.log("\n=== ส่วนที่ 4 (โบนัส): ทดสอบ promisify(fn) กับฟังก์ชันการหาร ===");

  // กรณีคำนวณสำเร็จ (10 / 2)
  calculateDivisionAsync(10, 2)
    .then((result) => console.log("ผลการคำนวณ 10 / 2 =", result))
    .catch((error) => console.error("เกิดข้อผิดพลาด:", error.message));

  // กรณีหารด้วย 0 (เกิด error)
  calculateDivisionAsync(10, 0)
    .then((result) => console.log("ผลการคำนวณ 10 / 0 =", result))
    .catch((error) => console.error("เกิดข้อผิดพลาด:", error.message));
}, 2000);