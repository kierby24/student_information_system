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

require_once "../config/Database.php";
require_once "../controllers/StudentController.php";

// Connect to the database
$database = new Database();
$db = $database->connect();

// Create controller
$controller = new StudentController($db);

// Get JSON data sent from the frontend
$data = json_decode(file_get_contents("php://input"));

// Check if all required fields are present
if (
    isset($data->student_number) &&
    isset($data->first_name) &&
    isset($data->last_name) &&
    isset($data->course) &&
    isset($data->year_level) &&
    isset($data->email)
) {

    $success = $controller->createStudent(
        $data->student_number,
        $data->first_name,
        $data->last_name,
        $data->course,
        $data->year_level,
        $data->email
    );

    if ($success) {
        echo json_encode([
            "success" => true,
            "message" => "Student added successfully."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to add student."
        ]);
    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "Incomplete student information."
    ]);

}