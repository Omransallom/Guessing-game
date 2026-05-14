//Sitting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By Omran `;

// Setting Game Opation

let numperOfTries = 6;
let numperOfletters = 6;
let currentTry = 1;
let numperOfHints = 2;

//mange words
let wordToGuess = "";
const Word = [
  "Omran",
  "Leen",
  "Shahba",
  "Zed",
  "Atdal",
  "Ousama",
  "Gaith",
  "Minyar",
];
wordToGuess = Word[Math.floor(Math.random() * Word.length)].toLowerCase();
let messagArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numperOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numperOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("Disabled-Inputs");
    for (let j = 1; j <= numperOfletters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  //focus on first input in first try element
  inputsContainer.children[0].children[1].focus();

  // Disable all inputs except first one
  const inputsInDisabledDiv = document.querySelectorAll(
    ".Disabled-Inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
console.log(wordToGuess);
function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numperOfletters; i++) {
    const inputFiled = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputFiled.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inputFiled.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputFiled.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputFiled.classList.add("no");
      successGuess = false;
    }
  }
  //check if user win or lose
  if (successGuess) {
    messagArea.innerHTML = `You Win And The Word Is <span>${wordToGuess}</span>`;
    //Disable all inputs
    let allTraies = document.querySelectorAll(".inputs > div");
    allTraies.forEach((trydiv) => trydiv.classList.add("Disabled-Inputs"));
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("Disabled-Inputs");
    let currenInput = document.querySelectorAll(`.try-${currentTry} input`);
    currenInput.forEach((input) => (input.disabled = true));

    currentTry++;
    let nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInput.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("Disabled-Inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messagArea.innerHTML = `You Lose And The Word Is <span>${wordToGuess}</span>`;
    }
  }
}
function getHint() {
  if (numperOfHints > 0) {
    numperOfHints--;
    document.querySelector(".hint span").innerHTML = numperOfHints;
  }
  if (numperOfHints === 0) {
    getHintButton.disabled = true;
  }
  const enabledInput = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInput).filter(
    (input) => input.value === ""
  );
  console.log(emptyEnabledInputs);

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInput).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    event.preventDefault();
    const input = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(input).indexOf(document.activeElement);
    console.log(input.length);
    const currentInput = input[currentIndex];
    const prevInput = input[currentIndex - 1];
    currentInput.value = "";
    if (currentIndex > 0) {
      prevInput.focus();
    }
  }
}
document.addEventListener("keydown", handleBackspace);
window.onload = function () {
  generateInput();
};
