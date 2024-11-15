<?php
session_start();

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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

    // Get form data
    $userid = $_POST['user-id'];
    $pass = $_POST['password'];

    // Prepare SQL statement
    $sql = "SELECT * FROM users WHERE user_id = ? AND password = ?";
    $stmt = $conn->prepare($sql);

    // Bind parameters and execute statement
    $stmt->bind_param("ss", $userid, $pass);
    $stmt->execute();

    // Get result
    $result = $stmt->get_result();

    // Check if the query returned any rows
    if ($result->num_rows > 0) {
        // User exists and password matches
        // Store user ID in session
        $_SESSION['user_id'] = $userid;
        
        // Prepare SQL statement to select scores for the logged-in user
        $sql_scores = "SELECT wins, ties, losses FROM scores WHERE user_id = ?";
        $stmt_scores = $conn->prepare($sql_scores);
        $stmt_scores->bind_param("s", $_SESSION['user_id']);
        $stmt_scores->execute();
        $result_scores = $stmt_scores->get_result();

        // If the user's scores exist, fetch and set session variables
        if ($result_scores->num_rows > 0) {
            $row = $result_scores->fetch_assoc();
            $_SESSION['wins'] = $row['wins'];
            $_SESSION['ties'] = $row['ties'];
            $_SESSION['losses'] = $row['losses'];
        } else {
            // If no scores exist for the user, initialize session variables to 0
            $_SESSION['wins'] = 0;
            $_SESSION['ties'] = 0;
            $_SESSION['losses'] = 0;
        }

        // Close prepared statement and database connection
        $stmt_scores->close();
        $conn->close();

        // Redirect to success page
        header("Location: index.php");
        exit(); // Make sure no other output is sent
    } else {
        // User does not exist or password is incorrect
        header("Location: messages/error.html");
        exit();
    }
    // Close statement
}
?>