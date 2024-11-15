<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeopardy</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>
<body id="body-reload">
    <div class="background-image"></div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid topnav">
            <a class="navbar-brand" id="logo" href="index.php">Jeopardy!</a>
            <a class="navbar-brand" href="profile.php">Profile</a>
            <?php
            if (isset($_SESSION['user_id'])) {
                // If logged in, display a logout link
                echo '<div class="login">Welcome, ' . $_SESSION['user_id'] . ' | <a href="logout.php">Logout</a></div>';
            } else {
                // If not logged in, display the login form
                echo '
                <div class="login">
                    <a id="login-link" href="login.html">Login</a>
                </div>';
            }
            ?>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            </div>
        </div>
    </nav>

    <div class="bg"></div>
    
    <div class="container">
        <div class="score" style="margin-right:10px;">
            <div id="player1Indicator" class="player-indicator active"></div>
            <div class="avatar"><img src="Images/avatar1.jpeg" id="avatar-1"></div>
            <div class="score-items">
                <div class="player-title" id="username"><?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'Player 1'; ?></div>
            </div>
            <div class="score-value">Score: <span id="player1Score">0</span></div>
        </div>
        <!-- Menu -->
        <div class="menu">
            <button class="start-button" onclick="startGame()">Start Game</button>
        </div>

        <div class="jeopardy-board">
            <div class="column">
                <div class="question topic" data-category="History" id="history" data-value="history"></div>
                <div class="question design" data-category="History" data-value="200" onclick="showQuestion(this)" id="h-200"></div>
                <div class="question design" data-category="History" data-value="400" onclick="showQuestion(this)" id="h-400"></div>
                <div class="question design" data-category="History" data-value="600" onclick="showQuestion(this)" id="h-600"></div>
                <div class="question design" data-category="History" data-value="800" onclick="showQuestion(this)" id="h-800"></div>
            </div>
            <div class="column">
                <div class="question topic" id="art" data-value="art"></div>
                <div class="question design" data-category="Art" data-value="200" onclick="showQuestion(this)" id="a-200"></div>
                <div class="question design" data-category="Art" data-value="400" onclick="showQuestion(this)" id="a-400"></div>
                <div class="question design" data-category="Art" data-value="600" onclick="showQuestion(this)" id="a-600"></div>
                <div class="question design" data-category="Art" data-value="800" onclick="showQuestion(this)" id="a-800"></div>
            </div>
            <div class="column">
                <div class="question topic" id="geography" data-value="geography"></div>
                <div class="question design" data-category="Geography" data-value="200" onclick="showQuestion(this)" id="g-200"></div>
                <div class="question design" data-category="Geography" data-value="400" onclick="showQuestion(this)" id="g-400"></div>
                <div class="question design" data-category="Geography" data-value="600" onclick="showQuestion(this)" id="g-600"></div>
                <div class="question design" data-category="Geography" data-value="800" onclick="showQuestion(this)" id="g-800"></div>
            </div>
            <div class="column">
                <div class="question topic" id="science" data-value="science"></div>
                <div class="question design" data-category="Science" data-value="200" onclick="showQuestion(this)" id="s-200"></div>
                <div class="question design" data-category="Science" data-value="400" onclick="showQuestion(this)" id="s-400"></div>
                <div class="question design" data-category="Science" data-value="600" onclick="showQuestion(this)" id="s-600"></div>
                <div class="question design" data-category="Science" data-value="800" onclick="showQuestion(this)" id="s-800"></div>
            </div>
            <div class="column">
                <div class="question topic" id="math" data-value="math"></div>
                <div class="question design" data-category="Math" data-value="200" onclick="showQuestion(this)" id="m-200"></div>
                <div class="question design" data-category="Math" data-value="400" onclick="showQuestion(this)" id="m-400"></div>
                <div class="question design" data-category="Math" data-value="600" onclick="showQuestion(this)" id="m-600"></div>
                <div class="question design" data-category="Math" data-value="800" onclick="showQuestion(this)" id="m-800"></div>
            </div>
        </div>


        <div class="score" style="margin-left:10px;">
            <div id="player2Indicator" class="player-indicator"></div>
            <div class="avatar"><img src="Images/avatar2.jpg" id="avatar-2"></div>
            <div class="score-items">
                <div class="player-title">Player 2</div>
            </div>
            <div class="score-value">Score: <span id="player2Score">0</span></div>

        </div>
    </div>
    <div class="timer-container">
        <button class="modal-button-restart" type="button"><i class="fas fa-sync-alt"></i> Restart</button>
        <div id="timer" class="timer">
            <span id="timeLeft"></span>
        </div>
        <button class="modal-button-pass" type="button"><i class="fas fa-forward"></i> Pass</button>
    </div>
    <div id="questionModal" class="modal">
        <div class="modal-contents">
            <h2 id="question"></h2>
            <form id="answerForm">
                <input type="radio" id="option1" name="answer" value="option1">
                <label for="option1">Option 1</label><br>
                <input type="radio" id="option2" name="answer" value="option2">
                <label for="option2">Option 2</label><br>
                <input type="radio" id="option3" name="answer" value="option3">
                <label for="option3">Option 3</label><br>
                <input type="radio" id="option4" name="answer" value="option4">
                <label for="option4">Option 4</label><br>
                <button class="modal-button" type="button" onclick="submitAnswer()"></button>
                <button class="modal-button-close" type="button" onclick="closeModal()"></button>
            </form>
        </div>
    </div>
    <script>

    </script>
    <script src="js/script.js"></script>
    <footer class="footer">
        <div class="container">
            <p style="color:white;">&copy; 2024 Elizabeth Soto. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
