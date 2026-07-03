import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    className: "",
    roll: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = () => {
    if (
      form.name.trim() === "" ||
      form.className.trim() === "" ||
      form.roll.trim() === ""
    ) {
      alert("Fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...form,
      attendance: "Absent",
    };

    setStudents([...students, newStudent]);

    setForm({
      name: "",
      className: "",
      roll: "",
    });
  };

  const toggleAttendance = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              attendance:
                student.attendance === "Present"
                  ? "Absent"
                  : "Present",
            }
          : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const present = students.filter(
    (s) => s.attendance === "Present"
  ).length;

  return (
    <div className="container">

      <h1>🎓 Student Management System</h1>

      <div className="stats">

        <div className="box">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>

        <div className="box green">
          <h2>{present}</h2>
          <p>Present</p>
        </div>

        <div className="box red">
          <h2>{students.length - present}</h2>
          <p>Absent</p>
        </div>

      </div>

      <div className="form">

        <input
          type="text"
          placeholder="Student Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Class"
          name="className"
          value={form.className}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Roll Number"
          name="roll"
          value={form.roll}
          onChange={handleChange}
        />

        <button onClick={addStudent}>
          Add Student
        </button>

      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Roll</th>
            <th>Status</th>
            <th>Attendance</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {students.length === 0 ? (

            <tr>
              <td colSpan="6">
                No Student Added
              </td>
            </tr>

          ) : (

            students.map((student) => (

              <tr key={student.id}>

                <td>{student.name}</td>

                <td>{student.className}</td>

                <td>{student.roll}</td>

                <td>
                  <span
                    className={
                      student.attendance === "Present"
                        ? "present"
                        : "absent"
                    }
                  >
                    {student.attendance}
                  </span>
                </td>

                <td>
                  <button
                    className="toggle"
                    onClick={() =>
                      toggleAttendance(student.id)
                    }
                  >
                    Mark
                  </button>
                </td>

                <td>
                  <button
                    className="delete"
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default App;