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
let consumedMin = 0;
let consumedSec = 0;
let stats = [];
let bigStats = {
  totalQuestions: 0,
  onTime: 0,
  onExtraTime: 0,
  subjects: {},
};

let totalQuestions;
let subjectName;
let minForEachQuestion;
let secForEachQuestion;
let timer;
let extraTimer;
let min;
let sec;
let extraMin = 0;
let extraSec = 0;

function getDataFromParameters() {
  let searchParams = new URLSearchParams(location.search);
  totalQuestions = +searchParams.get("count");
  subjectName = searchParams.get("name");
  minForEachQuestion = +searchParams.get("minute");
  secForEachQuestion = +searchParams.get("second");
}
function getBigStatsFromLocalStorage() {
  let localData = JSON.parse(localStorage.getItem("bigStats"));
  if (localData) {
    bigStats = localData;
  }
}
function setQuestionData() {
  questionNumberElem.textContent = `${questionNumber}/${totalQuestions}`;
  remainingTimeElem.textContent = `${minForEachQuestion}:${
    secForEachQuestion < 10 ? "0" + secForEachQuestion : secForEachQuestion
  }`;
  stopBtn.textContent = "توقف";
  isStopped = false;
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
      consumedSec++;
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
      consumedMin++;
      sec = 59;
    } else {
      sec--;
      consumedSec++;
    }
    remainingTimeElem.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
  }, 1000);
}
function startExtraTimer() {
  extraTimeElem.classList.add("visible_extra_time");
  extraTimer = setInterval(() => {
    if (extraSec === 59) {
      extraSec = 0;
      extraMin++;
    }
    extraSec++;
    extraTimeElem.textContent = `${extraMin}:${
      extraSec < 10 ? "0" + extraSec : extraSec
    }`;
  }, 1000);
}
function resetTimers() {
  extraTimeElem.classList.remove("visible_extra_time");
  consumedMin = 0;
  consumedSec = 0;
  clearInterval(extraTimer);
  clearInterval(timer);
}
function goToNextQuestion() {
  pushQuestionData();
  if (questionNumber === totalQuestions) {
    localStorage.setItem("stats", JSON.stringify(stats));
    location.href = `results.html?name=${encodeURIComponent(
      subjectName
    )}&count=${totalQuestions}&min=${minForEachQuestion}&sec=${secForEachQuestion}`;
  } else {
    questionNumber++;
    resetTimers();
    setQuestionData();
    startTimer();
  }
}
function pushQuestionData() {
  if (!bigStats.subjects[subjectName]) {
    bigStats.subjects[subjectName] = {
      totalQuestions: 0,
      onTime: 0,
      onExtraTime: 0,
    };
  }
  bigStats.totalQuestions++;
  bigStats.subjects[subjectName].totalQuestions++;
  if (extraMin === 0 && extraSec === 0) {
    bigStats.onTime++;
    bigStats.subjects[subjectName].onTime++;
  } else {
    bigStats.onExtraTime++;
    bigStats.subjects[subjectName].onExtraTime++;
  }
  localStorage.setItem("bigStats", JSON.stringify(bigStats));
  let finalConsumedMin =
    consumedSec / 60 >= 1 ? Math.floor(consumedSec / 60) : 0;
  let finalConsumedSec = consumedSec - finalConsumedMin * 60;
  let newStatObj = {
    number: questionNumber,
    timeTaken: {
      min: finalConsumedMin,
      sec: finalConsumedSec,
    },
    extraTimeTaken: {
      min: extraMin ?? 0,
      sec: extraSec ?? 0,
    },
  };
  stats.push(newStatObj);
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
    console.log(stats);
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
getBigStatsFromLocalStorage();
setQuestionData();
