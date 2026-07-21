<?php

require_once "../models/Student.php";

class StudentController
{
    private $student;

    public function __construct($db)
    {
        $this->student = new Student($db);
    }

    // Get all students
    public function getAllStudents()
    {
        return $this->student->getAllStudents();
    }

    // Get one student
    public function getStudentById($id)
    {
        return $this->student->getStudentById($id);
    }

    // Add student
    public function createStudent($student_number, $first_name, $last_name, $course, $year_level, $email)
    {
        return $this->student->createStudent(
            $student_number,
            $first_name,
            $last_name,
            $course,
            $year_level,
            $email
        );
    }

    // Update student
    public function updateStudent($id, $student_number, $first_name, $last_name, $course, $year_level, $email)
    {
        return $this->student->updateStudent(
            $id,
            $student_number,
            $first_name,
            $last_name,
            $course,
            $year_level,
            $email
        );
    }

    // Delete student
    public function deleteStudent($id)
    {
        return $this->student->deleteStudent($id);
    }
}