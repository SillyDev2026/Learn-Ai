const BACKEND = "http://localhost:5000";

async function apiPost(path, data) {
  try {
    const res = await fetch(`${BACKEND}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`Backend returned ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    return { error: true, message: `POST ${path} failed: ${err.message}` };
  }
}

async function apiGet(path) {
  try {
    const res = await fetch(`${BACKEND}${path}`);

    if (!res.ok) {
      throw new Error(`Backend returned ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    return { error: true, message: `GET ${path} failed: ${err.message}` };
  }
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
