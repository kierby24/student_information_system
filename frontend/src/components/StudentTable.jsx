import { useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";

function StudentTable({ students, onDelete, onEdit }) {

    const [search, setSearch] = useState("");

    const filteredStudents = students.filter((student) => {

        const keyword = search.toLowerCase();

        return (
            student.student_number.toLowerCase().includes(keyword) ||
            student.first_name.toLowerCase().includes(keyword) ||
            student.last_name.toLowerCase().includes(keyword) ||
            student.course.toLowerCase().includes(keyword) ||
            student.email.toLowerCase().includes(keyword)
        );

    });

    return (

        <>

            <div className="d-flex justify-content-between align-items-center mb-2">

                <h4 className="text">Student Records</h4>

                <input
                    className="form-control search-box "
                    placeholder=" Search Student..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <table className="table table-hover">

                <thead className="table-dark">

                    <tr className="tr">
                        <th>No.</th>
                        <th>Student ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {filteredStudents.length > 0 ? (

                        filteredStudents.map((student) => (

                            <tr key={student.id}>

                                <td>{student.id}</td>
                                <td>{student.student_number}</td>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.course}</td>
                                <td>{student.year_level}</td>
                                <td>{student.email}</td>

                                <td className="d-flex gap-2">

                                    <button
                                        className="btn-action"
                                        onClick={() => onEdit(student)}
                                    >
                                        <FaEdit/>
                                    </button>

                                    <button
                                        className="btn-action"
                                        onClick={() => onDelete(student.id)}
                                    >
                                        <FaTrash/>
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="8" className="text-center">
                                No students found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </>

    );

}

export default StudentTable;