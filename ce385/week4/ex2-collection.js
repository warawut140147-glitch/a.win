const students = [
    { id: "6601", name: "อนันต์", major: "CE", score: 82, contect: { email: "anan@dpu.ac.th", phone: "0811111111" } },
    { id: "6602", name: "ชาญ", major: "IT", score: 45, contect: { email: "chan@dpu.ac.th", phone: "0822222222" } },
    { id: "6603", name: "บีม", major: "CE", score: 71, contect: { email: "beem@dpu.ac.th", phone: "0833333333" } },
    { id: "6604", name: "ดาว", major: "IT", score: 93, contect: { email: "daow@dpu.ac.th", phone: "0844444444" } },
    { id: "6605", name: "เอ็ม", major: "CE", score: 38, contect: { email: "ame@dpu.ac.th", phone: "08555555555" } },
    { id: "6606", name: "ฟ้า", major: "IT", score: 67, contect: { email: "fha@dpu.ac.th", phone: "08666666666" } }
];

function findByID(students, id) {
    return students.find(s => s.id === String(id));
}

function findByMajor(students, major) {
    return students.filter(s => s.major === major);
}

function hasFailing(students) {
    return students.some(s => s.score < 50);
}

function getEmail(students, id) {
    const found = findByID(students, id);
    return found?.contect?.email ?? "ไม่พบข้อมูล";
}

console.log("findByID : 6601");
console.log(findByID(student, "6601"));

console.log("findBymajor : CE");
console.log(findByMajor(student, "CE"));

console.log("hasfailing");
console.log(hasFailing(student));

console.log("getEmail : 6604");
console.log(getEmail(student, "6604"));

console.log("findByID : 9999");
console.log(findByID(student, "9999"));

console.log("getEmail : 9999");
console.log(getEmail(student, "9999"));

const studentsV2 = [
    ...student,
    { id: "6607", name: "กอล์ฟ", major: "IT", score: 55,  } 
];

console.log("==students==");
console.log(student.length);

console.log("===studentsV2===");
console.log(studentsV2.length);

console.log("===getEmail 6607===");
console.log(getEmail(studentsV2, "6607"));