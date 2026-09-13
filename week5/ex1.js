const Student = [
    {id: "6601", name: "สมศักดิ์", major: "วิศวกรรมศาสตร์", score: 85},
    {id: "6602", name: "สมหญิง", major: "วิทยาศาสตร์", score: 92},
    {id: "6603", name: "สมชาย", major: "คณิตศาสตร์", score: 78},
    {id: "6604", name: "สมปอง", major: "วิศวกรรมศาสตร์", score: 65},
];

function fetchStudentById(id, callback) {
    if (typeof id !== "string" || id.trim() === "") {
        return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
        const student = Student.find((s) => s.id === id);
        if (!student) {
            return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
        }

        // แก้ไข: ส่งสำเนา object ({ ...student }) และตัดวงเล็บที่เกินออก
        return callback(null, { ...student });
    }, 300);
}

console.log("เริ่มทำงาน");

// ก) กรณี id ที่มีจริง
fetchStudentById("6601", (error, student) => {
    if (error) {
        console.log("เกิดข้อผิดพลาด:", error.message);
        return;
    }
    console.log("กรณี ก) สำเร็จ:", student);
});

// ข) กรณี id ที่ไม่มีในระบบ
fetchStudentById("9999", (error, student) => {
    if (error) {
        console.log("กรณี ข) เกิดข้อผิดพลาด:", error.message);
        return;
    }
    console.log("กรณี ข) สำเร็จ:", student);
});

// ค) กรณี id ผิดรูปแบบ (เช่น ส่งตัวเลข 42)
fetchStudentById(42, (error, student) => {
    if (error) {
        console.log("กรณี ค) เกิดข้อผิดพลาด:", error.message);
        return;
    }
    console.log("กรณี ค) สำเร็จ:", student);
});

/*
 * ==============================================================================
 * คำตอบส่วนที่ 4 (Comment ท้ายไฟล์)
 * ==============================================================================
 *
 * ① ถ้าลืมตรวจ error แล้วอ่าน .name ทันที จะเกิดอะไร ใครเห็น error นั้น?
 * ตอบ: จะเกิด Uncaught TypeError (เช่น Cannot read properties of undefined (reading 'name'))
 *      เพราะเมื่อเกิด error ค่าตัวแประรับผลลัพธ์จะเป็น undefined ทำให้โปรแกรม Crash ทันที
 *      ผู้เห็น error คือ ผู้พัฒนาหรือผู้ดูแลระบบที่รันโปรแกรมผ่าน Terminal / Console Log
 *
 * ② ทำไมต้อง return หลังเรียก callback(error)?
 * ตอบ: เพื่อหยุดการทำงานของฟังก์ชันทันที ป้องกันไม่ให้โค้ดส่วนที่เหลือในฟังก์ชันทำงานต่อ 
 *      หรือป้องกันการเรียก callback ซ้ำเป็นครั้งที่สอง (Double Callback Trigger)
 */