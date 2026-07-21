<?php

require_once "config/Database.php";

$database = new Database();
$conn = $database->connect();

if ($conn) {
    echo "Database connected successfully😂";
} else {
    echo "Connection failed.";
}