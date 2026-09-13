// // const STUDENTS = [
// //     {id: 6501, name: 'สมหญิง', score: 78},
// //     {id: 6502, name: 'สมชาย', score: 92},
// // ];

// // function fetchStudentByid(id, callback) {
// //     setTimeout(() => {
// //         const student = STUDENTS.find((s) => s.id === id);
// //         callback(student);
// //     }, 400);
// // }
// // fetchStudentByid(6501, (student) => {
// //     console.log("ได้ข้อมูล", student.name);
// //     });
// // console.log("บรรทัดนี้พิมพ์ก่อน");

// const STUDENTS = [{id : "6501", name : "สมชาย", score: 78}]
// function fetchStudentById(id) {
//     return new Promise((resolve) => {
//         setTimeout(() => { resolve(STUDENTS.find((s) => s.id === id)) }, 400);
//     });
// }
// fetchStudentById("6501")
//     .then((student) => {
//         console.log("ขั้น1: ได้oักศึกษา", student.name);
//         return student.score;
//     })
//     .then((score) => {
//         console.log("ขั้น2: ได้คะแนน", score);
//         return score >= 60 ? "B" : "F";
//     })
//     .then((grade) => {
//         console.log("ขั้น3: ได้เกรด", grade);
//     });

const STUDENTS = [{ id: "6501", name: "สมชาย", score: 78 }];

function fetchStudentById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = STUDENTS.find((s) => s.id === id);
      if (student) resolve(student);
      else reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }, 400);
  });
}

async function safeReport(id) {
  try {
    const student = await fetchStudentById(id);   // จุดเวทมนตร์
    console.log("สำเร็จ  :", student.name);
  } catch (error) {
    console.log("ดักได้  :", error.message);       // reject จาก 400ms ก่อนหน้า มาถึงมือเรา!
  } finally {
    console.log("finally : ปิดงานเสมอ");
  }
}

safeReport("6501");