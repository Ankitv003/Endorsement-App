import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://endorsements-77973-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const inputEl = document.querySelector("#name-input");
const endorsementFromInputEl = document.querySelector("#from-field");
const endorsementToInputEl = document.querySelector("#to-field");
const publishButton = document.querySelector(".publish-btn");
const endorsementsList = document.querySelector(".endorsement-list");

publishButton.addEventListener("click", publishToApp);

function publishToApp() {
  const fromVal = endorsementFromInputEl.value;
  const toVal = endorsementToInputEl.value;
  const messageVal = inputEl.value;

  const newEndorsement = {
    from: fromVal,
    to: toVal,
    message: messageVal,
  };
  push(endorsementsInDB, newEndorsement);
  clearInputFieldEl();
}

onValue(endorsementsInDB, function (snapshot) {
  if (snapshot.exists()) {
    clearEndorsementList();
    const itemsArray = Object.values(snapshot.val());
    itemsArray.reverse();
    for (let i = 0; i < itemsArray.length; i++) {
      const item = itemsArray[i];
      const articleEl = document.createElement("article");
      const headerEl = document.createElement("header");
      const messageEl = document.createElement("p");
      const footerEl = document.createElement("footer");
      headerEl.textContent = `To ${item.to}`;
      messageEl.textContent = item.message;
      footerEl.textContent = `From ${item.from}`;
      articleEl.appendChild(headerEl);
      articleEl.appendChild(messageEl);
      articleEl.appendChild(footerEl);
      endorsementsList.appendChild(articleEl);
    }
  } else {
    endorsementsList.innerHTML = "Be the first to cheer another on!";
  }
});
function clearEndorsementList() {
  endorsementsList.innerHTML = "";
}

function clearInputFieldEl() {
  inputEl.value = "";
  endorsementFromInputEl.value = "";
  endorsementToInputEl.value = "";
}
