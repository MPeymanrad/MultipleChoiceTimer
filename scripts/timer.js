const $ = document;
const startBtn = $.querySelector(".start_btn");
const stopBtn = $.querySelector(".stop_btn");
const exitBtn = $.querySelector(".exit_btn");
const questionNumberElem = $.querySelector(".question_num");
const remainingTimeElem = $.querySelector(".time_remaining");
const extraTimeElem = $.querySelector(".extra_time");

let isStarted = false;
let isStopped = false;
let questionNumber = 1;

let totalQuestions;
let subjectName;
let minForEachQuestion;
let secForEachQuestion;
let timer;
let extraTimer;
let min;
let sec;

function getDataFromParameters() {
  let searchParams = new URLSearchParams(location.search);
  totalQuestions = +searchParams.get("count");
  subjectName = searchParams.get("name");
  minForEachQuestion = +searchParams.get("minute");
  secForEachQuestion = +searchParams.get("second");
}

function setQuestionData() {
  questionNumberElem.textContent = `${questionNumber}/${totalQuestions}`;
  remainingTimeElem.textContent = `${minForEachQuestion}:${
    secForEachQuestion < 10 ? "0" + secForEachQuestion : secForEachQuestion
  }`;
}

function startTimer() {
  startBtn.textContent = "سوال بعدی";
  sec = secForEachQuestion;
  min = minForEachQuestion;
  timer = setInterval(() => {
    if (min === 0 && sec === 0) {
      clearInterval(timer);
      const audioElem = $.querySelector("audio");
      audioElem.play();
      startExtraTimer();
    } else if (sec === 0) {
      min--;
      sec = 59;
    } else {
      sec--;
    }
    remainingTimeElem.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
  }, 1000);
}
function continueTimer() {
  stopBtn.textContent = "توقف";
  timer = setInterval(() => {
    if (min === 0 && sec === 0) {
      clearInterval(timer);
      const audioElem = $.querySelector("audio");
      audioElem.play();
      startExtraTimer();
    } else if (sec === 0) {
      min--;
      sec = 59;
    } else {
      sec--;
    }
    remainingTimeElem.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
  }, 1000);
}
function startExtraTimer() {
  extraTimeElem.classList.add("visible_extra_time");
  let sec = 0;
  let min = 0;
  extraTimer = setInterval(() => {
    if (sec === 59) {
      sec = 0;
      min++;
    }
    sec++;
    extraTimeElem.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
  }, 1000);
}
function resetTimers() {
  extraTimeElem.classList.remove("visible_extra_time");
  clearInterval(extraTimer);
  clearInterval(timer);
}
function goToNextQuestion() {
  if (questionNumber === totalQuestions) {
    location.href = "results.html";
  } else {
    questionNumber++;
    resetTimers();
    setQuestionData();
    startTimer();
  }
}
function stopTimer() {
  stopBtn.textContent = "ادامه";
  clearInterval(timer);
  clearInterval(extraTimer);
}
startBtn.addEventListener("click", () => {
  if (!isStarted) {
    startTimer();
    isStarted = true;
  } else {
    goToNextQuestion();
  }
});
exitBtn.addEventListener("click", () => {
  if (confirm("می خواهید این جلسه تست را ترک کنید")) {
    location.href = "index.html";
  }
});
stopBtn.addEventListener("click", () => {
  if (!isStopped) {
    stopTimer();
    isStopped = true;
  } else {
    continueTimer();
    isStopped = false;
  }
});

getDataFromParameters();
setQuestionData();
