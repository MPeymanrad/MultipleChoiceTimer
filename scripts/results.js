const $ = document;

function setGeneralData() {
  const subjectNameH2 = $.querySelector(".name");
  const questionTimeH2 = $.querySelector(".question_time");
  const questionCountH2 = $.querySelector(".question_number");

  const urlParameters = new URLSearchParams(location.search);
  const subjectName = decodeURIComponent(urlParameters.get("name"));
  const questionsCount = urlParameters.get("count");
  const timeForEachQuestion = `${urlParameters.get("min")}:${urlParameters.get(
    "sec"
  )}`;
  subjectNameH2.textContent = subjectName;
  questionTimeH2.textContent = `${timeForEachQuestion}دقیقه`;
  questionCountH2.textContent = `${questionsCount}سوال`;
}
function generateDataCards() {
  const data = JSON.parse(localStorage.getItem("stats"));
  const resultsContainer = $.querySelector(".results");
  data.forEach((stat) => {
    resultsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="test_result d-flex flex-column">
        <label>
      شماره سوال:
      <span>${stat.number}</span>
        </label>
          <label>
 زمان استفاده شده:
        <span>${
          stat.timeTaken.sec < 10
            ? "0" + stat.timeTaken.sec
            : stat.timeTaken.sec
        } : ${stat.timeTaken.min}</span>
          </label>
      <label>
      زمان استفاده شده اضافه:
      <span>${
        stat.extraTimeTaken.sec < 10
          ? "0" + stat.extraTimeTaken.sec
          : stat.extraTimeTaken.sec
      } : ${stat.extraTimeTaken.min} </span>
      </label>
    </div>`
    );
  });
}

setGeneralData();
generateDataCards();
