import { predict, train, getStatus } from "./app.js";

const $ = (id) => document.getElementById(id);

function addChatMessage(role, text) {
  const log = $("chatLog");
  const div = document.createElement("div");
  div.className = `chat-msg ${role}`;
  div.innerText = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

$("chatSend").onclick = async () => {
  const text = $("chatInput").value.trim();
  if (!text) return;

  addChatMessage("user", text);
  $("chatInput").value = "";

  const result = await predict(text);
  const reply = result.assistant || "[no response]";
  addChatMessage("assistant", reply);
};
$("trainSubmit").onclick = async () => {
  const input = $("trainInput").value.trim();
  const output = $("trainOutput").value.trim();

  if (!input || !output) {
    alert("Both training fields are required.");
    return;
  }

  const result = await fetch("http://localhost:5000/train", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sample: { input, output } })
  }).then(r => r.json());

  addChatMessage("assistant", "Learned new example.");
};

$("submit").onclick = async () => {
  const input = $("input").value;
  const result = await predict(input);
  $("output").innerText = result.assistant || JSON.stringify(result, null, 2);
};

$("refreshStatus").onclick = async () => {
  const status = await getStatus();
  $("statusBox").innerText = JSON.stringify(status, null, 2);
};

window.onload = async () => {
  const status = await getStatus();
  $("statusBox").innerText = JSON.stringify(status, null, 2);
};
