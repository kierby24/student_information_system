import { useEffect, useState } from "react";
import API from "../service/api";

import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

function Home() {

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const fetchStudents = async () => {
        try {
            const response = await API.get("read.php");
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const deleteStudent = async (id) => {

        if (!window.confirm("Are you sure you want to delete this student?")) {
            return;
        }

        try {

            const response = await API.delete("delete.php", {
                data: { id }
            });

            setMessage("🗑 Student deleted successfully!");
            setMessageType("success");

            setTimeout(() => {
                setMessage("");
            }, 3000);

            fetchStudents();

        } catch (error) {

            console.error(error);

            setMessage("Failed to delete student.");
            setMessageType("danger");

            setTimeout(() => {
                setMessage("");
            }, 3000);

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4 ">

                <h1 className="page-title">
                    Student Information System
                </h1>

                <p className="page-subtitle">
                    Manage student records efficiently.
                </p>

                {message && (
                    <div
                        className={`alert alert-${messageType} alert-dismissible fade show shadow`}
                        role="alert">
                        {message}
                    </div>
                )}

                <div className="dashboard-box">

                    <div className="counter-circle">

                        <h2>{students.length}</h2>

                    </div>

                    <p>TOTAL STUDENTS</p>

                </div>

                <div className="row">


                    <div className="col-md-4">
                        <StudentForm
                            selectedStudent={selectedStudent}
                            fetchStudents={fetchStudents}
                            clearSelection={() => setSelectedStudent(null)}
                            setMessage={setMessage}
                            setMessageType={setMessageType}
                        />
                    </div>

                    <div className="col-lg-8">

                        <StudentTable
                            students={students}
                            onDelete={deleteStudent}
                            onEdit={setSelectedStudent}
                        />

                    </div>

                </div>

                <div className="footer">

                    © 2026 Student Information System
                    <p>Designed by-Kierpf</p>

                </div>

            </div>
        </>
    );
}

export default Home;