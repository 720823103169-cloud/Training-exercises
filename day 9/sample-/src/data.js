// Sample Student Data

export const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    rollNo: "101",
    department: "Computer Science",
    year: "3rd Year",
    attendance: 92,
    cgpa: 8.9,
    fees: "Paid",
  },
  {
    id: 2,
    name: "Priya Singh",
    rollNo: "102",
    department: "Information Technology",
    year: "2nd Year",
    attendance: 96,
    cgpa: 9.5,
    fees: "Pending",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    rollNo: "103",
    department: "Electronics",
    year: "4th Year",
    attendance: 88,
    cgpa: 8.3,
    fees: "Paid",
  },
];

// Add Student
export function addStudent(list, student) {
  return [...list, { id: Date.now(), ...student }];
}

// Delete Student
export function deleteStudent(list, id) {
  return list.filter(student => student.id !== id);
}

// Update Student
export function updateStudent(list, updatedStudent) {
  return list.map(student =>
    student.id === updatedStudent.id ? updatedStudent : student
  );
}

// Search Student
export function searchStudents(list, keyword) {
  return list.filter(student =>
    student.name.toLowerCase().includes(keyword.toLowerCase()) ||
    student.rollNo.includes(keyword)
  );
}

// Dashboard Statistics
export function getStatistics(list) {
  return {
    totalStudents: list.length,
    paidFees: list.filter(s => s.fees === "Paid").length,
    pendingFees: list.filter(s => s.fees === "Pending").length,
    averageAttendance:
      list.length > 0
        ? (
            list.reduce((sum, s) => sum + s.attendance, 0) / list.length
          ).toFixed(1)
        : 0,
    averageCGPA:
      list.length > 0
        ? (
            list.reduce((sum, s) => sum + s.cgpa, 0) / list.length
          ).toFixed(2)
        : 0,
  };
}