const $ = document;
const startBtn = $.getElementById("start_btn");
const statsBtn = $.getElementById("stats_btn");
const aboutBtn = $.getElementById("about_btn");
const goToTimerPageBtn = $.getElementById("submit_btn");

function showModal() {
  const startModal = $.querySelector(".start_modal");
  const overlay = $.querySelector(".overlay");
  const modalCloseBtn = $.querySelector(".close_span");
  startModal.classList.add("visible_modal");
  overlay.classList.add("visible_overlay");

  modalCloseBtn.addEventListener("click", hideModal);
  overlay.addEventListener("click", hideModal);
}
function hideModal() {
  const startModal = $.querySelector(".start_modal");
  const overlay = $.querySelector(".overlay");
  startModal.classList.remove("visible_modal");
  overlay.classList.remove("visible_overlay");
}
function goToTimerPage() {
  const subjectNameInput = $.getElementById("name_input");
  const questionCountInput = $.getElementById("count_input");
  const minuteInput = $.getElementById("minute_input");
  const secondInput = $.getElementById("second_input");
  if (!subjectNameInput.value) {
    alert("نام درس رو وارد نکردی");
  } else {
    if (!questionCountInput.value) {
      alert("تعداد سوالات رو وارد نکردی");
    } else {
      if (!minuteInput.value) {
        alert("دقیقه برای هر سوال رو وارد نکردی");
      } else {
        if (!secondInput.value) {
          alert("ثانیه برای هر سوال رو وارد نکردی");
        } else {
          let timerUrl = new URL(
            "timer.html",
            "file:///C:/Users/ASRAR_COMPUTER/Desktop/برنامه%20نویسی.مدرسه.کانون%20زبان/programmig%20and%20P_Videos/Projects/Web/Test%20Helper%20App/"
          );
          timerUrl.searchParams.append("name", subjectNameInput.value.trim());
          timerUrl.searchParams.append("count", questionCountInput.value);
          timerUrl.searchParams.append("minute", minuteInput.value);
          timerUrl.searchParams.append("second", secondInput.value);
          location.href = timerUrl.href;
          clearInputs();
        }
      }
    }
  }
}
function clearInputs() {
  const subjectNameInput = $.getElementById("name_input");
  const questionCountInput = $.getElementById("count_input");
  const minuteInput = $.getElementById("minute_input");
  const secondInput = $.getElementById("second_input");
  subjectNameInput.value = "";
  questionCountInput.value = "";
  minuteInput.value = "1";
  secondInput.value = "0";
}
startBtn.addEventListener("click", showModal);
statsBtn.addEventListener("click",() => location.href = "stats.html")
aboutBtn.addEventListener("click",() => location.href = "about.html")
goToTimerPageBtn.addEventListener("click", goToTimerPage);
