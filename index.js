document.addEventListener("DOMContentLoaded", async () => {
  const timeFrames = document.querySelector(".time-period");
  const data = await fetchData();
  loadActivitiesCards(data, "weekly");
  timeFrames.addEventListener("click", (e) => {
    e.preventDefault();
    const element = e.target;
    if (element.id === "daily") {
      addRemoveActiveStatus(e.target.parentNode, element);
      loadActivitiesCards(data, e.target.id);
    } else if (element.id === "weekly") {
      addRemoveActiveStatus(e.target.parentNode, element);
      loadActivitiesCards(data, e.target.id);
    } else if (element.id === "monthly") {
      addRemoveActiveStatus(e.target.parentNode, element);
      loadActivitiesCards(data, e.target.id);
    }
  });
});
//make all HTML cards and append this to the main container
function loadActivitiesCards(data, timeFrame) {
  const times = {
    daily: "day",
    weekly: "week",
    monthly: "month",
  };
  const mainContainer = document.querySelector(".container");
  data.forEach((info) => {
    const { title, timeframes } = info;
    const activityStyle = activityBannerConfig(title);
    const section = document.createElement("section");
    const activityBanner = document.createElement("div");
    const activityImg = document.createElement("img");
    /*report*/
    const reportDiv = document.createElement("div");
    const optionsDiv = document.createElement("div");
    const activityP = document.createElement("P");
    const previusOptions = document.createElement("img");
    /*fin report*/
    // time info
    const timeInfoContainer = document.createElement("div");
    const activityHours = document.createElement("p");
    const previusTime = document.createElement("P");
    // time info fin

    section.classList.add("activity-card", activityStyle.background);
    activityBanner.classList.add("activity-banner");
    activityImg.src = activityStyle.activityImg;
    activityBanner.appendChild(activityImg);
    reportDiv.classList.add("report");
    optionsDiv.classList.add("activity-options");
    timeInfoContainer.classList.add("time-info");
    activityP.classList.add("activity");
    activityP.textContent = title;
    activityHours.classList.add("hours");
    activityHours.textContent = `${timeframes[timeFrame].current}hrs`;

    previusOptions.src = "./images/icon-ellipsis.svg";
    previusTime.classList.add("previus");
    previusTime.textContent = `Last ${times[timeFrame]} - ${timeframes[timeFrame].previous}hrs`;
    //append
    optionsDiv.appendChild(activityP);
    optionsDiv.appendChild(previusOptions);
    timeInfoContainer.appendChild(previusTime);
    timeInfoContainer.appendChild(activityHours);

    reportDiv.appendChild(optionsDiv);
    reportDiv.appendChild(timeInfoContainer);
    section.appendChild(activityBanner);
    section.appendChild(reportDiv);
    mainContainer.appendChild(section);
  });
}
//fetching the data
async function fetchData() {
  const data = await fetch("./data.json");
  const info = await data.json();
  return info;
}
//add the url to image and add the color to the background and return a object
function activityBannerConfig(activity) {
  const activityBannerConfigObj = {
    background: "",
    activityImg: "",
  };
  switch (activity) {
    case "Work":
      activityBannerConfigObj.background = "work";
      activityBannerConfigObj.activityImg = "./images/icon-work.svg";
      break;
    case "Play":
      activityBannerConfigObj.background = "play";
      activityBannerConfigObj.activityImg = "./images/icon-play.svg";
      break;
    case "Study":
      activityBannerConfigObj.background = "study";
      activityBannerConfigObj.activityImg = "./images/icon-study.svg";
      break;
    case "Exercise":
      activityBannerConfigObj.background = "exercise";
      activityBannerConfigObj.activityImg = "./images/icon-exercise.svg";
      break;
    case "Social":
      activityBannerConfigObj.background = "social";
      activityBannerConfigObj.activityImg = "./images/icon-social.svg";
      break;
    case "Self Care":
      activityBannerConfigObj.background = "self_care";
      activityBannerConfigObj.activityImg = "./images/icon-self-care.svg";
      break;
    default:
      break;
  }
  return activityBannerConfigObj;
}
//Adding / removing the active class in the category selected
function addRemoveActiveStatus(parent, elementSelected) {
  const childrens = parent.children;
  cleanHTML();
  for (let i = 0; i < childrens.length; ++i) {
    if (childrens[i].id == elementSelected.id) {
      childrens[i].classList.add("active");
    } else {
      childrens[i].classList.remove("active");
    }
  }
}
//Clean the list to insert new data
function cleanHTML() {
  const mainContainer = document.querySelector(".container");
  while (mainContainer.children[1]) {
    mainContainer.children[1].remove();
  }
}
