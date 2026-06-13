const BACKEND = "http://localhost:5000";

async function apiPost(path, data) {
  const res = await fetch(`${BACKEND}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function apiGet(path) {
  const res = await fetch(`${BACKEND}${path}`);
  return res.json();
}

export async function predict(input) {
  return apiPost("/predict", { input });
}

export async function train() {
  return apiPost("/train", {});
}

export async function getStatus() {
  return apiGet("/status");
}
