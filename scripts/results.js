const $ = document;
const exportBtn = $.querySelector(".export_btn");
let subjectName;

function setGeneralData() {
  const subjectNameH2 = $.querySelector(".name");
  const questionTimeH2 = $.querySelector(".question_time");
  const questionCountH2 = $.querySelector(".question_number");

  const urlParameters = new URLSearchParams(location.search);
  const questionsCount = urlParameters.get("count");
  subjectName = decodeURIComponent(urlParameters.get("name"));
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
          حل شده: 
          <span>${stat.isSolved ? "بله" : "خیر"}</span>
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
function exportExcel() {
  let arrayToExport = [
    ["شماره سوال", "حل شده", "زمان استفاده شده", "زمان اضافه استفاده شده"],
  ];
  const data = JSON.parse(localStorage.getItem("stats"));
  let timeTaken;
  let extraTimeTaken;
  data.forEach((questionData) => {
    timeTaken = `${questionData.timeTaken.min} : ${
      questionData.timeTaken.sec < 10
        ? "0" + questionData.timeTaken.sec
        : questionData.timeTaken.sec
    }`;
    extraTimeTaken = `${questionData.extraTimeTaken.min} : ${
      questionData.extraTimeTaken.sec < 10
        ? "0" + questionData.extraTimeTaken.sec
        : questionData.extraTimeTaken.sec
    }`;
    arrayToExport.push([
      questionData.number,
      questionData.isSolved ? "بله" : "خیر",
      timeTaken,
      extraTimeTaken,
    ]);
  });
  let workbook = XLSX.utils.book_new(),
    worksheet = XLSX.utils.aoa_to_sheet(arrayToExport);
  workbook.SheetNames.push("Sheet1");
  workbook.Sheets["Sheet1"] = worksheet;
  XLSX.writeFile(workbook, `TestYarExport_${subjectName}.xlsx`);
}
setGeneralData();
generateDataCards();
exportBtn.addEventListener("click", exportExcel);
