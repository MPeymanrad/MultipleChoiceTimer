const $ = document;

let bigStats = null;

function getStatsFromStorage() {
  let localStorageData = JSON.parse(localStorage.getItem("bigStats"));
  if (localStorageData) {
    bigStats = localStorageData;
  }
}
function checkForDataExistence() {
  if (!bigStats) {
    location.href = "index.html";
  }
}

function generateGeneralStats() {
  const generalTimeCanvas = $.getElementById("time_overview");
  const generalKnowledgeCanvas = $.getElementById("knowledge_overview");

  const totalQuestionsCountElem = $.querySelector(".general_total_question");
  totalQuestionsCountElem.textContent += bigStats.totalQuestions;

  const timeData = {
    labels: ["پاسخ داده شده سر وقت", "پاسخ داده شده در وقت اضافه"],
    datasets: [
      {
        label: "Time Overview",
        data: [bigStats.onTime, bigStats.onExtraTime],
        backgroundColor: ["#006400", "#f00"],
      },
    ],
  };
  const timeConfig = {
    type: "doughnut",
    data: timeData,
  };
  const knowledgeData = {
    labels: ["حل شده", "حل نشده"],
    datasets: [
      {
        label: "Knowledge Overview",
        data: [
          bigStats.numberOfSolvedQuestions,
          bigStats.totalQuestions - bigStats.numberOfSolvedQuestions,
        ],
        backgroundColor: ["#006400", "#f00"],
      },
    ],
  };
  const knowledgeConfig = {
    type: "doughnut",
    data: knowledgeData,
  };
  const timeOverviewChart = new Chart(generalTimeCanvas, timeConfig);
  const knowledgeOverviewChart = new Chart(generalKnowledgeCanvas, knowledgeConfig);
}
function setChartSettings() {
  Chart.defaults.font.family = "Dastnevis,sans-serif";
  Chart.defaults.font.weight = "700";
  Chart.defaults.font.size = 19;
}
setChartSettings();
getStatsFromStorage();
checkForDataExistence();
generateGeneralStats();
