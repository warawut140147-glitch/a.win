const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 100;

function toGrade(score) {
    if (!isValidScore(score)) return 'N/A';

    const GRADES_RESULTS = [
        { min: 80, grade: 'A' },
        { min: 75, grade: 'B+' },
        { min: 70, grade: 'B' },
        { min: 65, grade: 'C+' },
        { min: 60, grade: 'C' },
        { min: 55, grade: 'D+' },
        { min: 50, grade: 'D' },
        { min: 0, grade: 'F' }
    ];

    const matched = GRADES_RESULTS.find(rule => score >= rule.min);
    return matched ? matched.grade : 'F';
}

const calculateWorkshopScore = (raw, full = 60, weight = 20) => (raw / full) * weight;

function calculateTotal(workshop, attendance, project, midterm, final) {
    return workshop + attendance + project + midterm + final;
}

const studentRaw = [
    { name: 'สมชาย', rawWorkshop: 48, attendance: 10, project: 20, midterm: 18, final: 24 },
    { name: 'สมหมาย', rawWorkshop: 54, attendance: 8, project: 15, midterm: 12, final: 18 },
    { name: 'สมน้ำหน้า', rawWorkshop: 30, attendance: 5, project: 10, midterm: 8, final: 12 }
];

const studentTableData = studentRaw.map(student => {
    const workshopScore = calculateWorkshopScore(student.rawWorkshop);
    const total = calculateTotal(
        workshopScore,
        student.attendance,
        student.project,
        student.midterm,
        student.final
    );

    return {
        Name: student.name,
        'Workshop (20)': workshopScore,
        Attendance: student.attendance,
        Project: student.project,
        Midterm: student.midterm,
        Final: student.final,
        Total: total,
        Grade: toGrade(total)
    };
});

console.table(studentTableData);

const test1 = calculateWorkshopScore(48);
const test2 = calculateWorkshopScore(48, 60, 20);
const test3 = calculateWorkshopScore(14, undefined, 25);

console.log('test1 (48):', test1);
console.log('test2 (48, 60, 20):', test2);
console.log('ผลลัพท์เท่ากันหรือไม่ (test1 === test2):', test1 === test2);
console.log('test3 (14, undefined, 25):', test3);