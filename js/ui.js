import { predict, train, getStatus } from "./app.js";

document.getElementById("submit").onclick = async () => {
  const input = document.getElementById("input").value;

  const result = await predict(input);

  document.getElementById("output").innerText =
    JSON.stringify(result, null, 2);
};

document.getElementById("train").onclick = async () => {
  const result = await train();

  document.getElementById("trainStatus").innerText =
    JSON.stringify(result, null, 2);
};

document.getElementById("refreshStatus").onclick = async () => {
  const status = await getStatus();

  document.getElementById("statusBox").innerText =
    JSON.stringify(status, null, 2);
};

// Auto-load status on page load
window.onload = async () => {
  const status = await getStatus();

  document.getElementById("statusBox").innerText =
    JSON.stringify(status, null, 2);
};
