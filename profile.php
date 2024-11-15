<?php
// Start session to access user information
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // Redirect to login page if not logged in
    header("Location: login.html");
    exit();
}

// Connect to the database
$servername = "";
$username = "";
$password = "";
$database = "";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve user information from the database
$user_id = $_SESSION['user_id'];
$sql_user = "SELECT first_name, last_name FROM users WHERE user_id = ?";
$stmt_user = $conn->prepare($sql_user);
$stmt_user->bind_param("s", $user_id);
$stmt_user->execute();
$stmt_user->store_result();
$stmt_user->bind_result($first_name, $last_name);
$stmt_user->fetch();
$stmt_user->close();

// Retrieve scores information from the database
$sql_scores = "SELECT score, game_date FROM scores WHERE user_id = ? ORDER BY game_date DESC";
$stmt_scores = $conn->prepare($sql_scores);
$stmt_scores->bind_param("s", $user_id);
$stmt_scores->execute();
$stmt_scores->store_result();
$stmt_scores->bind_result($score, $game_date);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid topnav">
            <a class="navbar-brand" href="index.php" id="logo">Jeopardy</a>
            <div class="login ms-auto">
                <a href="logout.php">Logout</a>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
            </div>
        </div>
    </nav>
    <div class="container">
    
        <div class="menu">
            <div class="text-center">
            <h2>Welcome, <?php echo $first_name . " " . $last_name; ?></h2>
            <h3>Your Game Scores:</h3>
        </div>
        </div>
        <div class="container mt-5">
            <!-- Display scores -->
            <table class="table mx-auto">
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>Date Played</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    while ($stmt_scores->fetch()) {
                        echo "<tr>";
                        echo "<td>$score</td>";
                        echo "<td>$game_date</td>";
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    <footer class="footer">
        <div class="container">
            <p style="color:black;">&copy; 2024 Elizabeth Soto. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
