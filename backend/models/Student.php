<?php

class Student
{
    private $conn;
    private $table = "students";

    // Constructor receives the database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get all students
    public function getAllStudents()
    {
        $query = "SELECT * FROM " . $this->table . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Get one student by ID
    public function getStudentById($id)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt;
    }

    // Create a new student
    public function createStudent($student_number, $first_name, $last_name, $course, $year_level, $email)
    {
        $query = "INSERT INTO " . $this->table . "
                (student_number, first_name, last_name, course, year_level, email)
                VALUES
                (:student_number, :first_name, :last_name, :course, :year_level, :email)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":student_number", $student_number);
        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":course", $course);
        $stmt->bindParam(":year_level", $year_level);
        $stmt->bindParam(":email", $email);

        return $stmt->execute();
    }

    // Update an existing student
    public function updateStudent($id, $student_number, $first_name, $last_name, $course, $year_level, $email)
    {
        $query = "UPDATE " . $this->table . "
                SET
                    student_number = :student_number,
                    first_name = :first_name,
                    last_name = :last_name,
                    course = :course,
                    year_level = :year_level,
                    email = :email
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":student_number", $student_number);
        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":course", $course);
        $stmt->bindParam(":year_level", $year_level);
        $stmt->bindParam(":email", $email);

        return $stmt->execute();
    }

    // Delete a student
    public function deleteStudent($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }
}