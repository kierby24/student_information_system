import { useState, useEffect } from "react";
import API from "../service/api";

function StudentForm({
    selectedStudent,
    fetchStudents,
    clearSelection,
    setMessage,
    setMessageType
}) {

    const [formData, setFormData] = useState({
        id: "",
        student_number: "",
        first_name: "",
        last_name: "",
        course: "",
        year_level: "",
        email: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedStudent) {
            setFormData(selectedStudent);
        }
    }, [selectedStudent]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {

        let newErrors = {};
    
        if (!formData.student_number.trim()) {
            newErrors.student_number = "Student ID is required.";
        }
    
        if (!formData.first_name.trim()) {
            newErrors.first_name = "First Name is required.";
        }
    
        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last Name is required.";
        }
    
        if (!formData.course.trim()) {
            newErrors.course = "Course is required.";
        }
    
        if (!formData.year_level.trim()) {
            newErrors.year_level = "Year Level is required.";
        }
    
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else {
    
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (!emailPattern.test(formData.email)) {
                newErrors.email = "Please enter a valid email address.";
            }
    
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        try {
    
            let response;
    
            if (formData.id) {
    
                response = await API.put("update.php", formData);
    
            } else {
    
                response = await API.post("create.php", formData);
    
            }
    
            // Bootstrap message
            if (formData.id) {

                setMessage("✏ Student updated successfully!");
            
            } else {
            
                setMessage("✅ Student added successfully!");
            
            }
            
            setMessageType("success");
            
            setTimeout(() => {
                setMessage("");
                setMessageType("");
            }, 3000);
    
            setFormData({
                id: "",
                student_number: "",
                first_name: "",
                last_name: "",
                course: "",
                year_level: "",
                email: ""
            });
    
            fetchStudents();
    
            clearSelection();
    
        } catch (error) {
    
            console.error(error);
    
            setMessage("Operation failed.");
            setMessageType("danger");
    
            setTimeout(() => {
                setMessage("");
                setMessageType("");
            }, 3000);
    
        }
    
    };

    return (

        <div className="custom-card shadow-lg">

            <div className="card-header">

                {formData.id ? "Edit Student" : "Add Student"}

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <input
                        className={`form-control mb-2 ${errors.student_number ? "is-invalid" : ""}`}
                        name="student_number"
                        placeholder="Student Number"
                        value={formData.student_number}
                        onChange={handleChange}
                    />
                    {errors.student_number && (
                        <div className="invalid-feedback d-block">
                            {errors.student_number}
                        </div>
                    )}

                    <div className="d-flex gap-1">
                    <input
                        className={`form-control mb-2 ${errors.first_name ? "is-invalid" : ""}`}
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    {errors.first_name && (
                        <div className="invalid-feedback d-block">
                            {errors.first_name}
                        </div>
                    )}

                    <input
                        className={`form-control mb-2 ${errors.last_name ? "is-invalid" : ""}`}
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    {errors.last_name && (
                        <div className="invalid-feedback d-block">
                            {errors.last_name}
                        </div>
                    )}

                    </div>

                    <select
                        className={`form-select mb-2 ${errors.course ? "is-invalid" : ""}`}
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                    >
                        <option className="select" value="">Select Course</option>
                        <option value="BSIT">BSIT</option>
                        <option value="BSCS">BSCS</option>
                        <option value="BSIS">BSIS</option>
                        <option value="BSEMC">BSEMC</option>
                        <option value="BSBA">BSBA</option>
                        <option value="BSA">BSA</option>
                    </select>

                    {errors.course && (
                        <div className="invalid-feedback d-block">
                            {errors.course}
                        </div>
                    )}

                    <select
                        className={`form-select mb-2 ${errors.year_level ? "is-invalid" : ""}`}
                        name="year_level"
                        value={formData.year_level}
                        onChange={handleChange}
                    >
                        <option value="">Select Year Level</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>

                    {errors.year_level && (
                        <div className="invalid-feedback d-block">
                            {errors.year_level}
                        </div>
                    )}

                    <input
                        className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="invalid-feedback d-block">
                            {errors.email}
                        </div>
                    )}

                    <button
                        className="btn luxury-btn w-100"
                    >
                        {formData.id ? "Update Student" : "Add Student"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default StudentForm;