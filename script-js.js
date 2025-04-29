// Constants
const SCHOOL_PASSWORD = "cheeseeggandbacon6"; // Change this to your desired password
const STARTING_BALANCE = 1000;

// Global variables
let currentUser = {
    username: "",
    balance: STARTING_BALANCE
};

let players = [
    { username: "Alice", balance: 1250 },
    { username: "Bob", balance: 850 },
    { username: "Charlie", balance: 1500 }
];

// DOM Elements
const loginContainer = document.getElementById("login-container");
const lobbyContainer = document.getElementById("lobby-container");
const diceContainer = document.getElementById("dice-container");
const rouletteContainer = document.getElementById("roulette-container");

// Login functionality
document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    
    if (!username) {
        document.getElementById("login-error").textContent = "Please enter a username";
        return;
    }
    
    if (password !== SCHOOL_PASSWORD) {
        document.getElementById("login-error").textContent = "Incorrect password";
        return;
    }
    
    // Check if username already exists
    const existingPlayer = players.find(player => player.username === username);
    if (existingPlayer) {
        currentUser = existingPlayer;
    } else {
        currentUser = {
            username: username,
            balance: STARTING_BALANCE
        };
        players.push(currentUser);
    }
    
    // Show lobby
    loginContainer.classList.add("hidden");
    lobbyContainer.classList.remove("hidden");
    
    // Update UI
    updateUserInfo();
    updatePlayersList();
    
    // Save to local storage
    saveGameState();
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
    lobbyContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login-error").textContent = "";
});

// Back buttons
document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        diceContainer.classList.add("hidden");
        rouletteContainer.classList.add("hidden");
        lobbyContainer.classList.remove("hidden");
        updateUserInfo();
        updatePlayersList();
    });
});

// Game selection
document.querySelectorAll(".play-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const game = btn.getAttribute("data-game");
        lobbyContainer.classList.add("hidden");
        
        if (game === "dice") {
            diceContainer.classList.remove("hidden");
            document.getElementById("dice-user-name").textContent = currentUser.username;
            document.getElementById("dice-user-balance").textContent = `$${currentUser.balance}`;
            updateDiceOpponents();
        } else if (game === "roulette") {
            rouletteContainer.classList.remove("hidden");
            document.getElementById("roulette-user-name").textContent = currentUser.username;
            document.getElementById("roulette-user-balance").textContent = `$${currentUser.balance}`;
            updateRouletteOpponents();
        }
    });
});

// Helper functions
function updateUserInfo() {
    document.getElementById("user-name").textContent = currentUser.username;
    document.getElementById("user-balance").textContent = `${currentUser.balance}`;
}

function updatePlayersList() {
    const playersList = document.getElementById("players");
    playersList.innerHTML = "";
    
    players.forEach(player => {
        if (player.username !== currentUser.username) {
            const li = document.createElement("li");
            li.textContent = `${player.username} - ${player.balance}`;
            playersList.appendChild(li);
        }
    });
}

// Additional helper for simulating other players' actions
function simulateOtherPlayersActions() {
    // For each game, randomly adjust other players' balances
    players.forEach(player => {
        if (player.username !== currentUser.username) {
            // Random balance adjustment between -200 and +300
            const adjustment = Math.floor(Math.random() * 500) - 200;
            player.balance += adjustment;
            
            // Make sure balance stays positive
            if (player.balance < 0) {
                player.balance = 100;
            }
        }
    });
    
    // Update player lists if we're in the lobby
    if (!lobbyContainer.classList.contains("hidden")) {
        updatePlayersList();
    }
}

function updateDiceOpponents() {
    const opponentsList = document.getElementById("dice-opponents");
    opponentsList.innerHTML = "";
    
    // Add 1-3 random opponents
    const numberOfOpponents = Math.floor(Math.random() * 3) + 1;
    const availablePlayers = players.filter(player => player.username !== currentUser.username);
    
    for (let i = 0; i < Math.min(numberOfOpponents, availablePlayers.length); i++) {
        const randomIndex = Math.floor(Math.random() * availablePlayers.length);
        const opponent = availablePlayers.splice(randomIndex, 1)[0];
        
        const li = document.createElement("li");
        li.textContent = `${opponent.username} - $${opponent.balance}`;
        opponentsList.appendChild(li);
    }
}

function updateRouletteOpponents() {
    const opponentsList = document.getElementById("roulette-opponents");
    opponentsList.innerHTML = "";
    
    // Add 1-3 random opponents
    const numberOfOpponents = Math.floor(Math.random() * 3) + 1;
    const availablePlayers = players.filter(player => player.username !== currentUser.username);
    
    for (let i = 0; i < Math.min(numberOfOpponents, availablePlayers.length); i++) {
        const randomIndex = Math.floor(Math.random() * availablePlayers.length);
        const opponent = availablePlayers.splice(randomIndex, 1)[0];
        
        const li = document.createElement("li");
        li.textContent = `${opponent.username} - $${opponent.balance}`;
        opponentsList.appendChild(li);
    }
}

function saveGameState() {
    localStorage.setItem("virtualCasinoPlayers", JSON.stringify(players));
    localStorage.setItem("virtualCasinoCurrentUser", JSON.stringify(currentUser));
}

function loadGameState() {
    const savedPlayers = localStorage.getItem("virtualCasinoPlayers");
    const savedCurrentUser = localStorage.getItem("virtualCasinoCurrentUser");
    
    if (savedPlayers) {
        players = JSON.parse(savedPlayers);
    }
    
    if (savedCurrentUser) {
        currentUser = JSON.parse(savedCurrentUser);
    }
}

// Initialize game state when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadGameState();
    
    // Set up periodic simulation of other players
    setInterval(() => {
        simulateOtherPlayersActions();
        saveGameState();
    }, 60000); // Every minute
});

// Dice Game Functionality
document.getElementById("place-dice-bet-btn").addEventListener("click", () => {
    const betAmount = parseInt(document.getElementById("dice-bet-amount").value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount");
        return;
    }
    
    if (betAmount > currentUser.balance) {
        alert("You don't have enough balance for this bet");
        return;
    }
    
    document.getElementById("place-dice-bet-btn").disabled = true;
    document.getElementById("roll-dice-btn").disabled = false;
});

document.getElementById("roll-dice-btn").addEventListener("click", () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    
    document.getElementById("dice1").textContent = dice1;
    document.getElementById("dice2").textContent = dice2;
    document.getElementById("dice-total").textContent = `Total: ${total}`;
    
    const betType = document.querySelector('input[name="bet-type"]:checked').value;
    const betAmount = parseInt(document.getElementById("dice-bet-amount").value);
    
    let won = false;
    let winnings = 0;
    
    if (betType === "over7" && total > 7) {
        won = true;
        winnings = betAmount;
    } else if (betType === "under7" && total < 7) {
        won = true;
        winnings = betAmount;
    } else if (betType === "exactly7" && total === 7) {
        won = true;
        winnings = betAmount * 4; // Higher payout for exact match
    }
    
    const resultElement = document.getElementById("dice-result");
    const resultTextElement = document.getElementById("dice-result-text");
    
    if (won) {
        currentUser.balance += winnings;
        resultTextElement.textContent = `You won $${winnings}! Your new balance is $${currentUser.balance}`;
        resultTextElement.style.color = "#2ecc71";
    } else {
        currentUser.balance -= betAmount;
        resultTextElement.textContent = `You lost $${betAmount}. Your new balance is $${currentUser.balance}`;
        resultTextElement.style.color = "#e74c3c";
    }
    
    resultElement.classList.remove("hidden");
    document.getElementById("roll-dice-btn").disabled = true;
    document.getElementById("place-dice-bet-btn").disabled = false;
    
    // Update player in the players array
    const playerIndex = players.findIndex(player => player.username === currentUser.username);
    if (playerIndex !== -1) {
        players[playerIndex] = currentUser;
    }
    
    // Update UI
    document.getElementById("dice-user-balance").textContent = `$${currentUser.balance}`;
    
    // Save game state
    saveGameState();
    
    // Reset after 3 seconds
    setTimeout(() => {
        resultElement.classList.add("hidden");
    }, 3000);
});

// Roulette Game Functionality
document.getElementById("place-roulette-bet-btn").addEventListener("click", () => {
    const betAmount = parseInt(document.getElementById("roulette-bet-amount").value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount");
        return;
    }
    
    if (betAmount > currentUser.balance) {
        alert("You don't have enough balance for this bet");
        return;
    }
    
    document.getElementById("place-roulette-bet-btn").disabled = true;
    document.getElementById("spin-wheel-btn").disabled = false;
});

document.getElementById("spin-wheel-btn").addEventListener("click", () => {
    const wheel = document.getElementById("wheel");
    const ball = document.getElementById("ball");
    const resultNumber = document.getElementById("result-number");
    
    // Disable spin button
    document.getElementById("spin-wheel-btn").disabled = true;
    
    // Random number between 0 and 36
    const result = Math.floor(Math.random() * 37);
    
    // Random number of rotations (3-6 complete rotations plus the random angle)
    const rotations = 3 + Math.random() * 3;
    const degrees = rotations * 360 + (result * 9.73); // 9.73 degrees per number (360/37)
    
    // Animate wheel
    wheel.style.transform = `rotate(${degrees}deg)`;
    
    // Wait for animation to finish
    setTimeout(() => {
        resultNumber.textContent = result;
        
        // Determine color
        let resultColor;
        if (result === 0) {
            resultColor = "green";
        } else if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(result)) {
            resultColor = "red";
        } else {
            resultColor = "black";
        }
        
        // Check win condition
        const betType = document.querySelector('input[name="roulette-bet-type"]:checked').value;
        const betAmount = parseInt(document.getElementById("roulette-bet-amount").value);
        
        let won = false;
        let winnings = 0;
        
        if (betType === resultColor) {
            won = true;
            if (resultColor === "green") {
                winnings = betAmount * 35; // Higher payout for green (0)
            } else {
                winnings = betAmount; // Even payout for red/black
            }
        }
        
        const resultElement = document.getElementById("roulette-result");
        const resultTextElement = document.getElementById("roulette-result-text");
        
        if (won) {
            currentUser.balance += winnings;
            resultTextElement.textContent = `The ball landed on ${result} (${resultColor}). You won ${winnings}! Your new balance is ${currentUser.balance}`;
            resultTextElement.style.color = "#2ecc71";
        } else {
            currentUser.balance -= betAmount;
            resultTextElement.textContent = `The ball landed on ${result} (${resultColor}). You lost ${betAmount}. Your new balance is ${currentUser.balance}`;
            resultTextElement.style.color = "#e74c3c";
        }
        
        resultElement.classList.remove("hidden");
        document.getElementById("place-roulette-bet-btn").disabled = false;
        
        // Update player in the players array
        const playerIndex = players.findIndex(player => player.username === currentUser.username);
        if (playerIndex !== -1) {
            players[playerIndex] = currentUser;
        }
        
        // Update UI
        document.getElementById("roulette-user-balance").textContent = `${currentUser.balance}`;
        
        // Save game state
        saveGameState();
        
        // Reset after 5 seconds
        setTimeout(() => {
            resultElement.classList.add("hidden");
            wheel.style.transform = `rotate(0deg)`;
            resultNumber.textContent = "0";
        }, 5000);
    }, 4000); // 4 seconds for the wheel animation
});
