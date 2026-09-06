const students = [
    { id: "6601", name: "อนันต์", major: "CE", score: 82 },
    { id: "6602", name: "ชาญ", major: "IT", score: 45 },
    { id: "6603", name: "บีม", major: "CE", score: 71 },
    { id: "6604", name: "ดาว", major: "IT", score: 93 },
    { id: "6605", name: "เอ็ม", major: "CE", score: 38 },
    { id: "6606", name: "ฟ้า", major: "IT", score: 67 }
];

function getNames(students) {
    return students.map(student => student.name);
}

function getPassedStudents(students) {
    return students.filter(student => student.score >= 50);
}

function getTotalScore(students) {
    return students.reduce((sum, student) => sum + student.score, 0);
}

function getAverageScore(students) {
    if (students.length === 0) return 0;
    return Number((getTotalScore(students) / students.length).toFixed(2));
}

function gradeOf(score) {
    if (score >= 80) return "A";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "C+";
    if (score >= 60) return "C";
    if (score >= 55) return "D+";
    if (score >= 50) return "D";
    return "F";
}

function countByGrade(students) {
    return students.reduce((acc, student) => {
        const grade = gradeOf(student.score);
        acc[grade] = (acc[grade] ?? 0) + 1;
        return acc;
    }, {});
}

function getTopStudent(students) {
    return students.reduce((best, student) => {
        if (!best || student.score > best.score) return student;
        return best;
    }, null);
}

const cePassedAverage = students
    .filter(student => student.major === "CE" && student.score >= 50)
    .map(student => student.score)
    .reduce((acc, score, index, arr) => index === arr.length - 1 ? Number(((acc + score) / arr.length).toFixed(2)) : acc + score, 0);

console.log("Names:", getNames(students));
console.log("Passed:", getPassedStudents(students));
console.log("Total score:", getTotalScore(students));
console.log("Average score:", getAverageScore(students));
console.log("Grade count:", countByGrade(students));
console.log("Top student:", getTopStudent(students));
console.log("CE passed average:", cePassedAverage);

const emptyStudents = [];
console.log("Empty names:", getNames(emptyStudents));
console.log("Empty passed:", getPassedStudents(emptyStudents));
console.log("Empty total:", getTotalScore(emptyStudents));
console.log("Empty average:", getAverageScore(emptyStudents));
console.log("Empty grade count:", countByGrade(emptyStudents));
console.log("Empty top:", getTopStudent(emptyStudents));