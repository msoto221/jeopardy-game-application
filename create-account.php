<?php
// Connect to your MySQL database
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

// Define a variable to hold error message
$error_message = "";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $fname = $_POST['first-name'];
    $lname = $_POST['last-name'];
    $userid = $_POST['user-id'];
    $pass = $_POST['password'];

    // Check if username already exists
    $check_sql = "SELECT * FROM users WHERE user_id = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $userid);
    $check_stmt->execute();
    $result = $check_stmt->get_result();

    if ($result->num_rows > 0) {
        // Username already exists, set error message
        header("Location: messages/account-exists.html");
        exit();
    } else {
        // Username is available, proceed with account creation
        // Prepare SQL statement
        $sql = "INSERT INTO users (first_name, last_name, user_id, password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        // Bind parameters and execute statement
        $stmt->bind_param("ssss", $fname, $lname, $userid, $pass);
        $stmt->execute();

        // Check if the query was successful
        if ($stmt->affected_rows > 0) {
            // Redirect to success page
            header("Location: messages/success.html");
            exit(); // Make sure no other output is sent
        } else {
            // Handle error
            echo "Error: " . $conn->error;
        }

        // Close statement
        $stmt->close();
    }

    // Close check statement and result
    $check_stmt->close();
    $result->close();
}

// Close connection
$conn->close();
?>