<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include required files
require_once "../config/Database.php";
require_once "../models/Student.php";

// Create database connection
$database = new Database();
$db = $database->connect();

// Create Student object
$student = new Student($db);

// Get all students
$result = $student->getAllStudents();

// Fetch all rows as an associative array
$students = $result->fetchAll(PDO::FETCH_ASSOC);

// Return JSON
echo json_encode($students);