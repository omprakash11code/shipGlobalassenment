const words = [
    { word: "exchange", hint: "The act of trading" },
    { word: "computer", hint: "An electronic device" },
    { word: "javascript", hint: "A programming language" },
    { word: "developer", hint: "A person who creates software" },
    { word: "keyboard", hint: "An input device" },
];

let currentWord = "";
let scrambledWord = "";
let currentHint = "";
let timeLeft = 15;
let timer;

const scrambledWordElement = document.querySelector(".scrambled-word");
const hintElement = document.querySelector(".hint");
const timerElement = document.querySelector(".timer");
const inputField = document.querySelector(".input-field");
const refreshButton = document.querySelector(".refresh-btn");
const checkButton = document.querySelector(".check-btn");

function scrambleWord(word) {
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join(' ');
    return scrambled;
}

function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word;
    scrambledWord = scrambleWord(currentWord);
    currentHint = words[randomIndex].hint;

    scrambledWordElement.textContent = scrambledWord;
    hintElement.textContent = `Hint: ${currentHint}`;
    inputField.value = "";
    inputField.focus();
    timeLeft = 15;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up! The correct word was: " + currentWord);
            startGame();
        }
    }, 1000);
}

refreshButton.addEventListener("click", startGame);

checkButton.addEventListener("click", () => {
    const userGuess = inputField.value.toLowerCase();
    if (userGuess === currentWord) {
        alert("Correct! Well done!");
        startGame();
    } else {
        alert("Incorrect! Try again.");
        inputField.value = "";
        inputField.focus();
    }
});

startGame();
