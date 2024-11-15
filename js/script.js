var currentPlayer = 1; // Start with player 1
var player1Score = 0;
var player2Score = 0;
var timerInterval; // Declare timerInterval outside the functions to make it accessible
var animationInProgress = true;
var answered = 20;

function menu() {
    document.querySelector(".jeopardy-board").style.display = "none";
    document.querySelector(".timer-container").style.display = "none";
    // Hide the start button
    document.querySelector(".menu button").style.display = "flex";
    document.getElementById("timer").style.display = "none";
    currentPlayer = 1; 
    player1Score = 0;
    player2Score = 0;
}

function startGame() {
    // Display the game board
    document.querySelector(".jeopardy-board").style.display = "flex";
    document.querySelector(".timer-container").style.display = "flex";
    // Hide the start button
    document.querySelector(".menu button").style.display = "none";
    document.getElementById("timer").style.display = "block";

    document.body.setAttribute("onbeforeunload", "return confirmExit();");
    currentPlayer = 1; 
    player1Score = 0;
    player2Score = 0;

    //  display indicators for current player
    document.getElementById("avatar-1").style.border = "5px solid #00A86B";
    document.getElementById("avatar-1").style.boxShadow = "0 0 10px #00A86B";

    document.getElementById("avatar-2").style.border = "none";
    document.getElementsByClassName("menu")[0].style.display = "none";
    // timer
    // Delay starting the timer by 7 seconds
    setTimeout(function() {
        // Start the timer after 7 seconds
        startTimer(25);
    }, 6000);    
    
    animateQuestionNumbers();

}
function animateQuestionNumbers() {
    var questionIds = [
        "h-200", "h-400", "h-600", "h-800", // History
        "a-200", "a-400", "a-600", "a-800", // Art
        "g-200", "g-400", "g-600", "g-800", // Geography
        "s-200", "s-400", "s-600", "s-800", // Science
        "m-200", "m-400", "m-600", "m-800"  // Math
    ];

    // Shuffle the array of question IDs
    questionIds = shuffle(questionIds);

    var delay = 200; // Initial delay before the animation starts
    questionIds.forEach((id, index) => {
        var questionBox = document.getElementById(id);
        setTimeout(() => {
            // Set the text of the question box to its value
            questionBox.innerText = questionBox.dataset.value;
            // Add animation effect (you can adjust the animation as needed)
            questionBox.style.opacity = 1;
            questionBox.style.transform = "scale(1)";
        }, delay * (index + 1)); // Increase delay for each box
    });
    
    // Animation for category titles
    setTimeout(() => {
        var categoryTitles = document.querySelectorAll(".question.topic");
        categoryTitles.forEach((title, index) => {
            setTimeout(() => {
                // Set the text of the category title to its value
                title.innerText = title.dataset.value;
                // Add animation effect for category titles
                title.style.opacity = 1;
                title.style.transform = "scale(1)";
            }, delay * (index + 1) * 3); // Increase delay for each title
        });
        animationInProgress = false;
        enableButtons(); 
    }, delay * questionIds.length); // Start after all question numbers are shown
}
function enableButtons() {
    document.getElementsByClassName("modal-button-pass")[0].addEventListener("click", switchPlayer);
    document.getElementsByClassName("modal-button-restart")[0].addEventListener("click", refreshPage);
}


// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTimer(duration) {
    var timerDisplay = document.getElementById("timeLeft");
    var timer = duration, minutes, seconds;
    // Clear the interval if it's already running
    clearInterval(timerInterval);

    // Set a new interval for the timer
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            // Timer reaches zero, handle the timeout event here
            alert("Time's up!");
            closeModal();
            switchPlayer();
        }
    }, 1000);
}

function switchPlayer() {
    closeModal();
    // Clear the interval when switching players
    clearInterval(timerInterval);

    currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch between players 1 and 2
    // Reset timer
    startTimer(25);

    // Update the player indicators
    if (currentPlayer === 1) {
        document.getElementById("avatar-1").style.border = "5px solid green";
        document.getElementById("avatar-1").style.boxShadow = "0 0 10px #00A86B";
        
        document.getElementById("avatar-2").style.border = "none";
        document.getElementById("avatar-2").style.boxShadow = "none";

    } else if (currentPlayer === 2) {
        document.getElementById("avatar-2").style.border = "5px solid green";
        document.getElementById("avatar-2").style.boxShadow = "0 0 10px #00A86B";
        
        document.getElementById("avatar-1").style.border = "none";
        document.getElementById("avatar-1").style.boxShadow = "none";
    }
}
function passBtn(){
    answered--;
    checkWinner(answered);
    closeModal();
    // Clear the interval when switching players
    clearInterval(timerInterval);

    currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch between players 1 and 2
    // Reset timer
    startTimer(25);

    // Update the player indicators
    if (currentPlayer === 1) {
        document.getElementById("avatar-1").style.border = "5px solid green";
        document.getElementById("avatar-1").style.boxShadow = "0 0 10px #00A86B";
        
        document.getElementById("avatar-2").style.border = "none";
        document.getElementById("avatar-2").style.boxShadow = "none";

    } else if (currentPlayer === 2) {
        document.getElementById("avatar-2").style.border = "5px solid green";
        document.getElementById("avatar-2").style.boxShadow = "0 0 10px #00A86B";
        
        document.getElementById("avatar-1").style.border = "none";
        document.getElementById("avatar-1").style.boxShadow = "none";
    }
}
// JavaScript code
function refreshPage() {
    location.reload(); // Reload the current page
}

function closeModal() {
    document.getElementById("questionModal").style.display = "none";
}

// Define an array of questions and answers
var jeopardyQuestions = [
    {
        category: "History",
        value: 200,
        question: "What year did World War II end?",
        answers: ["1945", "1939", "1941", "1950"],
        correctAnswer: "1945"
    },
    {
        category: "History",
        value: 400,
        question: "Who was the first president of the United States?",
        answers: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
        correctAnswer: "George Washington"
    },
    {
        category: "History",
        value: 600,
        question: "Who was the first female Prime Minister of the United Kingdom?",
        answers: ["Margaret Thatcher", "Theresa May", "Angela Merkel", "Queen Elizabeth II"],
        correctAnswer: "Margaret Thatcher"
    },
    {
        category: "History",
        value: 800,
        question: "Which ancient civilization built the pyramids?",
        answers: ["Greeks", "Romans", "Egyptians", "Mayans"],
        correctAnswer: "Egyptians"
    },
    // Art
    {
        category: "Art",
        value: 200,
        question: "Who painted the Mona Lisa?",
        answers: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        category: "Art",
        value: 400,
        question: "Which artist is famous for cutting off his own ear?",
        answers: ["Salvador Dali", "Edvard Munch", "Claude Monet", "Vincent van Gogh"],
        correctAnswer: "Vincent van Gogh"
    },
    {
        category: "Art",
        value: 600,
        question: "Who sculpted the Statue of David?",
        answers: ["Donatello", "Michelangelo", "Leonardo da Vinci", "Raphael"],
        correctAnswer: "Michelangelo"
    },
    {
        category: "Art",
        value: 800,
        question: "Which art movement includes works like 'The Persistence of Memory'?",
        answers: ["Cubism", "Surrealism", "Impressionism", "Expressionism"],
        correctAnswer: "Surrealism"
    },
    // Geography
    {
        category: "Geography",
        value: 200,
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Rome", "Paris"],
        correctAnswer: "Paris"
    },
    {
        category: "Geography",
        value: 400,
        question: "Which river is the longest in the world?",
        answers: ["Nile", "Amazon", "Mississippi", "Yangtze"],
        correctAnswer: "Nile"
    },
    {
        category: "Geography",
        value: 600,
        question: "Which country is both in Europe and Asia?",
        answers: ["Russia", "Turkey", "Kazakhstan", "Iran"],
        correctAnswer: "Russia"
    },
    {
        category: "Geography",
        value: 800,
        question: "What is the smallest country in the world?",
        answers: ["Monaco", "Vatican City", "Maldives", "San Marino"],
        correctAnswer: "Vatican City"
    },
    // Science
    {
        category: "Science",
        value: 200,
        question: "What is the chemical symbol for water?",
        answers: ["W", "H", "O", "H2O"],
        correctAnswer: "H2O"
    },
    {
        category: "Science",
        value: 400,
        question: "Which planet is known as the 'Red Planet'?",
        answers: ["Mars", "Venus", "Mercury", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        category: "Science",
        value: 600,
        question: "What is the powerhouse of the cell?",
        answers: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
        correctAnswer: "Mitochondria"
    },
    {
        category: "Science",
        value: 800,
        question: "What is the process by which plants make their food?",
        answers: ["Photosynthesis", "Respiration", "Fermentation", "Transpiration"],
        correctAnswer: "Photosynthesis"
    },
    // Math
    {
        category: "Math",
        value: 200,
        question: "What is the value of Pi (π)?",
        answers: ["3.14", "2.71", "1.62", "4.56"],
        correctAnswer: "3.14"
    },
    {
        category: "Math",
        value: 400,
        question: "What is the Pythagorean theorem used to calculate?",
        answers: ["Area of a circle", "Perimeter of a triangle", "Volume of a sphere", "Length of the hypotenuse of a right triangle"],
        correctAnswer: "Length of the hypotenuse of a right triangle"
    },
    {
        category: "Math",
        value: 600,
        question: "What is the square root of 64?",
        answers: ["6", "7", "8", "9"],
        correctAnswer: "8"
    },
    {
        category: "Math",
        value: 800,
        question: "What is the value of 'x' in the equation 2x + 5 = 15?",
        answers: ["5", "10", "15", "20"],
        correctAnswer: "5"
    }    
];

function showQuestion(element) {

    if (animationInProgress) {
        return; // Don't allow interaction during animation
    }

    var category = element.dataset.category;
    var value = parseInt(element.dataset.value);
    // Find the corresponding question in the array
    var question = jeopardyQuestions.find(q => q.category === category && q.value === value);
    if (question) {
        // Set question text
        document.getElementById("question").innerHTML = question.question;
        // Display answer options
        var answerForm = document.getElementById("answerForm");
        answerForm.innerHTML = ""; // Clear previous options
        question.answers.forEach(function (answer, index) {
            var optionId = "option" + (index + 1);
            answerForm.innerHTML += `
            <div class="options">
                <input type="radio" id="${optionId}" name="answer" value="${answer}">
                <label for="${optionId}">${answer}</label><br>
            </div>`;
            
        });

        answerForm.innerHTML += `<div class="btns"><button class="modal-button" type="button" onclick="submitAnswer()"><i class="fas fa-lightbulb"></i>Buzz</button> <button class="modal-button-close" type="button" onclick="passBtn()"><i class="fas fa-forward"></i> Pass</button></div>`;
        // Open modal
        document.getElementById("questionModal").style.display = "block";

        element.innerText = "";

        /* -----------Remove question after user clicks on it---------*/
        element.style.cursor = "default";
        element.classList.toggle('hover-effect');
        element.removeAttribute("onclick");
        // Add submit button
               
        // answered--;
        // checkWinner(answered);

    }

}
// Add the submitScore function definition to your JavaScript code
function submitScore(score) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    var username = document.getElementById("username");
    var usernameValue = username.value;

    // Define the PHP script URL
    var url = "submit_scores.php";

    // Prepare the data to be sent
    var data = new FormData();
    data.append('score', score);
    data.append('player', usernameValue); // Assuming currentPlayer is set appropriately in your code

    // Open a POST request to the PHP script
    xhr.open('POST', url, true);

    // Define a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Handle the response here (if needed)
            console.log(xhr.responseText);
        }
    };

    // Send the request with the data
    xhr.send(data);
}

function checkWinner(answered) {
    if (answered === 0 ) {
        
        // Compare scores and declare the winner after all questions have been answered
        setTimeout(() => {
            if (player1Score > player2Score) {
                Swal.fire({
                    icon: 'success',
                    title: 'Player 1 Wins!',
                    text: 'Congratulations, Player 1!',
                    confirmButtonText: 'Play Again'
                }).then((result) => {
                    if (result.isConfirmed) {
                        redirectToMainMenu();
                        submitScore(player1Score);
                    }
                });
            } else if (player1Score < player2Score) {
                Swal.fire({
                    icon: 'success',
                    title: 'Player 2 Wins!',
                    text: 'Congratulations, Player 2!',
                    confirmButtonText: 'Play Again'
                }).then((result) => {
                    if (result.isConfirmed) {
                        redirectToMainMenu();
                        submitScore(player1Score);
                         
                    }
                });
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'It\'s a Tie!',
                    text: 'Both players have the same score!',
                    confirmButtonText: 'startGame();'
                }).then((result) => {
                    if (result.isConfirmed) {
                        redirectToMainMenu();
                        submitScore(player1Score);
                    }
                });
            }
        });
    }
}

function redirectToMainMenu() {
    window.location.replace("index.php");
}


function submitAnswer() {

    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select an answer!'
        });
        return;
    }
    var selectedValue = selectedAnswer.value;

    var currentQuestion = document.getElementById("question").innerText;

    var question = jeopardyQuestions.find(q => q.question === currentQuestion);
    if (question) {
        if (selectedValue === question.correctAnswer) {
            if (currentPlayer === 1) {
                player1Score += question.value;
                document.getElementById("player1Score").innerText = player1Score;
            } else if (currentPlayer === 2) {
                player2Score += question.value;
                document.getElementById("player2Score").innerText = player2Score;
            }
            Swal.fire({
                icon: 'success',
                title: 'Correct!',
                text: 'Well done!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Incorrect!',
                text: 'Try again!'
            });
        }
    }
    closeModal();
    // Check if all questions are answered
    answered--;
    checkWinner(answered);

    switchPlayer(); 

}


// Add event listeners to the logo and refresh button
document.getElementById("logo").addEventListener("click", confirmNavigation);
document.getElementsById("login-link").addEventListener("click", confirmNavigation);
document.getElementById("restartButton").addEventListener("click", confirmNavigation);

function confirmExit() {
    return "Are you sure you want to leave? Your progress will be lost.";
}