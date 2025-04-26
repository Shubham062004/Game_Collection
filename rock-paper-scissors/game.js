const rock = document.getElementById("rock-logo")
const paper = document.getElementById("paper-logo")
const scissors = document.getElementById("scissors-logo")
const you_rock = document.getElementById("you-rock-img")
const you_paper = document.getElementById("you-paper-img")
const you_scissors = document.getElementById("you-scissors-img")
const comp_rock = document.getElementById("comp-rock-img")
const comp_paper = document.getElementById("comp-paper-img")
const comp_scissors = document.getElementById("comp-scissors-img")
const img_holder = document.getElementById("youa")
const score = document.getElementById("score")
const overlay = document.getElementById("over")
const reset = document.getElementById("reset-game")
const player = document.getElementById("player")
const youBox = document.querySelector(".you")
const compBox = document.querySelector("#comp-box").parentElement

// Sound elements
const selectSound = document.getElementById("select-sound")
const winSound = document.getElementById("win-sound")
const loseSound = document.getElementById("lose-sound")
const gameOverSound = document.getElementById("game-over-sound")
const tieSound = document.getElementById("tie-sound")

let score_you = 0
let score_comp = 0
let isPlaying = false

// Function to play sounds
function playSound(sound) {
  sound.currentTime = 0
  sound.play()
}

// Function to show round result
function showRoundResult(result) {
  // Remove any existing result element
  const existingResult = document.querySelector(".round-result")
  if (existingResult) {
    existingResult.remove()
  }

  // Create and show new result
  const resultElement = document.createElement("div")
  resultElement.className = "round-result"
  resultElement.textContent = result
  document.body.appendChild(resultElement)

  // Remove after animation completes
  setTimeout(() => {
    resultElement.remove()
  }, 1500)
}

// Function to handle game logic
function playGame(playerChoice) {
  if (isPlaying) return
  isPlaying = true

  // Play select sound
  playSound(selectSound)

  // Reset previous styles
  youBox.classList.remove("winner", "loser")
  compBox.classList.remove("winner", "loser")

  // Hide all hands first
  you_paper.style.display = "none"
  you_rock.style.display = "none"
  you_scissors.style.display = "none"
  comp_rock.style.display = "none"
  comp_scissors.style.display = "none"
  comp_paper.style.display = "none"

  // Show player's choice
  if (playerChoice === "rock") {
    you_rock.style.display = "inline"
  } else if (playerChoice === "paper") {
    you_paper.style.display = "inline"
  } else {
    you_scissors.style.display = "inline"
  }

  // Add shake animation to both boxes
  youBox.classList.add("shake")
  compBox.classList.add("shake")

  // Delay computer's choice to create suspense
  setTimeout(() => {
    // Remove shake animation
    youBox.classList.remove("shake")
    compBox.classList.remove("shake")

    // Computer's random choice
    const choices = ["rock", "paper", "scissors"]
    const computerChoice = choices[Math.floor(Math.random() * 3)]

    // Show computer's choice
    if (computerChoice === "rock") {
      comp_rock.style.display = "inline"
    } else if (computerChoice === "paper") {
      comp_paper.style.display = "inline"
    } else {
      comp_scissors.style.display = "inline"
    }

    // Determine winner
    let roundResult
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      // Player wins
      score_you++
      youBox.classList.add("winner")
      compBox.classList.add("loser")
      roundResult = "You Win!"
      playSound(winSound)
    } else if (
      (computerChoice === "rock" && playerChoice === "scissors") ||
      (computerChoice === "paper" && playerChoice === "rock") ||
      (computerChoice === "scissors" && playerChoice === "paper")
    ) {
      // Computer wins
      score_comp++
      compBox.classList.add("winner")
      youBox.classList.add("loser")
      roundResult = "Computer Wins!"
      playSound(loseSound)
    } else {
      // Tie
      roundResult = "It's a Tie!"
      playSound(tieSound)
    }

    // Update score
    score.innerHTML = score_you + " - " + score_comp

    // Show round result
    showRoundResult(roundResult)

    // Check if game is over
    if (score_you === 5 || score_comp === 5) {
      setTimeout(() => {
        if (score_you === 5) {
          player.innerHTML = "You"
        } else {
          player.innerHTML = "Comp"
        }
        overlay.classList.add("active")
        rock.style.display = "none"
        paper.style.display = "none"
        scissors.style.display = "none"
        playSound(gameOverSound)
      }, 1000)
    } else {
      // Allow next play
      setTimeout(() => {
        isPlaying = false
      }, 1000)
    }
  }, 800) // Delay to show the shake animation
}

// Event listeners for player choices
rock.onclick = () => {
  playGame("rock")
}

paper.onclick = () => {
  playGame("paper")
}

scissors.onclick = () => {
  playGame("scissors")
}

// Reset game
reset.onclick = () => {
  window.location.reload()
}

// Add hover effects for choice buttons
;[rock, paper, scissors].forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)"
  })

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)"
  })
})
