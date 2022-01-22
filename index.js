document.addEventListener("DOMContentLoaded", async () => {
  const timeFrames = document.querySelector(".time-period");
  const data = await fetchData();
  // loadActivitiesCards(data, "weekly");
  timeFrames.addEventListener("click", (e) => {
    e.preventDefault();
    const element = e.target;
    if (element.id === "daily") {
      addRemoveActiveStatus(e.target.parentNode, element);
      loadActivitiesCards(data, e.target.id);
    } else if (element.id === "weekly") {
      addRemoveActiveStatus(e.target.parentNode, element);
      // loadActivitiesCards(data, e.target.id);
    } else if (element.id === "monthly") {
      addRemoveActiveStatus(e.target.parentNode, element);
      // loadActivitiesCards(data, e.target.id);
    }
  });
});

function loadActivitiesCards(data, timeFrame) {
  const mainContainer = document.querySelector(".container");
  //   limpiarHTML();
  data.forEach((info) => {
    const { title, timeframes } = info;
    const activityStyle = activityBannerConfig(title);
    const section = document.createElement("section");
    const activityBanner = document.createElement("div");
    const activityImg = document.createElement("img");
    const reportDiv = document.createElement("div");
    const hoursContainer = document.createElement("div");
    const activityP = document.createElement("P");
    const activityHours = document.createElement("p");
    const previusContainer = document.createElement("div");
    const previusOptions = document.createElement("img");
    const previusTime = document.createElement("P");
    section.classList.add("activity-card", activityStyle.background);
    activityBanner.classList.add("activity-banner");
    activityImg.src = activityStyle.activityImg;
    activityBanner.appendChild(activityImg);
    reportDiv.classList.add("report");
    hoursContainer.classList.add("hours-container");
    activityP.classList.add("activity");
    activityP.textContent = title;
    activityHours.classList.add("hours");
    activityHours.textContent = `${timeframes[timeFrame].current}hrs`;
    hoursContainer.appendChild(activityP);
    hoursContainer.appendChild(activityHours);
    reportDiv.appendChild(hoursContainer);
    previusContainer.classList.add("previus-container");
    previusOptions.src = "./images/icon-ellipsis.svg";
    previusTime.classList.add("previus");
    previusTime.textContent = `Last week - ${timeframes[timeFrame].previous}hrs`;
    previusContainer.appendChild(previusOptions);
    previusContainer.appendChild(previusTime);
    reportDiv.appendChild(previusContainer);

    //append
    section.appendChild(activityBanner);
    section.appendChild(reportDiv);
    // console.log(section);
    // console.log(info);
    // console.log(activityStyle);
    mainContainer.appendChild(section);
  });
}

async function fetchData() {
  const data = await fetch("./data.json");
  const info = await data.json();
  return info;
}

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
function addRemoveActiveStatus(parent, elementSelected) {
  const childrens = parent.children;
  limpiarHTML();
  for (let i = 0; i < childrens.length; ++i) {
    if (childrens[i].id == elementSelected.id) {
      childrens[i].classList.add("active");
    } else {
      childrens[i].classList.remove("active");
    }
  }
}
function limpiarHTML() {
  const mainContainer = document.querySelector(".container");
  while (mainContainer.children[1]) {
    mainContainer.children[1].remove();
  }
}
