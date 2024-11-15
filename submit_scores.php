<?php
session_start();

// Database connection
$servername = "";
$username = "";
$password = "";
$database = "";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the score and player information from the request
    $score = $_POST['score'];
    $player = $_POST['player'];
    $userId = $_SESSION['user_id'];
    // Prepare SQL statement to insert the score
    $sql_insert = "INSERT INTO scores (user_id, score, game_date) VALUES (?, ?, NOW())";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("si", $userId, $score);

    // Execute the statement
    $stmt_insert->execute();

    // Close the statement
    $stmt_insert->close();
}

// Close the database connection
$conn->close();
?>


