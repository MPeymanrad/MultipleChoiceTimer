const $ = document;
const mainButton = $.querySelector(".main_button");

let isStarted = false;
let questionNumber = 1;

function startTimer() {
  mainButton.textContent = "سوال بعدی";
}

function goToNextQuestion() {}

mainButton.addEventListener("click", () => {
  if (!isStarted) {
    startTimer();
  } else {
    goToNextQuestion();
  }
});
