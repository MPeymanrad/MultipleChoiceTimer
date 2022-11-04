const $ = document;

let bigStats = null;
let detailedTimeStatsChart;
let detailedKnowledgeStatsChart;

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
  const knowledgeOverviewChart = new Chart(
    generalKnowledgeCanvas,
    knowledgeConfig
  );
}
function generateFilterBtns() {
  const filtersContainer = $.querySelector(".filters");
  const fragment = $.createDocumentFragment();
  let filterBtn;

  for (const [key, value] of Object.entries(bigStats.subjects)) {
    filterBtn = $.createElement("button");
    filterBtn.classList.add("filter_btn");
    filterBtn.dataset.filterName = key;
    filterBtn.textContent = key;
    filterBtn.addEventListener("click", (e) =>
      generateDetailedStats(value, e.target)
    );
    fragment.append(filterBtn);
  }
  filtersContainer.append(fragment);
  generateDetailedStats(
    bigStats.subjects[filtersContainer.firstElementChild.textContent],
    filtersContainer.firstElementChild
  );
}
function generateDetailedStats(subjectData, targetFilterBtn) {
  $.querySelectorAll(".filter_btn").forEach((btn) =>
    btn.classList.remove("active_filter")
  );
  targetFilterBtn.classList.add("active_filter");
  const detailedTimeCanvas = $.getElementById("time_detailed");
  const detailedKnowledgeCanvas = $.getElementById("knowledge_detailed");
  if (detailedTimeStatsChart) {
    detailedTimeStatsChart.destroy();
    detailedKnowledgeStatsChart.destroy();
  }
  const detailedQuestionsCountElem = $.querySelector(
    ".detailed_total_questions"
  );
  detailedQuestionsCountElem.textContent = `تعداد کل سوالات:${subjectData.totalQuestions}`;

  const timeData = {
    labels: ["پاسخ داده شده سر وقت", "پاسخ داده شده در وقت اضافه"],
    datasets: [
      {
        label: "Detailed Time Stats",
        data: [subjectData.onTime, subjectData.onExtraTime],
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
        label: "Detailed Knowledge Stats",
        data: [
          subjectData.numberOfSolvedQuestions,
          subjectData.totalQuestions - subjectData.numberOfSolvedQuestions,
        ],
        backgroundColor: ["#006400", "#f00"],
      },
    ],
  };
  const knowledgeConfig = {
    type: "doughnut",
    data: knowledgeData,
  };
  detailedTimeStatsChart = new Chart(detailedTimeCanvas, timeConfig);
  detailedKnowledgeStatsChart = new Chart(
    detailedKnowledgeCanvas,
    knowledgeConfig
  );
}
function generateComparisonStats() {
  const timeComparisonCanvas = $.getElementById("time_comparison");
  const knowledgeComparisonCanvas = $.getElementById("knowledge_comparison");
  const timeData = {
    labels: [],
    datasets: [
      {
        label: "تعداد سوال حل شده سروقت",
        data: [],
        backgroundColor: ["#E0144C"],
      },
    ],
  };
  const knowledgeData = {
    labels: [],
    datasets: [
      {
        label: "تعداد سوال حل شده",
        data: [],
        backgroundColor: ["#E0144C"],
      },
    ],
  };
  const timeConfig = {
    type: "bar",
    data: timeData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const knowledgeConfig = {
    type: "bar",
    data: knowledgeData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  for (const [key, value] of Object.entries(bigStats.subjects)) {
    timeData.labels.push(key);
    timeData.datasets[0].data.push(value.onTime);
    knowledgeData.labels.push(key);
    knowledgeData.datasets[0].data.push(value.numberOfSolvedQuestions);
  }
  const comparisonTimeStatsChart = new Chart(timeComparisonCanvas, timeConfig);
  const comparisonKnowledgeStatsChart = new Chart(
    knowledgeComparisonCanvas,
    knowledgeConfig
  );
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
generateFilterBtns();
generateComparisonStats();
