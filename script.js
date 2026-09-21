
function requestResources(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Resources could not be loaded."));
        return;
      }
      resolve([
        { title: "JavaScript Events", minutes: 15 },
        { title: "Closures Practice", minutes: 20 },
        { title: "Promises and Await", minutes: 25 }
      ]);
    }, 1200);
  });
}

function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const getNextAttempt = makeCounter();
const getNextPing = makeCounter();

class Resource {
  constructor(title) {
    this.title = title;
  }

  describe() {
    return this.title;
  }
}

class TimedResource extends Resource {
  constructor(title, minutes) {
    super(title);
    this.minutes = minutes;
  }

  describe() {
    return `${super.describe()} | ${this.minutes} min`;
  }
}

const resourceForm = document.getElementById("resourceForm");
const failNextCheckbox = document.getElementById("failNext");
const loadButton = document.getElementById("loadButton");
const attemptsSpan = document.getElementById("attempts");
const statusP = document.getElementById("status");
const resourceList = document.getElementById("resourceList");
const pingButton = document.getElementById("pingButton");
const pingsSpan = document.getElementById("pings");
const tracePre = document.getElementById("trace");

let isBusy = false;

function log(message) {
  tracePre.textContent += message + "\n";
}

resourceForm.addEventListener("submit", async (event) => {
  event.preventDefault();


  if (isBusy) return;

  isBusy = true;
  loadButton.disabled = true;

  const capturedMode = failNextCheckbox.checked;

  attemptsSpan.textContent = getNextAttempt();
  statusP.textContent = "Loading resources...";
  resourceList.textContent = "";

  tracePre.textContent = "";
  log("A: handler starts");

  setTimeout(() => log("D: timer task"), 0);
  Promise.resolve().then(() => log("C: promise microtask"));

  log("B: before await");

  try {
    const data = await requestResources(capturedMode);

    data.forEach(item => {
      const resourceInstance = new TimedResource(item.title, item.minutes);
      const li = document.createElement("li");
      li.textContent = resourceInstance.describe();
      resourceList.appendChild(li);
    });

    statusP.textContent = "Loaded 3 resources";
    log("E: success");
  } catch (error) {
    statusP.textContent = error.message;
    log("E: failure");
  } finally {
    isBusy = false;
    loadButton.disabled = false;
    log("F: cleanup");
  }
});

pingButton.addEventListener("click", () => {
  pingsSpan.textContent = getNextPing();
});
